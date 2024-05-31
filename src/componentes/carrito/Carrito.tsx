import { initMercadoPago } from "@mercadopago/sdk-react"
import { Producto } from "../../entidades/Producto"
import { useCarrito } from "../../hooks/Usecarrito"
import { postPedido } from "../../services/PedidoJson"
import CheckoutMP from "../checkoutMP/CheckoutMP"
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap"



function CartItem (item:Producto) {
  return (
      <div key={item.id}>
        <span>
            <img width={50} height={50}
            src={`${item.imagen}`}
            alt={item.nombre}
            />
            <div>
                <strong>{item.nombre}</strong> - ${item.precio}
            </div>
            <div>
                <b>{item.cantidad} {item.cantidad == 1 ? 'unidad' : 'unidades'} </b>
            </div>
        </span>
        <hr></hr>
      </div>      
  )
}

export function Carrito () {
  
  const { cart, removeCarrito, addCarrito, limpiarCarrito, totalPedido } = useCarrito()
  
  return (
    <>
      <Card>
          <Card.Header className="text-light bg-dark" as="h5">Carrito de compras</Card.Header>
          <Card.Body>
            { cart.length === 0 ? 'No hay productos aqui...' : '' }
            <ul>
              {cart.map((producto:Producto, index) => 
                <CartItem id={producto.id} instrumento={producto.instrumento} nombre={producto.nombre} marca={producto.marca} modelo={producto.modelo} precio={producto.precio} key={index}
                imagen={producto.imagen} imagenPath={producto.imagenPath} costoEnvio={producto.costoEnvio} descripcion={producto.descripcion} cantidadVendida={producto.cantidadVendida} categoria={producto.categoria} cantidad={producto.cantidad} addCarrito={() => addCarrito(producto)}/>
              )}
            </ul>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <h3>Total: ${totalPedido}</h3>
            </ListGroup.Item>
          </ListGroup>
          <Card.Footer className="text-light bg-dark">
            <Row>
              <Col sm={2}>
                <Button onClick={limpiarCarrito} variant="danger" className='w-100'>
                  <span style={{fontSize: '15px', width: "20px", height: "20px"}} className={"material-symbols-outlined"}>shopping_cart_off</span>
                </Button>
              </Col>
              <Col sm={10}>
                <CheckoutMP cart={cart} totalPedido={totalPedido} ></CheckoutMP> 
              </Col>
            </Row>
          </Card.Footer>
      </Card>
    </>
  )
}
