import React, { Component } from 'react';
import { getImage } from "../tools/imagesTools";
import arrayTools from "../testParameters/toolsParams.json";

import CardTool from "../components/CardTool";

class RightAside extends Component {
    render() { 
        return (
            <div className="custom-aside-right">
                {
                    arrayTools.map( (tool, key) => {
                        return (
                            tool.active ?
                            <CardTool key={key} url={tool.url} title={tool.title} image={getImage( tool.image )} />
                            :null
                        )
                    })
                }
            </div>
        );
    }
}
 
export default RightAside;