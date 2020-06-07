import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import LeftAside from "../components/LeftAside";
import RightAside from "../components/RightAside";
import MetaData from "../components/MetaData";
import ExportarFestivos from "../tool_components/ExportarFestivos";
import ContadorCaracteres from "../tool_components/ContadorCaracteres";
import configTools from "../testParameters/toolsParams.json";

const components = {
    "ExportarFestivos": ExportarFestivos,
    "ContadorCaracteres": ContadorCaracteres
}

class Tool extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Herramientas para desarrolladores",
            description: "",
            help: "",
            ToolComponent: null
        };
    }

    updateMetaData(type = "", metadata = {}) {
        this.props.dispatch({ type, metadata });
    }

    setTool(){
        const path = window.location.pathname;
        const tool = configTools.find( (element, index) =>{
            return element.url === path;
        });

        if( !tool ) return;

        this.setState({
            ...this.state,
            title: tool.title,
            description: tool.description,
            ToolComponent: components[tool.component]
        });

        this.updateMetaData("SET_META_DATA", {
            title: tool.title,
            description: tool.description,
            type: "page",
            author: "Gerardo Arteaga",
            url: window.location.href,
            keywords: tool.keywords
        });
    }
    
    componentDidMount(){
        this.setTool();        
    }

    render() {
        const CurrentTool = this.state.ToolComponent;
        return (
            <>
                <MetaData />
                <div className="custom-container">
                    <LeftAside />
                    <RightAside />
                    <div className="custom-content">
                        <section className="tool-header">
                            <h1 className="text-center">{this.state.title}</h1>
                        </section>
                        <section className="tool-content mt-5">
                            {CurrentTool?<CurrentTool/>:null}
                        </section>
                    </div>
                </div>
            </>
        );
    }
}

export default connect()(Tool);
