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
import { getAllFilteredHolyDays } from "../services/dia_festivo/diaFestivoServices";
import { monthNameByNumber } from "../tools/dateTools";

class ExportarFestivos extends Component {
    constructor(props){
        super(props);
        
        this._isMounted = false;
        this.abortController = new AbortController();

        this.state = {
            diasFestivos: [],
            fechaInicio: formatDate( new Date()),
            fechaFin: formatDate( new Date()),
            paisCodigo: "CO",
            descripcion: ""
        };

        this.handleFiledChanges = this.handleFiledChanges.bind( this );
        this.handleDayPick = this.handleDayPick.bind( this );

    }

    loadDiasFestivos(){
        const promiseDiasFestivos = getAllFilteredHolyDays(
            null,
            null,
            this.state.descripcion,
            this.state.paisCodigo,
            this.abortController.signal
        );

        promiseDiasFestivos.then( response => {
            if( response && response.length > 0 ){
                this.setState({
                    ...this.state,
                    diasFestivos: response
                });
            }
            
        }).catch( error => console.warn(error) );
    }

    handleFiledChanges( event ){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            ...this.state,
            [name]: value
        });

        this.loadDiasFestivos();
    }

    handleDayPick( date, modifiers, input ){
        const name = input.props.inputProps.name;

        this.setState({
            ...this.state,
            [name]: date
        });        
    }

    componentDidMount(){
        this._isMounted = true;
        this.loadDiasFestivos();
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.abortController.abort();
    }

    render() { 
        return (
            <Fragment>
                <Form>                    
                    <Row>
                        <Col md="6" xs="12">
                            <Form.Group>
                                <Form.Label>Fecha inicio</Form.Label>
                                <DayPickerInput
                                inputProps={{className: "form-control", name: "fechaInicio", readOnly: true }}
                                value={this.state.fechaInicio}
                                onDayChange={ this.handleDayPick }
                                style={{width: "100%"}}
                                formatDate={formatDate}
                                parseDate={parseDate}
                                placeholder={`${formatDate( new Date())}`}
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
                                inputProps={{className: "form-control", name: "fechaFin", readOnly: true }}
                                value={this.state.fechaFin}
                                onDayChange={ this.handleDayPick }
                                style={{width: "100%"}}
                                formatDate={formatDate}
                                parseDate={parseDate}
                                placeholder={`${formatDate( new Date())}`}
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
                                <Form.Control as="select" name="paisCodigo" value={this.state.paisCodigo} onChange={this.handleFiledChanges}>
                                    <option value="CO">Colombia</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md="6" xs="12">
                            <Form.Group>
                                <Form.Label>Buscar por descripción</Form.Label>
                                <Form.Control as="input" name="descripcion" placeholder="Ejem: Navidad" value={this.state.descripcion} onChange={this.handleFiledChanges}/>
                            </Form.Group>
                        </Col>
                    </Row>                    
                </Form>
                <div>
                    <span className="leyenda-dias-festivos">Los días festivos mostrados abajo son generales, el botón de <strong>Exportar</strong> descarga en Excel los días con las fechas exactas que se encuentran entre <strong>Fecha inicio</strong> y <strong>Fecha fin</strong>.</span>
                    { this.state.diasFestivos?
                    this.state.diasFestivos.map( (dia, key) => (
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