import { lazy } from "react";

const Home = lazy(()=> import("../pages/Home"));
const Ventas = lazy(()=> import("../pages/Ventas"));
const Nosotros = lazy(()=> import("../pages/Nosotros"));
const Tool = lazy(()=> import("../pages/Tool"));
const NotFound = lazy(()=> import("../pages/NotFound"));

const mapping = {
    "Home":  Home,
    "Ventas": Ventas,
    "Nosotros": Nosotros,
    "Tool": Tool
}

export const getComponent = ( nombre = "" ) => {
    if (!nombre) return Home;

    try{
        if(!mapping[nombre]) throw new Error("No se encontró componente");

        return mapping[nombre];
    }catch( error ){
        console.error( error );
        return NotFound;
    }
}