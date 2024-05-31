import { ChangeEventHandler } from "react";

export interface Producto{
    id:number,
    instrumento:string,
    nombre:string;
    marca:string,
    modelo:string,
    imagen:string;
    precio:number;
    costoEnvio:string;
    cantidadVendida:string,
    descripcion:string
    categoria:Categoria;
    cantidad:number;
    imagenPath:string;
    addCarrito?:ChangeEventHandler;

   



}

export interface Categoria{
    id:number;
    denominacion:string;

}

