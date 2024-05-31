import { Navigate, Outlet } from 'react-router-dom';
import { Roles } from '../entidades/Roles';
import Usuario from '../entidades/Usuario';
import { useState } from 'react';

interface Props {
  rol: Roles;
}

function RolUsuario({ rol }: Props) {
  
    const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado:Usuario = JSON.parse(jsonUsuario) as Usuario;

    console.log(usuarioLogueado.rol, rol)

    //si esta logueado y es administrador lo dejo ingresar si no
    if((usuarioLogueado && usuarioLogueado.rol === rol)){
        console.log("a")

        return <Outlet />;
    }else if(usuarioLogueado){
        console.log("b")
        return <Navigate replace to='/abm' />;
    }else{
        console.log("c")
        return <Navigate replace to='/login' />;
    }
    
}
export default RolUsuario;