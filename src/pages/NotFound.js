import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotFound = () => {
    return (
        <div className="custom-container">
            <div className="custom-content">
                <h2>Lo sentimos, ésta página no fue encontrada.</h2>
                <br/>
                <Link to="/">
                    <Button variant="dark" size="lg">Volver</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
