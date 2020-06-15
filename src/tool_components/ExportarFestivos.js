import React, { Component, Fragment } from 'react';
import {
    Row,
    Col,
    Form
} from "react-bootstrap";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

/*import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/it';*/

class ExportarFestivos extends Component {
    state = {  }
    render() { 
        return (
            <Fragment>
                <Form>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Fecha inicio</Form.Label>
                                <DayPickerInput
                                />
                            </Col>
                            <Col>
                                <Form.Label>Fecha fin</Form.Label>
                            </Col>
                        </Row>                        
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>País</Form.Label>
                                <Form.Control as="select" name="pais_codigo">
                                    <option value="CO">Colombia</option>
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Buscar por descripción</Form.Label>
                                <Form.Control as="input" name="descripcion" placeholder="Ejem: Navidad"/>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Fragment>
        );
    }
}
 
export default ExportarFestivos;