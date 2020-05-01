import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";

import { getPostByUrl } from "../services/wordpress/wordpressServices";
import { dateToString } from "../tools/dateTools";
import MobileAds from "../components/MobileAds";
import { getDescripcion } from "../tools/wordpressTools";

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            author: "",
            publishingDate: "",
            content: "",
            postUrl: "",
        };

        this.abortController = new AbortController();
        this.goBack = this.goBack.bind(this);
    }

    getPostContent() {
        const url = window.location.pathname;
        const postContentRequest = getPostByUrl(
            url.substr(6),
            this.abortController.signal
        );

        postContentRequest
            .then((response) => {
                if (response) {
                    let newState = {
                        title: response.post_title,
                        author: response.WpUsers.display_name,
                        publishingDate: dateToString(
                            new Date(response.post_date),
                            "yyyy/mm/dd"
                        ),
                        content: response.post_content,
                    };

                    this.setState({
                        ...this.state,
                        ...newState,
                    });
                }
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    goBack() {
        this.props.history.goBack();
    }

    componentDidMount() {
        this.getPostContent();
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        const contentMeta = getDescripcion(this.state.content);
        return (
            <>
                {this.state.title ? (
                    <Helmet>
                        <title>{this.state.title}</title>
                        <meta
                            name="description"
                            content={contentMeta}
                        />
                        <meta name="robots" content="index"/>
                        <meta name="author" content={this.state.author} />
                        <meta name="copyright" content={this.state.author} />

                        <meta property="og:type" content="article" />
                        <meta property="og:title" content={this.state.title} />
                        <meta property="og:description" content={contentMeta} />
                        <meta property="og:image" content="LINK A LA IMAGEN DESTACADA" />
                        <meta property="og:url" content={window.location.href} />
                        <meta property="og:site_name" content="cockycode" />
                    </Helmet>
                ) : (
                    ""
                )}
                <div className="custom-container">
                    <div className="custom-content-post">
                        <article className="post">
                            <section className="post-header">
                                <h1>{this.state.title}</h1>
                                <Row>
                                    <Col>
                                        <span className="float-left">
                                            Autor: {this.state.author}
                                        </span>
                                    </Col>
                                    <Col>
                                        <span className="float-right">
                                            Fecha: {this.state.publishingDate}
                                        </span>
                                    </Col>
                                </Row>
                            </section>
                            <section
                                className="post-content"
                                dangerouslySetInnerHTML={{
                                    __html: this.state.content,
                                }}
                            ></section>
                            <section className="post-footer"></section>
                        </article>
                        <Button variant="dark" size="lg" onClick={this.goBack}>
                            Volver
                        </Button>
                    </div>
                    <MobileAds />
                </div>
            </>
        );
    }
}

export default withRouter(Post);
