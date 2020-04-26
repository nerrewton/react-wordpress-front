import React from 'react';
import configuration from "../config/configuration.json";

const WebAds = () =>{
    return(
        <div className="web-ads" dangerouslySetInnerHTML={{__html: configuration.adsJavaScript}}>        
        </div>
    )
}

export default WebAds;