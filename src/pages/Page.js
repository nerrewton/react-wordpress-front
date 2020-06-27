import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import Header from "../components/Header";
import GoBack from "../components/GoBack";
import { getPostByName } from "../services/wordpress/wordpressServices";
import { dateToString } from "../tools/dateTools";

class Page extends Component {
    constructor(params) {
        super(params);
        this.state = {
            title: "",
            author: "",
            publishingDate: "",
            content: "",
            loading: false
        };

        this.abortController = new AbortController();
    }

    getPageContent(){
        const url = window.location.pathname;
        const pageContentRequest = getPostByName(
            url.substr(6),
            this.abortController.signal
        );

        pageContentRequest
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
                        loading: false
                    });
                }
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            loading: true
        }, () => this.getPageContent());

        window.addEventListener("scroll", () => {});
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        return (
            <>
                <Header />
                <div className="custom-container">
                    <div className="custom-content-page">
                        <article className="page">
                            <section className="page-header">
                                <h1 className="text-title">
                                    {this.state.title}
                                </h1>
                            </section>
                            { this.state.loading ?
                            <Spinner animation="border" variant="warning" className="spinnerCustom"/>
                            : null}
                            <section
                                className="page-content"
                                dangerouslySetInnerHTML={{
                                    __html: this.state.content,
                                }}
                            ></section>
                            <section className="page-footer"></section>
                        </article>
                        <GoBack />
                    </div>
                </div>
            </>
        );
    }
}

export default Page;
