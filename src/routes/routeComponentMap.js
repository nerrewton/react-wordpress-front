import Home from '../pages/Home';
import Ventas from '../pages/Ventas';
import Nosotros from '../pages/Nosotros';
import Tool from "../pages/Tool";
import NotFound from '../pages/NotFound';

const mapping = {
    "Home": Home,
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