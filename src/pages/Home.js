import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import LeftAside from "../components/LeftAside";
import RightAside from "../components/RightAside";
import Buscador from "../components/Buscador";
import EntradaFeed from "../components/EntradaFeed";
import MetaData from "../components/MetaData";
import { getPostPaginate } from "../services/wordpress/wordpressServices";

class Home extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.abortController = new AbortController();

        this.state = {
            loading: false,
        };

        this.handlePosts = this.handlePosts.bind(this);
    }

    updatePost(type = "", posts = []) {
        this.props.dispatch({ type, posts });
    }

    updateMetaData(type = "", metadata = {}) {
        this.props.dispatch({ type, metadata });
    }

    componentDidMount() {
        this._isMounted = true;
        if (this.props.posts.length <= 0) {
            this.handlePosts("HOME_POST_NEXT_PAGE");
        } else {
            this.updatePost();
        }

        this.updateMetaData("SET_META_DATA", {
            title: "Cockycode",
            description:
                "Cockycode herramientas gratuitas para desarrolladores",
            type: "website",
            keywords:
                "cockycode,dias festivos,dias festivos csv,dias festivos xls,dias festivos excel,contador de caracteres,contador de palabras,tildes to acute,tildes to html,eliminar espacios en blanco,exportar dias festivos",
            author: "Gerardo Arteaga",
            url: window.location.href,
        });

        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.abortController.abort();
    }

    getPosts = (type) => {
        const promisePost = getPostPaginate(
            this.props.page,
            this.props.length,
            this.abortController.signal
        );

        promisePost
            .then((response) => {
                if (response && response.length > 0) {
                    this.updatePost(type, response);
                }

                if (this._isMounted) {
                    this.setState({
                        ...this.state,
                        loading: false,
                    });
                }
            })
            .catch((error) => {
                console.warn("Warning al obtener post paginados", error);
            });
    };

    handlePosts = (type) => {
        this.getPosts(type);
        if (this._isMounted) {
            this.setState({
                ...this.state,
                loading: true,
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

        if (
            scroll >= height - 60 &&
            this.props.hasMorePosts &&
            !this.state.loading
        ) {
            this.handlePosts("HOME_POST_NEXT_PAGE");
        }
    };

    render() {
        return (
            <>
                <MetaData />
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
                            {this.props.posts.map((post, index) => {
                                return (
                                    <Link
                                        to={"post/" + post.post_name}
                                        key={index}
                                    >
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
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.homePost.posts,
        page: state.homePost.page,
        length: state.homePost.length,
        hasMorePosts: state.homePost.hasMorePosts,
    };
}

export default connect(mapStateToProps)(Home);
