export const getLogin = async (usuario: string, clave: string) => {

    try {
        const data = await fetch(`http://localhost:8080/usuario/login/${usuario}/${clave}`)

        if (data.status === 200) {
            return data.json();
        } else {
            return undefined;
        }
    } catch(e) {
        return undefined;
    }

}