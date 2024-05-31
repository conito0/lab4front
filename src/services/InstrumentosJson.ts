import Pedido from "../entidades/Pedido";
import PreferenceMP from "../entidades/PreferenceMP";
import { Producto  } from "../entidades/Producto";

export const getAll = async():Promise<Producto[]> =>{

    const data = await fetch("http://localhost:8080/instrumento")
    return data.json();
}

export const getById = async(id:number):Promise<Producto> =>{
    const data = await fetch(`http://localhost:8080/instrumento/${id}`)
    return data.json();
}

export const post = async(producto: Producto): Promise<Producto> => {
    const data = await fetch(`http://localhost:8080/instrumento`, {
        method: 'POST',
        body: JSON.stringify(producto),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return data.json();
}


export const put = async(id: number, producto: Producto): Promise<Producto> => {
    const data = await fetch(`http://localhost:8080/instrumento/${id}`, {
        method: 'PUT',
        body: JSON.stringify(producto),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return data.json();
}

export const deleteInstrumento = async(id:number)=>{
    await fetch(`http://localhost:8080/instrumento/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export async function createPreferenceMP(pedido?:Pedido){
    let urlServer = 'http://localhost:8080/api/create_preference_mp';
	let method:string = "POST";
    const response = await fetch(urlServer, {
	  "method": method,
	  "body": JSON.stringify(pedido),
	  "headers": {
		"Content-Type": 'application/json'
	  }
	});
    return await response.json() as PreferenceMP;   
}   


    