import React, { Component, Fragment } from 'react';
import {
    Row,
    Col,
    Form,
    Button
} from "react-bootstrap";
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faBroom
} from '@fortawesome/free-solid-svg-icons';

class ContadorCaracteres extends Component {
    constructor(props){
        super(props);
        this.state = {
            counterType: 1,
            counterTypeText: "Caracteres",
            blankSpaces: true,
            textToProcess: "",
            textResult: null        
        }

        this.handleFiledChanges = this.handleFiledChanges.bind(this);
        this.handleClean = this.handleClean.bind(this);
    }

    handleFiledChanges( event ){
        const fieldName = event.target.name;
        const fieldValue = fieldName === "blankSpaces"? event.target.checked : event.target.value ;
        const tempBlankSpaces = fieldName === "blankSpaces" ? fieldValue : this.state.blankSpaces;
        let tempTextToProcess = fieldName === "textToProcess" ? fieldValue : this.state.textToProcess;
        const tempCounterType = fieldName === "counterType" ? parseInt( fieldValue ): parseInt( this.state.counterType );
        let counterTypeText = fieldName === "counterType" && parseInt( fieldValue ) === 1 ? "Caracteres" : fieldName === "counterType" ? "Palabras" : this.state.counterTypeText;
        let textResult = null;


        if( tempTextToProcess ){
            if( tempCounterType === 1 && tempBlankSpaces ){
                textResult = tempTextToProcess.length;
            }else if( tempCounterType === 1 && !tempBlankSpaces ){
                tempTextToProcess = tempTextToProcess.replace(/\s/g, "");
                textResult = tempTextToProcess.length;
            }else if( tempCounterType === 2 ){
                let tempArrayPalabras = tempTextToProcess.split(" ");
                tempArrayPalabras = tempArrayPalabras.filter((element, index) => ( element !== "" ));
                textResult = tempArrayPalabras.length;
            }
        }else{
            textResult = null;
        }

        this.setState({
            ...this.state,
            [fieldName]: fieldValue,
            counterTypeText,
            textResult
        });
    }

    handleClean(){
        this.setState({
            ...this.state,
            textToProcess: "",
            textResult: ""
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
                                    <Col md="6" xs="12">
                                        <Form.Label>Tipo de contador</Form.Label>
                                        <Form.Control as="select" name="counterType" value={this.state.counterType} onChange={this.handleFiledChanges}>
                                            <option value="1">Contador de caracteres</option>
                                            <option value="2">Contador de palabras</option>
                                        </Form.Control>
                                    </Col>
                                    <Col md="6" xs="12">
                                        <Form.Label>&nbsp;</Form.Label>
                                        <Form.Check type="checkbox" name="blankSpaces" label="Incluir espacios en blanco?" checked={this.state.blankSpaces} onChange={this.handleFiledChanges}/>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                {this.state.textResult?
                                <h5>Hay un total de {this.state.textResult + " " + this.state.counterTypeText}</h5>
                                :null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Control as="textarea" rows="10" name="textToProcess" placeholder="Copie y pegue el texto aquí" value={this.state.textToProcess} onChange={this.handleFiledChanges}/>
                            </Form.Group>                     
                            <Form.Group>
                                <Button variant="info" onClick={()=>this.handleClean()}>Limpiar <FontAwesomeIcon icon={faBroom} /></Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}
 
export default ContadorCaracteres;