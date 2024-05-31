import { Categoria } from "../entidades/Producto";

export const getAllCategorias = async():Promise<Categoria[]> =>{

    const data = await fetch("http://localhost:8080/categoria")
    return data.json();
}