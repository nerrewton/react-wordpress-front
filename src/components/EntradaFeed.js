import React, { useEffect, useState } from 'react';
import {
    Card
} from 'react-bootstrap';
import { getPostById } from '../services/wordpress/wordpressServices';
import { getDescripcion } from "../tools/wordpressTools";

const EntradaFeed = ( params ) => {
    const { data } = params;
    const [ meta, setMeta ] = useState({});
    
    const getMetaPost = ( postId ) => {
        const promiseMeta = getPostById( postId );

        promiseMeta.then( response => {
            if( response ){
                setMeta( response );
            }
        }).catch( error => {
            console.error("Error al obtener meta del post", error);
        });
    }

    useEffect(() => {
        if( data && data.WpPostMeta && data.WpPostMeta.length > 0 ){
            let metaId = null;
            //Obtiene el meta relacionado con la imagen destacada
            data.WpPostMeta.forEach( metaItem => {
                if( metaItem.meta_key === "_thumbnail_id" ){
                    metaId = parseInt( metaItem.meta_value );
                }
            });

            getMetaPost( metaId );
        }

    }, [data]);

    return (
        <Card className="custom-entrada-card">
            <Card.Img variant="top" src={ meta && meta.guid ? meta.guid : ""} alt={ meta && meta.post_title ? meta.post_title : ""}/>
            <Card.Body>
                <Card.Title>{data.post_title}</Card.Title>
                <Card.Text>{ getDescripcion(data.post_content) }</Card.Text>
            </Card.Body>
        </Card>
    );
}
 
export default EntradaFeed;