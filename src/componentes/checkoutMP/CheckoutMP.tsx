import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState } from 'react';
import { postPedido } from '../../services/PedidoJson';
import { Button } from 'react-bootstrap';


function CheckoutMP ({cart = [{}], totalPedido = 0}) {

    const [idPreference, setIdPreference] = useState<string | undefined>(undefined);
    

    const crearPedido = async () => {

        const pedido = await postPedido(cart, totalPedido);

        alert("Su id de pedido es: " + pedido.id)

        if(totalPedido > 0){
            const pedido = await postPedido(cart, totalPedido);

            console.log("Preference id: " + pedido.preferenceMP.id);
            if(pedido)
                setIdPreference(pedido.preferenceMP.id);
        }else{
            alert("Agregue al menos un producto al carrito");
        }
    }

   
    //es la Public Key se utiliza generalmente en el frontend.
    initMercadoPago('TEST-eb958550-9486-4c88-87d8-1bbc32d0c3f6', { locale: 'es-AR' });
    
    //redirectMode es optativo y puede ser self, blank o modal
    return (
        <div>
            <Button disabled={!cart.length} onClick={crearPedido} className='w-100 btMercadoPago text-light' variant="info">Comprar con Mercadopago</Button>{' '}
            { idPreference && cart.length ? <Wallet initialization={{ preferenceId: idPreference, redirectMode:"blank" }} customization={{  texts:{ valueProp: 'smart_option'}}} /> : ''}
        </div>
    );

}

export default CheckoutMP