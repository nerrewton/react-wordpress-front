/**
 * Created By: Rene Artega
 * Date: 2020-03-21
 * Content: Servicios que hacen llamados al api de menu
 */
import configuration from '../../config/configuration.json';

export const getAllMenus = ( portal = configuration.portal_id, tipoUsuario = 1 ) => {
    return fetch(configuration.api_url + "menu", {
        method: "GET",
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }).then( response => response.json() );
}