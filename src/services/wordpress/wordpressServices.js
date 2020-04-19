/**
 * Created By: Rene Artega
 * Date: 2020-03-28
 * Content: Servicios que hacen llamados al api de wordpress
 */
import configuration from '../../config/configuration.json';

export const getPostPaginate = ( page = 1, length = 5, signal ) => {
    return fetch(configuration.api_wordpress_url + "posts/paginate/" + page + "/" + length, {
        signal,
        method: "GET",
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }).then( response => response.json() );
}

export const getPostById = ( postId ) => {
    if( !postId ) return {};

    return fetch(configuration.api_wordpress_url + "posts/"+ postId, {
        method: "GET",
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }).then( response => response.json() );
}