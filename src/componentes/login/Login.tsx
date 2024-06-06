import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../entidades/Roles";
import Usuario from "../../entidades/Usuario";
import { getLogin } from "../../services/UsuarioJson";


function Login() {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario>(new Usuario());
    const [txtValidacion, setTxtValidacion] = useState<string>("");
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    const login = async () => {
        if(usuario?.usuario == undefined || usuario?.usuario === ""){
            setTxtValidacion("Ingrese el nombre de usuario");
            return;
        }
        if(usuario?.clave == undefined || usuario?.clave === ""){
            setTxtValidacion("Ingrese la clave");
            return;
        }
        
        //aca deberia llamar al BACKEND y validar el usuario en base de datos
        const usuarioBackend = await getLogin(usuario?.usuario, usuario?.clave);

        if(usuarioBackend) {
            usuario.id = 1;
            if(isChecked){
                usuario.rol = Roles.ADMIN;
            }else{
                usuario.rol = Roles.USER;
            }
            setUsuario(usuarioBackend);
            localStorage.setItem('usuario', JSON.stringify(usuarioBackend));
            navigate('/home', {
                replace: true,
                state: {
                    logged: true,
                    usuario: usuarioBackend
                },
		    });

            location.reload();
        } else {
            setTxtValidacion("Usuario y/o clave incorrectas");
            return;
        }    
    }

     return (
        <>
        <div className="d-flex justify-content-center center m-5">
            <form style={{maxWidth: "400px"}}>
                <div className="mb-3">
                    <label htmlFor="txtUsuario" className="form-label">Usuario</label>
                    <input type="text" id='txtUsuario' className="form-control" placeholder="Ingrese el nombre" defaultValue={usuario?.usuario} onChange={e => usuario.usuario = String(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") login();}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="txtClave" className="form-label">Clave</label>
                    <input type="password" id='txtClave' className="form-control" placeholder="Ingrese la clave" defaultValue={usuario?.clave} onChange={e => usuario.clave = String(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") login();}}/>
                </div>
                <div className="col">
                    <label>
                        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                        Es Administrador
                    </label>
                    <p>El usuario que se logueara tiene Rol {isChecked ? 'Administrador (admin)' : 'Usuario (user)'}.</p>
                </div>
                <div className="col">
                    <button onClick={login} className="btn btn-success" type="button">
                        Ingresar
                    </button>
                </div>
                <div>
                    <p style={{ color: 'red', lineHeight : 5, padding: 5 }}>{txtValidacion}</p>
                </div>
            </form>
        </div>
        </>
        )

}

export default Login