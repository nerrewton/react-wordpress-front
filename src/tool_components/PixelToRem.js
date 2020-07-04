import React, { Component, Fragment } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';

class PixelToRem extends Component {
    constructor( props ){
        super(props);
        this.state = {
            pixel: 0,
            rem: 0
        }

        this.handleFiledChanges = this.handleFiledChanges.bind(this);
    }

    handleFiledChanges ( element ){
        const proportion = 0.0625;
        const name = element.target.name;
        let value = element.target.value;
        const to = element.target.getAttribute("target_to");
        let convertion = "";

        if ( !Number.isNaN( parseFloat( value ) ) ) {
            convertion = to === "rem"? value * proportion: value / proportion;
        }else{
            value = "";
        }

        this.setState({
            ...this.state,
            [name]: value,
            [to]: convertion
        });
    }

    render() { 
        return (
            <Fragment>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Row>
                                    <Col md="5" xs="5">
                                        <Form.Label>Piexel</Form.Label>
                                        <Form.Control type="text" name="pixel" target_to="rem" value={this.state.pixel} onChange={this.handleFiledChanges}/>
                                    </Col>
                                    <Col md="2" xs="2" className="text-center">
                                        <FontAwesomeIcon icon={faArrowsAltH} size="2x"/>
                                    </Col>
                                    <Col md="5" xs="5">
                                        <Form.Label>Rem</Form.Label>
                                        <Form.Control type="text" name="rem" target_to="pixel" value={this.state.rem} onChange={this.handleFiledChanges}/>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <p>
                                            Cuando estamos trabajando en plataformas responsive vemos la necesidad de ajustar el tamaño de los textos 
                                            para que se adapten a las diferentes resoluciones de pantalla, para este propósito existe la porpiedad rem en css. 
                                            Rem se ajusta en relación a la unidad vw ( wiewport width ).
                                        </p>
                                        <p>
                                           La relación entre ambas unidades esta dada por la siguiente expresión:
                                        </p>
                                        <code> 16px {"<=>"} 1rem </code>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form> 
                    </Col>
                </Row>
            </Fragment>
        );
    }
}
 
export default PixelToRem;