import React from 'react';
import configuration from "../config/configuration.json";

const MobileAds = () =>{
    return(
        <div className="floating-ads" dangerouslySetInnerHTML={{__html: configuration.adsJavaScript}}>
        </div>
    )
}

export default MobileAds;