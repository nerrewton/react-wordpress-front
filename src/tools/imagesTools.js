import festivosExcel from "../assets/exportar_días_festivos_excel.png";
import contadorCaracteres from "../assets/contador_caracteres.png";

export const getImage = ( image ) => {
    const arrayImages = {
        "festivos_excel": festivosExcel,
        "contador_caracteres": contadorCaracteres
    };

    if( arrayImages[image] === undefined ) return "";

    return arrayImages[image];
}