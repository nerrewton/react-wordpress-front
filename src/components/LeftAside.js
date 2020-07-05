import React, { Component, lazy, Suspense } from 'react';

const Politica = lazy( () => import("./Politica") );
const Help = lazy( () => import("./Help") );
const SocialNetworks = lazy( () => import("./SocialNetworks") );

class LeftAside extends Component {
    render() { 
        return (
            <div className="custom-aside-left">
                <div className="social-networks-container">
                    <SocialNetworks />
                </div>
                <div className="politica-container">
                    <Suspense>
                        <Politica />
                        <Help />
                    </Suspense>
                </div>
            </div>
        );
    }
}
 
export default LeftAside;