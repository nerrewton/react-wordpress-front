import React from 'react';
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";

const GoBack = ( props ) => {
    const goBack = ( ) => {
        props.history.goBack();
    }

    return (
        <Button variant="dark" size="lg" onClick={goBack}>
            Volver
        </Button>
    );
} 

export default withRouter(GoBack);