import React from "react";
import {
    Row,
    Col
} from 'react-bootstrap';

import LeftAside from '../components/LeftAside';
import RightAside from '../components/RightAside';
import Buscador from '../components/Buscador';
import FiltroBusqueda from '../components/FiltroBusqueda';
import EntradaFeed from '../components/EntradaFeed';

const Home = () => {
    return (
        <div className="custom-container">
            <LeftAside />
            <RightAside />
            <div className="custom-content">
                <div className="custom-buscador">
                    <Row>
                        <Col>
                            <Buscador />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span className="custom-letra-opaca">Filtrar resultados:</span>
                            <FiltroBusqueda />
                        </Col>
                    </Row>
                </div>
                <div className="custom-feed">
                    <EntradaFeed />
                    <EntradaFeed />
                    <EntradaFeed />
                    <EntradaFeed />
                    <EntradaFeed />
                    <EntradaFeed />
                </div>       
            </div>
        </div>
    )
}

export default Home;