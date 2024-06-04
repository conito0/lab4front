import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Catalogo } from './componentes/catalogo/Catalogo'
import { Detalle } from './componentes/detalle/Detalle'
import Home from './componentes/home/Home'
import DondeEstamos from './componentes/dondeEstamos/DondeEstamos'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { NavBar } from './navBar/NavBar';
import { Tabla } from './componentes/tabla/Tabla';
import LoaderPage from './componentes/loaderPage/LoaderPage';
import RolUsuario from './controlAcceso/RolUsuario';
import { Roles } from './entidades/Roles';
import { RutaPrivada } from './controlAcceso/RutaPrivada';
import Login from './componentes/login/Login';
import ChartsGoogle from './componentes/chartsGoogle/ChartsGoogle'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<LoaderPage></LoaderPage>}>
    <BrowserRouter>
    <NavBar></NavBar>
    <Routes>
      //ruta publica
      <Route index path='/home' element={<Home />} />
      <Route element={<RolUsuario rol={Roles.ADMIN}></RolUsuario>}>
        <Route path='/abm' element={<Tabla/>} />
      </Route>
      //ruta publica
      <Route path='/dondeEstamos'element={<DondeEstamos />} />
      //ruta publica
      <Route path="/login" element={<Login />} />
      //ruta publica
      <Route path='/detalle/:id' element={<Detalle/>} /> 
      //ruta privada
      <Route path="/catalogo" element={
                                        <RutaPrivada>
                                            <Catalogo />
                                        </RutaPrivada>
                                    } />

      //ruta privada y con Rol Administrador
      <Route element={<RolUsuario rol={Roles.ADMIN} />} />
       //ruta publica
      <Route path='/chartsGoogle'element={<ChartsGoogle />} />
     
    </Routes>
  </BrowserRouter>
  </Suspense>
  </React.StrictMode>,
)
