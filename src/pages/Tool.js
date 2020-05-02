import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import LeftAside from "../components/LeftAside";
import RightAside from "../components/RightAside";
import MetaData from "../components/MetaData";

class Tool extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titulo: "Herramientas para desarrolladores",
            description: "",
            ayuda: "",
            content:
                "Selecciona cualquiera de las opciociones disponibles, todas son totalmente gratis.",
        };
    }

    updateMetaData(type = "", metadata = {}) {
        this.props.dispatch({ type, metadata });
    }
    
    componentDidMount(){
        this.updateMetaData("SET_META_DATA", {
            title: "Herramientas para desarrolladores",
            description: "Cockycode herramientas gratuitas para desarrolladores",
            type: "page",
            author: "Gerardo Arteaga",
            url: window.location.href,
            keywords: "cockycode,dias festivos,dias festivos csv,dias festivos xls,dias festivos excel,contador de caracteres,contador de palabras,tildes to acute,tildes to html,eliminar espacios en blanco,exportar dias festivos"
        });
    }

    render() {
        return (
            <>
                <MetaData />
                <div className="custom-container">
                    <LeftAside />
                    <RightAside />
                    <div className="custom-content">
                        <section className="tool-header">
                            <h1 className="text-center">{this.state.titulo}</h1>
                        </section>
                        <section className="tool-content">
                            <p>{this.state.descripcion}</p>
                        </section>
                        <section className="tool-footer">
                            <Button variant="info">Ayuda</Button>
                        </section>
                    </div>
                </div>
            </>
        );
    }
}

export default connect()(Tool);
