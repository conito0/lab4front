import { Producto } from '../../entidades/Producto';
import { Producto as ProductoComponent } from "../producto/Producto";
import { useEffect, useState } from "react"
import { getAll } from "../../services/InstrumentosJson"
import "./Catalogo.css"
import { Carrito } from '../carrito/Carrito';
import { CarritoContextProvider } from '../../context/CarritoContext';
import { Col, Container, Row } from 'react-bootstrap';

export const Catalogo = ()=>{

  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(()=>{
        (async()=>{
            setProductos(await getAll());
        })()
  },[])

  return <>
        <div className='p-3'>
            <div className='col-md-12 '>
            <h2 className='text-left h5 m-3 py-4'>Productos</h2>
            </div>
            <CarritoContextProvider>
              <Row>
                  <Col sm={8}>
                    <div className="catalogo">
                      {productos.map((producto)=>
                          <><ProductoComponent productoCompleto={producto} id={+producto.id} imagen={producto.imagen} instrumento={producto.instrumento} precio={producto.precio} costoEnvio={producto.costoEnvio} cantidadVendida={producto.cantidadVendida}></ProductoComponent></>)}
                    </div>
                  </Col>
                  <Col sm={4}>
                    <Carrito></Carrito>
                  </Col>
              </Row>
          </CarritoContextProvider>
            
        </div>
        
  </>
}

