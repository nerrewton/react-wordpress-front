import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { getPostByUrl } from "../services/wordpress/wordpressServices";
import { dateToString } from "../tools/dateTools";
import MobileAds from "../components/MobileAds";
import MetaData from "../components/MetaData";
import GoBack from "../components/GoBack";

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
    }

    updateMetaData(type = "", metadata = {}) {
        this.props.dispatch({ type, metadata });
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

                    this.updateMetaData("SET_META_DATA", {
                        title: response.post_title,
                        description: response.post_content,
                        type: "article",
                        author: response.WpUsers.display_name,
                        url: window.location.href
                    });
                }
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    componentDidMount() {
        this.getPostContent();

        window.addEventListener("scroll", () => {});
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        return (
            <>
                <MetaData />
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
                        <GoBack />
                    </div>
                    <MobileAds />
                </div>
            </>
        );
    }
}

export default connect()(Post);
