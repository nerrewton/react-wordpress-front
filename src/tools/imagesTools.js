import festivosExcel from "../assets/exportar_días_festivos_excel.png";

export const getImage = ( image ) => {
    const arrayImages = {
        "festivos_excel": festivosExcel
    };

    if( arrayImages[image] === undefined ) return "";

    return arrayImages[image];
}