import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const GoBack = ( props ) => {   
    return (
        <Link to="/">
            <Button variant="dark" size="lg">
                Volver
            </Button>
        </Link>
    );
} 

export default withRouter(GoBack);