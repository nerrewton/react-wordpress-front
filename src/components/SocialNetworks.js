import React, { Component, Fragment, lazy, Suspense } from 'react';
import { Spinner } from "react-bootstrap";
import socialNetworksParams from "../testParameters/socialNetworkPrarams.json";

const SocialNetrowkItem = lazy( () => import("./SocialNetrowkItem") );
const Loading = () => <Spinner animation="border" variant="warning" className="spinnerCustom"/>;

class SocialNetworks extends Component {
    render() { 
        return (
            <Fragment>
                { socialNetworksParams && socialNetworksParams.length !== 0?
                socialNetworksParams.map(( element, key ) => (
                    <Suspense key={key} fallback={Loading()}>
                        <SocialNetrowkItem key={key} settings={element} />
                    </Suspense>
                ))
                : null}
            </Fragment>
        );
    }
}
 
export default SocialNetworks;