import React from "react";
import { connect } from "react-redux";

import { Helmet } from "react-helmet";

const MetaData = (props) => {
    return (
        <>
            <Helmet>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
                <meta name="robots" content="index" />
                <meta name="author" content={props.author} />
                <meta name="copyright" content={props.author} />

                <meta property="og:type" content={props.type} />
                <meta property="og:title" content={props.title} />
                <meta property="og:description" content={props.description} />
                {props.image ? (
                    <meta property="og:image" content={props.image} />
                ) : (
                    ""
                )}
                {props.keywords ? (
                    <meta name="keywords" content={props.keywords} />
                ) : (
                    ""
                )}
                <meta property="og:url" content={window.location.href} />
                <meta property="og:site_name" content={props.siteName} />
            </Helmet>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        title: state.metadata.title,
        description: state.metadata.description,
        image: state.metadata.image,
        type: state.metadata.type,
        author: state.metadata.author,
        siteName: state.metadata.site_name,
        url: state.metadata.url,
        keywords: state.metadata.keywords
    };
};

export default connect(mapStateToProps)(MetaData);
