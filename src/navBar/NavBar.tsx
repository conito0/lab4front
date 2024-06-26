import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Usuario from "../entidades/Usuario";
import { useState } from "react";
import { Roles } from "../entidades/Roles";
import ChartsGoogle from '../componentes/chartsGoogle/ChartsGoogle';

export const NavBar = () => {
    

    const navigate = useNavigate();

    
    const cerrarSesion = async () => {
        localStorage.setItem('usuario', "");
        localStorage.removeItem('usuario');
        navigate('/login', {
                replace: true,
                state: {
                    logged: false
                },
		    });

        location.reload();
    }

    const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
    console.log("JSON " + jsonUsuario);
    const usuarioLogueado:Usuario = JSON.parse(jsonUsuario) as Usuario;
    
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/home">Musical Henrix</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/productos">Productos</Nav.Link>
                    <Nav.Link href="/dondeEstamos">Ubicación</Nav.Link>
                    <Nav.Link hidden={usuarioLogueado?.rol !== 'ADMIN'} href="/abm">Grilla</Nav.Link>
                    <Nav.Link hidden={usuarioLogueado?.rol !== 'ADMIN'} href="/reportes">Reportes</Nav.Link>
                    </Nav>
          <Nav className="ms-auto align-items-center"> {/* Añadir ms-auto y align-items-center */}
            <li>
              <div className="separador"></div>
            </li>
            <li className="nav-item">
              <a className="nav-link" >
                Usuario: {usuarioLogueado?.usuario}  {usuarioLogueado?.rol === Roles.ADMIN ? "Admin" : "Común"}
              </a>
            </li>
            <li className="nav-item">

            {
              usuarioLogueado
              ? <Button onClick={cerrarSesion} variant="danger">
                  <span style={{fontSize: '15px', width: "100px", height: "10px"}}>Cerrar sesion</span>
                </Button>
              : <Button onClick={cerrarSesion} variant="primary">
                  <span style={{fontSize: '15px', width: "100px", height: "10px"}}>Iniciar sesion</span>
                </Button>
            }


              
            </li>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
}

