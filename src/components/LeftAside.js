import React, { Component } from 'react';

import Politica from "./Politica";
import Help from "./Help";
import SocialNetworks from "./SocialNetworks";

class LeftAside extends Component {
    render() { 
        return (
            <div className="custom-aside-left">
                <div className="social-networks-container">
                    <SocialNetworks />
                </div>
                <div className="politica-container">
                    <Politica />
                    <Help />
                </div>
            </div>
        );
    }
}
 
export default LeftAside;