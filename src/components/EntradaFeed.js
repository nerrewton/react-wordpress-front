import React, { Component } from 'react';
import {
    Card
} from 'react-bootstrap';
import imagenEntry from '../assets/imagen_muestra_entry.png';

class EntradaFeed extends Component {
    render() { 
        return (
            <Card className="custom-entrada-card">
            <Card.Img variant="top" src={imagenEntry} />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
            </Card.Body>
            </Card>
        );
    }
}
 
export default EntradaFeed;