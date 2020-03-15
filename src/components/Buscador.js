import React, { Component } from 'react';
import {
    Row,
    Col,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faSearch
} from '@fortawesome/free-solid-svg-icons';

class Buscador extends Component {
    state = {  }
    render() { 
        return (
            <Row>
                <Col>
                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="buscador-icon">
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Buscar"
                        aria-label="Buscar"
                        aria-describedby="buscador-icon"
                        />
                    </InputGroup>
                </Col>
            </Row>
        );
    }
}
 
export default Buscador;