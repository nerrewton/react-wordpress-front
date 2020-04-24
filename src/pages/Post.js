import React, { Component } from 'react';
import {
    Row,
    Col
} from "react-bootstrap";

import { getPostByUrl } from "../services/wordpress/wordpressServices";
import { dateToString } from "../tools/dateTools";

class Post extends Component {
    constructor( props ){
        super( props );

        this.state = {
            title: "",
            author: "",
            publishingDate: "",
            content: "",
            postUrl: ""
        };

        this.abortController = new AbortController();
    }

    getPostContent(){
        const url = window.location.pathname;
        const postContentRequest = getPostByUrl( url.substr( 6 ), this.abortController.signal );

        postContentRequest.then( response => {
            if( response ){
                let newState = {
                    title: response.post_title,
                    author: response.WpUsers.display_name,
                    publishingDate: dateToString( new Date(response.post_date), 'yyyy/mm/dd' ),
                    content: response.post_content
                };
    
                this.setState({
                    ...this.state,
                    ...newState
                });
            }

        }).catch( error =>{
            console.warn( error );
        });
    }

    componentDidMount(){
        this.getPostContent();
    }

    componentWillUnmount(){
        this.abortController.abort();
    }

    render() { 
        return (
            <div className="custom-container">
                <div className="custom-content-post">
                    <article className="post">
                        <section className="post-header">
                            <h1>{ this.state.title }</h1>
                            <Row>
                                <Col><span className="float-left">Autor: { this.state.author }</span></Col>
                                <Col><span className="float-right">Fecha: { this.state.publishingDate }</span></Col>
                            </Row>
                        </section>
                        <section className="post-content" dangerouslySetInnerHTML={{__html: this.state.content}}>
                        </section>
                        <section className="post-footer">
                        </section>
                    </article>
                </div>
            </div>
        );
    }
}
 
export default Post;