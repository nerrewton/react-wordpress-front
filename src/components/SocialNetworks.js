import React, { Component, Fragment } from 'react';
import socialNetworksParams from "../testParameters/socialNetworkPrarams.json";

import SocialNetrowkItem from "./SocialNetrowkItem";

class SocialNetworks extends Component {
    render() { 
        return (
            <Fragment>
                { socialNetworksParams && socialNetworksParams.length !== 0?
                socialNetworksParams.map(( element, key ) => (                    
                    <SocialNetrowkItem key={key} settings={element} />
                ))
                : null}
            </Fragment>
        );
    }
}
 
export default SocialNetworks;