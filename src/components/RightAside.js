import React, { Component } from 'react';
import CardTool from "../components/CardTool";

import { getImage } from "../tools/imagesTools";
import arrayTools from "../testParameters/toolsParams.json";

class RightAside extends Component {
    render() { 
        return (
            <div className="custom-aside-right">
                {
                    arrayTools.map( (tool, key) => (
                        <CardTool key={key} url={tool.url} title={tool.title} image={getImage( tool.image )} />
                    ))
                }
            </div>
        );
    }
}
 
export default RightAside;