import festivosExcel from "../assets/tools/exportar_días_festivos_excel.png";
import contadorCaracteres from "../assets/tools/contador_caracteres.png";
import pixelToRem from "../assets/tools/pixel_to_rem.png";

export const getImage = ( image ) => {
    const arrayImages = {
        "festivos_excel": festivosExcel,
        "contador_caracteres": contadorCaracteres,
        "pixel_to_rem": pixelToRem
    };

    if( arrayImages[image] === undefined ) return "";

    return arrayImages[image];
}