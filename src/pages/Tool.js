import React, { Component, lazy, Suspense } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Spinner } from "react-bootstrap";
import { getImage } from "../tools/imagesTools";
import MetaData from "../components/MetaData"; 
import configTools from "../testParameters/toolsParams.json";

const Header = lazy(()=> import("../components/Header"));
const CardTool = lazy(()=> import("../components/CardTool"));
const LeftAside = lazy(()=> import("../components/LeftAside"));
const RightAside = lazy(()=> import("../components/RightAside"));
const ExportarFestivos = lazy( () => import("../tool_components/ExportarFestivos"));
const ContadorCaracteres = lazy( () => import("../tool_components/ContadorCaracteres"));
const PixelToRem = lazy( () => import("../tool_components/PixelToRem"));
const Loading = () => <Spinner animation="border" variant="warning" className="spinnerCustom"/>;

const components = {
    "ExportarFestivos": ExportarFestivos,
    "ContadorCaracteres": ContadorCaracteres,
    "PixelToRem": PixelToRem
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
                <Suspense fallback={Loading()}>
                    <Header />
                </Suspense>
                <div className="custom-container">
                    <Suspense fallback={Loading()}>
                        <LeftAside />
                    </Suspense>
                    <Suspense fallback={Loading()}>
                        <RightAside />
                    </Suspense>
                    <div className="custom-content p-3">
                        <section className="tool-header">
                            <h1 className="text-center text-title">{this.state.title}</h1>
                        </section>
                        <section className="tool-content mt-5">
                            {CurrentTool?<Suspense fallback={Loading()}><CurrentTool/></Suspense>
                            :configTools.map( (tool, key) => {
                                return tool.active ?<Suspense fallback={Loading()} key={key}><CardTool key={key} url={tool.url} title={tool.title} image={getImage( tool.image )} /></Suspense>:null
                            })}
                        </section>
                    </div>
                </div>
            </>
        );
    }
}

export default compose( withRouter, connect() )(Tool);
