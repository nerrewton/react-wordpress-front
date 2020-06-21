import React, { Component } from "react";

import GoBack from "../components/GoBack";

class Page extends Component {
    constructor(params) {
        super(params);
        this.state = {
            title: "",
            content: "",
        };
    }

    render() {
        return (
            <>
                <div className="custom-container">
                    <div className="custom-content-page">
                        <article className="page">
                            <section className="page-header">
                                <h1 className="text-title">
                                    {this.state.title}
                                </h1>
                            </section>
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
