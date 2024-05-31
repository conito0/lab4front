import { Button, Container, Modal, Table } from "react-bootstrap"
import "./Tabla.css"
import { deleteInstrumento, getAll, post, put } from "../../services/InstrumentosJson"
import { useEffect, useState } from "react";
import { Categoria, Producto } from "../../entidades/Producto";
import { Form } from "react-bootstrap";
import { getAllCategorias } from '../../services/CategoriaJson';
export const Tabla = ()=>{

    const [productos, setProductos] = useState<Producto[]>([]);
    const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [productoFormulario, setProductoFormulario] = useState<Producto>({
      cantidadVendida: "",
      costoEnvio:"",
      descripcion:"",
      id:0,
      nombre: "",
      imagen:"",
      instrumento:"",
      marca:"",
      modelo:"",
      precio:"",
      categoria:{
        id:0,
        denominacion:"",
      },

    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleDelete = async (id:number) => {

      await deleteInstrumento(id)
      
      setProductos(await getAll());
    }


    const handleSave = async () => {

      if(productoFormulario.id === 0) {
        await post(productoFormulario)
      } else {
        await put(productoFormulario.id, productoFormulario);
      }

      setProductos(await getAll());

      setShow(false);
    }

    const handleShow = (productoFormulario: Producto | undefined) => {

      setProductoFormulario(productoFormulario ? productoFormulario : {
        cantidadVendida: "",
        costoEnvio:"",
        descripcion:"",
        id:0,
        nombre: "",
        imagen:"",
        instrumento:"",
        marca:"",
        modelo:"",
        precio:"",
        categoria:{
          id: (categorias[0] || { id: 0}).id,
          denominacion:"",
        },
  
      })

      setShow(true);
    }

    const handleChangeCategoria = (e: any) => {
      e.preventDefault();

      const productoFormularioTemp = productoFormulario;
      (productoFormularioTemp as any)["categoria"]["id"] = e.target.value;
    

      setProductoFormulario(productoFormularioTemp);

      console.log(productoFormulario)
    }

    const handleSearch = (e: any) => {
      e.preventDefault();

      console.log(e)

      if(e.target.value === 0) {
        setProductosFiltrados(productos)
      } else {
        setProductosFiltrados(productos.filter((producto) => producto.categoria.id === e.target.value))
      }


      console.log(productoFormulario)
    }

    const handleChange = (e:any) => {
      e.preventDefault();

      const productoFormularioTemp = productoFormulario;
      (productoFormularioTemp as any)[e.target.name] = e.target.value;
    

      setProductoFormulario(productoFormularioTemp);

      console.log(productoFormulario)
    };

    useEffect(()=>{
          (async()=>{

              const productosTemp = await getAll();

              setProductos(productosTemp);
              setCategorias(await getAllCategorias())
              setProductosFiltrados(productosTemp);
          })()
    },[])

    return<>
    <Button onClick={() => handleShow(undefined)} variant="primary">Agregar</Button>{' '}<span>
    <Form.Select defaultValue={(categorias[0] || { id: 0}).id} onSelect={handleSearch}>
            <option value="0">Todas</option>
            {categorias.map((v) => {
              return <>
                <option value={v.id}>{v.denominacion}</option>
              </>
            })}
    </Form.Select>
    </span>
    <Container fluid>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Instrumento</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Imagen</th>
            <th>Precio</th>
            <th>Costo de envio</th>
            <th>Descripcion</th>
            <th>Categoria</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
              productosFiltrados.map(producto=>{
                  return <tr>
                      <td>{producto.id}</td>
                      <td>{producto.instrumento}</td>
                      <td>{producto.marca}</td>
                      <td>{producto.modelo}</td>
                      <td>{producto.imagen}</td>
                      <td>{producto.precio}</td>
                      <td>{producto.costoEnvio}</td>
                      <td>{producto.descripcion}</td>
                      <td>{producto.categoria.denominacion}</td>
                      <td>
                      <Button variant="secondary" onClick={() => handleDelete(producto.id)}>
                        Eliminar
                      </Button>
                      <Button variant="primary" onClick={() => handleShow(producto)}>
                        Modificar
                      </Button>
                      </td>
                  </tr>
              })
          }
          
        </tbody>
      </Table>
    </Container>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar/Modificar instrumento</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          Nombre:
          <Form onChange={handleChange}>
            <Form.Group>
              <Form.Control
                defaultValue={productoFormulario.nombre}
                type="text"
                name="nombre"
              ></Form.Control>
            </Form.Group>
          </Form>

          Instrumento:
          <Form onChange={handleChange}>
            <Form.Group>
              <Form.Control
                defaultValue={productoFormulario.instrumento}
                type="text"
                name="instrumento"
              ></Form.Control>
            </Form.Group>
          </Form>

          Marca:
          <Form onChange={handleChange}>
            <Form.Group>
              <Form.Control
                defaultValue={productoFormulario.marca}
                type="text"
                name="marca"
              ></Form.Control>
            </Form.Group>
          </Form>

          Modelo:
          <Form onChange={handleChange}>
            <Form.Group>
              <Form.Control
                defaultValue={productoFormulario.modelo}
                type="text"
                name="modelo"
              ></Form.Control>
            </Form.Group>
          </Form>

          Imagen:
          <Form onChange={handleChange}>
            <Form.Group>
              <Form.Control
                defaultValue={productoFormulario.imagen}
                type="text"
                name="imagen"
              ></Form.Control>
            </Form.Group>
          </Form>

          Precio:
          <Form onChange={handleChange}>
            <Form.Group>
              <Form.Control
                defaultValue={productoFormulario.precio}
                type="text"
                name="precio"
              ></Form.Control>
            </Form.Group>
          </Form>

          Costo envio:
          <Form onChange={handleChange}>
            <Form.Group>
              <Form.Control
                defaultValue={productoFormulario.costoEnvio}
                type="text"
                name="costoEnvio"
              ></Form.Control>
            </Form.Group>
          </Form>

          Cantidad vendida:
          <Form onChange={handleChange}>
            <Form.Group>
              <Form.Control
                defaultValue={productoFormulario.cantidadVendida}
                type="text"
                name="cantidadVendida"
              ></Form.Control>
            </Form.Group>
          </Form>

          Descripcion:
          <Form onChange={handleChange}>
            <Form.Group>
              <Form.Control
                defaultValue={productoFormulario.descripcion}
                type="text"
                name="descripcion"
              ></Form.Control>
            </Form.Group>
          </Form>

          Categoria
          <Form.Select defaultValue={(categorias[0] || { id: 0}).id} onSelect={handleChangeCategoria}>
            {categorias.map((v) => {
              return <>
                <option value={v.id}>{v.denominacion}</option>
              </>
            })}
          </Form.Select>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
    </>
}