import React, { Component, Fragment } from 'react';
import {
    Row,
    Col,
    Form,
    Card
} from "react-bootstrap";
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faCalendar
} from '@fortawesome/free-solid-svg-icons';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/es';
import { monthNameByNumber } from "../tools/dateTools";

const diasFestivos = [
    {
        mes_numero: 6,
        dia_numero: 15,
        descripcion: "San Jose, San Pedro",
        pais_codigo: "CO",
        pais_nombre: "Colombia"
    },
    {
        mes_numero: 12,
        dia_numero: 25,
        descripcion: "navidad",
        pais_codigo: "CO",
        pais_nombre: "Colombia"
    }
];

class ExportarFestivos extends Component {
    state = {  }
    render() { 
        return (
            <Fragment>
                <Form>                    
                    <Row>
                        <Col md="6" xs="12">
                            <Form.Group>
                                <Form.Label>Fecha inicio</Form.Label>
                                <DayPickerInput
                                inputProps={{className: "form-control", name: "fecha_inicio"}}
                                style={{width: "100%"}}
                                formatDate={formatDate}
                                parseDate={parseDate}
                                placeholder={`${formatDate( new Date())}`}
                                className="form-control"
                                dayPickerProps={{
                                    locale: 'es',
                                    localeUtils: MomentLocaleUtils,
                                }}
                                />
                            </Form.Group>
                        </Col>
                        <Col md="6" xs="12">
                            <Form.Group>
                                <Form.Label>Fecha fin</Form.Label>
                                <DayPickerInput
                                inputProps={{className: "form-control", name: "fecha_fin"}}
                                style={{width: "100%"}}
                                formatDate={formatDate}
                                parseDate={parseDate}
                                placeholder={`${formatDate( new Date())}`}
                                className="form-control"
                                dayPickerProps={{
                                    locale: 'es',
                                    localeUtils: MomentLocaleUtils,
                                }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6" xs="12">
                            <Form.Group>
                                <Form.Label>País</Form.Label>
                                <Form.Control as="select" name="pais_codigo">
                                    <option value="CO">Colombia</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md="6" xs="12">
                            <Form.Group>
                                <Form.Label>Buscar por descripción</Form.Label>
                                <Form.Control as="input" name="descripcion" placeholder="Ejem: Navidad"/>
                            </Form.Group>
                        </Col>
                    </Row>                    
                </Form>
                <div>
                    <span className="leyenda-dias-festivos">Los días festivos mostrados abajo son generales, el botón de <strong>Exportar</strong> descarga en Excel los días con las fechas exactas que se encuentran entre <strong>Fecha inicio</strong> y <strong>Fecha fin</strong>.</span>
                    { diasFestivos?
                    diasFestivos.map( (dia, key) => (
                        <Card key={key} className="mb-3">
                            <Card.Body><FontAwesomeIcon icon={faCalendar} />{" "}<strong>{dia.dia_numero + " de " + monthNameByNumber(dia.mes_numero) + ". " + dia.descripcion}</strong></Card.Body>
                        </Card>
                    ))
                    : null}
                </div>
            </Fragment>
        );
    }
}
 
export default ExportarFestivos;