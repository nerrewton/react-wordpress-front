import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import LeftAside from "../components/LeftAside";
import RightAside from "../components/RightAside";
import Buscador from "../components/Buscador";
import FiltroBusqueda from "../components/FiltroBusqueda";
import EntradaFeed from "../components/EntradaFeed";
import { getPostPaginate } from "../services/wordpress/wordpressServices";

class Home extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.abortController = new AbortController();

        this.state = {
            posts: [],
            page: 1,
            length: 5,
            hasMorePosts: true,
            loading: false
        };

        this.handlePosts = this.handlePosts.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.handlePosts();
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount(){
        this._isMounted = false;
        this.abortController.abort();
    }

    getPosts = page => {
        const promisePost = getPostPaginate(page, this.state.length, this.abortController.signal );

        promisePost
            .then(response => {
                let newState = {};

                if (response && response.length > 0) {
                    let nowPost = this.state.posts;
                    let actualPage = this.state.page;
                    let actualLength = this.state.length;

                    nowPost = nowPost.concat(response);

                    newState = {
                        posts: nowPost,
                        hasMorePosts: response.length === actualLength,
                        loading: false,
                        page:
                            response.length === actualLength
                                ? actualPage + 1
                                : actualPage
                    };
                } else {
                    newState = {
                        hasMorePosts: false,
                        loading: false
                    };
                }

                if( this._isMounted ){
                    this.setState({
                        ...this.state,
                        ...newState
                    });
                }
            })
            .catch(error => {
                console.warn("Warning al obtener post paginados", error);
            });
    };

    handlePosts = () => {
        this.getPosts(this.state.page);
        if( this._isMounted ){
            this.setState({
                ...this.state,
                loading: true
            });
        }
    };

    handleScroll = () => {
        let body = document.body,
            html = document.documentElement;
        let scroll = window.scrollY + html.clientHeight;

        let height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );

        if( scroll >= (height - 60 )  && this.state.hasMorePosts && !this.state.loading ){
            this.handlePosts( this.state.page );
        }
    };

    render() {
        return (
            <div className="custom-container">
                <LeftAside />
                <RightAside />
                <div className="custom-content">
                    <div className="custom-buscador">
                        <Row>
                            <Col>
                                <Buscador />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span className="custom-letra-opaca">
                                    Filtrar resultados
                                </span>
                                {/*
                                <FiltroBusqueda />
                                */}
                            </Col>
                        </Row>
                    </div>
                    <div className="custom-feed">
                        {this.state.posts.map((post, index) => {
                            return (
                                <Link to={"post/" + post.post_name} key={index}>
                                    <EntradaFeed data={post} />
                                </Link>
                            );
                        })}
                        <div id="no_post" className="custom-no-entries">
                            No hay más resultados!
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
