import React, { Component } from 'react';
import { Button } from "react-bootstrap";

import LeftAside from "../components/LeftAside";
import RightAside from "../components/RightAside";

class Tool extends Component {
    constructor(props){
        super(props);

        this.state = {
            titulo: "Sección de herramientas",
            ayuda: "",
            descripcion: "Selecciona cualquiera de las opciociones disponibles, todas son totalmente gratis."
        }
    }

    componentDidMount(){

    }

    render() { 
        return (
            <div className="custom-container">
                <LeftAside />
                <RightAside />
                <div className="custom-content">
                    <section className="tool-header">
                        <h1 className="text-center">
                            { this.state.titulo }
                        </h1>
                    </section>
                    <section className="tool-content">
                        <p>{ this.state.descripcion }</p>
                    </section>
                    <section className="tool-footer">
                        <Button variant="info">Ayuda</Button>
                    </section>
                </div>
            </div>
        );
    }
}
 
export default Tool;