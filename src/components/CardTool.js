import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardTool = ( props ) => {
    if( !props.title ) return null;
    return (
        <Link to={props.url} className="link-card-tool">
            <Card className="card-tool-item">
                <Card.Body>
                    <Card.Text>{ props.title }</Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src={ props.image } alt={ props.title } className="card-image-tool"/>
            </Card>
        </Link>
    );
};

export default CardTool;
