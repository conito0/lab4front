import { ReactNode, createContext, useState } from 'react'
import { Producto } from '../entidades/Producto';


// Definimos el tipo de dato que se almacenará en el contexto del carrito
interface CartContextType {
  cart: Producto[];
  addCarrito: (product: Producto) => void;
  removeCarrito: (product: Producto) => void;
  removeItemCarrito: (product: Producto) => void;
  limpiarCarrito: () => void;
  totalPedido?:number;
}

//crear contexto
export const CartContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {},
  totalPedido: 0
});


//crear provider, encargado de proveer acceso al contexto
export function CarritoContextProvider({ children }: { children: ReactNode }){
    
    const[cart, setCart] = useState<Producto[]>([]);
    const[totalPedido, setTotalPedido] = useState<number>(0);

    const addCarrito = async (product: Producto) => {

        console.log(product)

        let existe:boolean = false
        cart.forEach(async (element:Producto) => {
            if(element.id === product.id){
                existe = true
                return existe
            }
        });
        
        console.log(existe)

        if (existe) {
            console.log("YA EXISTE");
            
            const productCarrito = cart.find((item) => item.id === product.id);

            if(productCarrito) {
                productCarrito.cantidad += 1
                product = productCarrito
            }

            const cartClonado = structuredClone(cart.filter(item => item.id !== product.id))
            cartClonado.push(product)
            setCart(cartClonado)
            calcularTotalCarritoCustom(cartClonado)
        } 
        else { // si el producto no esta en el carrito
            console.log("NO EXISTE");
            product.cantidad = 1;
            const cartClonado = [...cart, product]
            setCart(cartClonado)
            calcularTotalCarritoCustom(cartClonado)
        }   

    };

    const removeCarrito = async (product: Producto) => {
        await setCart(prevCart => prevCart.filter(item => item.id !== product.id))
    };

    const removeItemCarrito = async (product: Producto) => {
        //const objetoBuscado = cart.find((objeto:Producto) => objeto.id === product.id);
        //const productoIndice = cart.findIndex((objeto:Producto) => objeto.id === product.id)
        //si el producto ya esta en el carrito
        let existe:boolean = false
        cart.forEach(async (element:Producto) => {
            if(element.id === product.id){
                existe = true
            } 
        });

        if (existe) {
            console.log("EXISTE");
            if(product.cantidad > 1){
                product.cantidad -= 1
                const cartClonado = await structuredClone(cart.filter(item => item.id !== product.id))
                await cartClonado.push(product)
                setCart(cartClonado)
                calcularTotalCarritoCustom(cartClonado)
            }else{
                setCart(cart.filter(item => item.id !== product.id))
                calcularTotalCarritoCustom(cart.filter(item => item.id !== product.id))
            }
        } 
    };

    const limpiarCarrito = () => {
        setCart([]);
        setTotalPedido(0);
    }

    const calcularTotalCarrito = async () => {
        let total:number = 0;
        console.log(cart)
        cart.forEach(async (element:Producto) => {
            console.log(element)
            total += element.precio * element.cantidad;
        });
        await setTotalPedido(total);
    }

    const calcularTotalCarritoCustom = async (cartCustom: Producto[]) => {
        let total:number = 0;
        console.log(cartCustom)
        cartCustom.forEach(async (element:Producto) => {
            console.log(element)
            total += element.precio * element.cantidad;
        });
        await setTotalPedido(total);
    }


    return (
    <CartContext.Provider value={{ cart, addCarrito, limpiarCarrito, removeCarrito, removeItemCarrito, totalPedido }}>
      {children}
    </CartContext.Provider>
    );
    

}