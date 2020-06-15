import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import CardTool from "../components/CardTool";
import LeftAside from "../components/LeftAside";
import RightAside from "../components/RightAside";
import MetaData from "../components/MetaData";
import ExportarFestivos from "../tool_components/ExportarFestivos";
import ContadorCaracteres from "../tool_components/ContadorCaracteres";
import { getImage } from "../tools/imagesTools";
import configTools from "../testParameters/toolsParams.json";

const components = {
    "ExportarFestivos": ExportarFestivos,
    "ContadorCaracteres": ContadorCaracteres
}

class Tool extends Component {
    history = null;
    triggerTools = true;

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
        this.history = this.props.history;
        this.history.listen(() =>{
            if( this.triggerTools ) this.setTool();
        });
        this.setTool();
    }

    componentWillUnmount(){
        this.triggerTools = false;
    }

    render() {
        const CurrentTool = this.state.ToolComponent;
        return (
            <>
                <MetaData />
                <div className="custom-container">
                    <LeftAside />
                    <RightAside />
                    <div className="custom-content p-3">
                        <section className="tool-header">
                            <h1 className="text-center text-title">{this.state.title}</h1>
                        </section>
                        <section className="tool-content mt-5">
                            {CurrentTool?<CurrentTool/>
                            :configTools.map( (tool, key) => {
                                return tool.active ?<CardTool key={key} url={tool.url} title={tool.title} image={getImage( tool.image )} />:null
                            })}
                        </section>
                    </div>
                </div>
            </>
        );
    }
}

export default compose( withRouter, connect() )(Tool);
