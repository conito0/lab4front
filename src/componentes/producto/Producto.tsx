import { Link } from "react-router-dom";
import "./Producto.css"
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import * as productoEntidad from "../../entidades/Producto";
import { useCarrito } from "../../hooks/Usecarrito";

type ProductoParams = {
    id:number;
    imagen: string;
    instrumento: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: string;
    productoCompleto: productoEntidad.Producto;
}
const determinarEnvio =(costoEnvio:string)=>{
    if(costoEnvio === "G"){
        return "Envió gratis a todo el país" 
    } else {
        return "Costo de Envio interior de Argentina $" + costoEnvio
    }
}

export const Producto = (args: ProductoParams)=>{

    const url = args.imagen

    const verificaProductoEnCarrito = (product:productoEntidad.Producto) => {
        return cart.some(item => item.id === product.id)
    }

    const { addCarrito, removeCarrito, cart, removeItemCarrito } = useCarrito();

    return <>
        <Container style={{borderBottom: '1px solid lightgray'}}>
            <Row>
                <Col>
                    <img className={"imagen"} src={url} alt="imagen del producto" />
                </Col>
                <Col>
                    <div className={"datos"}>
                        <div className={"titulo"}>{args.instrumento}</div>
                        <div className={"precio"}>$ {args.precio}</div>
                        <div className={determinarEnvio(args.costoEnvio)==="Envió gratis a todo el país"?"envio-gratis":"envio-costo"}>{determinarEnvio(args.costoEnvio)}</div>
                        <div>{args.cantidadVendida} vendidos</div>
                        <Link to={`/detalle/${args.id}`}>
                            <Button variant="dark">Detalle</Button>{' '}
                        </Link>
                        <hr></hr>
                        <p>
                            <Button variant="dark" onClick={() => removeItemCarrito(args.productoCompleto)}>-</Button>{' '}
                            
                            <Button variant="dark" className='boton'  onClick={() => {
                                verificaProductoEnCarrito(args.productoCompleto)
                                ? removeCarrito(args.productoCompleto)
                                : addCarrito(args.productoCompleto)
                            }}>
                                {
                                    verificaProductoEnCarrito(args.productoCompleto)
                                    ? <span style={{fontSize: '20px', width: "20px", height: "20px"}} className={"material-symbols-outlined"}>shopping_cart_off</span>
                                    : <span style={{fontSize: '20px', width: "20px", height: "20px"}} className={"material-symbols-outlined"}>shopping_cart</span>
                                }
                            </Button>{' '}
                            <Button variant="dark"  onClick={() => {
                                console.log("addCarrito")
                                addCarrito(args.productoCompleto)
                            }}>+</Button>{' '}
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
}

