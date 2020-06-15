/**
 * Created By: Rene Artega
 * Date: 2020-06-15
 * Content: Servicios que hacen llamados al api de menu
 */
import configuration from '../../config/configuration.json';

export const getAllFilteredHolyDays = ( mes = null, dia = null, descripcion = null, paisCodigo = null, signal ) => {
    const params = {
        mes_numero: mes,
        dia_numero: dia,
        descripcion: descripcion,
        pais_codigo: paisCodigo
    };

    return fetch(configuration.api_url + "dia_festivo/filtrar", {
        signal,
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify( params )
    }).then( response => response.json() );
}