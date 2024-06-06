import { useParams } from "react-router-dom"
import "./Detalle.css"
import { useEffect, useState } from "react";
import { getById } from "../../services/InstrumentosJson";
import { Producto } from "../../entidades/Producto";
import { Button, Col, Row } from "react-bootstrap";
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

    const generarPDF = () => {
        window.open("http://localhost:8080/instrumento/pdf/" + id, "_blank");
      }

    return <>
        <Row className="detalle">
            <Col>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img className="img" src="https://http2.mlstatic.com/D_NQ_NP_624635-MLA45016671134_022021-O.webp" alt="" />
                </div>
                <h4>Descripcion</h4>
                <p>
                    {producto.descripcion}
                </p>
            </Col>
            <Col>
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
                    <Button variant="dark"onClick={(e) => generarPDF()}>Generar PDF</Button>{' '}
                    </p>
                </div>
            </Col>
        </Row>
    </>
}