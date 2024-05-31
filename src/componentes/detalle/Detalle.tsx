import { useParams } from "react-router-dom"
import "./Detalle.css"
import { useEffect, useState } from "react";
import { getById } from "../../services/InstrumentosJson";
import { Producto } from "../../entidades/Producto";
import { Button } from "react-bootstrap";
import { useCarrito } from "../../hooks/Usecarrito";

export function Detalle() {

    const { id } = useParams();
    const { addCarrito, removeCarrito, cart, removeItemCarrito } = useCarrito();

    const [producto, setProducto] = useState<Producto>({
        cantidadVendida:"",
        costoEnvio:"",
        descripcion:"",
        instrumento:"",
        precio:0,
        modelo:"",
        marca:"",
        imagen:"",
        id:0,
        cantidad:0,
        imagenPath:"",
        nombre:"",
        categoria:{
            id:0,
            denominacion:"",
        }

    });
    const verificaProductoEnCarrito = (product:Producto) => {
        return cart.some(item => item.id === product.id)
    }


    useEffect(()=>{
            (async()=>{
                setProducto(await getById(+(id||'0')));
            })()
    },[])


    return <>
    <div className="detalle">
        <div>
            <img className="img" src="https://http2.mlstatic.com/D_NQ_NP_624635-MLA45016671134_022021-O.webp" alt="" />
            <h4>Descripcion</h4>
            <p>
                {producto.descripcion}
            </p>
        </div>
        <div className="datos">
            
            <div className="cantidad-vendido"> {producto.cantidadVendida} vendidos</div>
            <div className="titulo"> {producto.instrumento} </div>
            <div className="precio"> $ {producto.precio}</div>
            <div className="marca"> Marca: {producto.marca}</div>
            <div className="modelo"> Modelo: {producto.modelo}</div>
            <div className="envio">
                Costo envio:  
                <div className={producto.costoEnvio === "G" ?"costo-de-envio-gratis":"costo-de-envio"}>{producto.costoEnvio === "G" ?"Envio gratis":"$ "+producto.costoEnvio}</div>
            </div>
           
            <hr></hr>
            <p>
            <button>
             Agregar al carrito
            </button> 
            </p>
        </div>
    </div>
    </>
}