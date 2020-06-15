/**
 * Content: Functions for changing dates format
 */
export const dateToString = ( date = new Date(), format = "yyyy-mm-dd" ) => {    

    if( typeof date.getMonth !== 'function' ){
        return "";
    }

    const year = date.getFullYear().toString();
    const month = ( date.getMonth() + 1 ).toString().padStart(2, '0'); //January is 0
    const day = date.getDate().toString().padStart(2, '0');
    const time = date.getTime().toString();
    const arrayFormat = format.split(" ");

    let dateString = "";

    switch ( arrayFormat[0] ){
        case "yyyy-mm-dd":
            dateString = year + "-" + month + "-" + day;
            break;
        case "yyyy-dd-mm":
            dateString = year + "-" + day + "-" + month;
            break;
        case "dd-mm-yyyy":
            dateString = day + "-" + month + "-" + year;
            break;
        case "mm-dd-yyyy":
            dateString = month + "-" + day + "-" + year;
            break;
        case "yyyy/mm/dd":
            dateString = year + "/" + month + "/" + day;
            break;
        case "yyyy/dd/mm":
            dateString = year + "/" + day + "/" + month;
            break;
        case "dd/mm/yyyy":
            dateString = day + "/" + month + "/" + year;
            break;
        case "mm/dd/yyyy":
            dateString = month + "/" + day + "-" + year;
            break;
        default:
            dateString = year + "-" + month + "-" + day;
            break;
    }

    if( arrayFormat[1] ){
        dateString += " " + time;
    }

    return dateString;
}

export const monthNameByNumber = ( monthNumber = null ) => {
    const arrayMonths = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];

    if( !monthNumber ) return "";
    
    const mes = parseInt(monthNumber);
    
    if( mes <= 0 || mes > 12 ) return "";
    return  arrayMonths[ mes - 1 ];

}