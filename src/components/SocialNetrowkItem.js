import React, { Fragment } from "react";
import facebook from "../assets/social_networks/facebook.png";
import twitter from "../assets/social_networks/twitter.png";
import instagram from "../assets/social_networks/instagram.png";
import github from "../assets/social_networks/github.png";

const logos = {
    facebook: facebook,
    twitter: twitter,
    instagram: instagram,
    github: github
}

const SocialNetworkItem = ( props ) => {
    return (
        <Fragment>
            <div className="social-item">
                <a href={props.settings.url}>
                    <img src={logos[props.settings.icon]} alt={props.settings.name} title={props.settings.name}/>
                </a>
            </div>
        </Fragment>
    )
}

export default SocialNetworkItem;