import React, { Component, lazy, Suspense } from 'react';
import { Spinner } from "react-bootstrap";
import { getImage } from "../tools/imagesTools";
import arrayTools from "../testParameters/toolsParams.json";

const CardTool = lazy(() => import("../components/CardTool"));
const Loading = () => <Spinner animation="border" variant="warning" className="spinnerCustom"/>;

class RightAside extends Component {
    render() { 
        return (
            <div className="custom-aside-right">
                {
                    arrayTools.map( (tool, key) => {
                        return (
                            tool.active ?
                            <Suspense fallback={Loading()} key={key}>
                                <CardTool key={key} url={tool.url} title={tool.title} image={getImage( tool.image )} />
                            </Suspense>
                            :null
                        )
                    })
                }
            </div>
        );
    }
}
 
export default RightAside;