import React, { Component, Fragment } from 'react';
import {
    Row,
    Col,
    Form,
    Card,
    Button,
    Spinner
} from "react-bootstrap";
import Toast from 'react-bootstrap/Toast'
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faCalendar,
    faFileExcel
} from '@fortawesome/free-solid-svg-icons';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/es';
import { getAllFilteredHolyDays } from "../services/dia_festivo/diaFestivoServices";
import { monthNameByNumber, dateToString } from "../tools/dateTools";
import { exportToXlsx } from "../tools/exportTools";

class ExportarFestivos extends Component {
    constructor(props){
        super(props);
        
        this._isMounted = false;
        this.abortController = new AbortController();

        this.state = {
            loading: false,
            showToast: false,
            toastMessage: "",
            diasFestivos: [],
            fechaInicio: new Date(),
            fechaFin: new Date(),
            paisCodigo: "CO",
            descripcion: ""
        };

        this.handleFiledChanges = this.handleFiledChanges.bind( this );
        this.handleDayPick = this.handleDayPick.bind( this );
        this.handleExportClick = this.handleExportClick.bind( this );

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
            if( this._isMounted && response && response.length > 0 ){
                this.setState({
                    ...this.state,
                    diasFestivos: response,
                    loading: false
                });
            }
            
        }).catch( error => console.warn(error) );
    }

    handleFiledChanges( event ){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            ...this.state,
            [name]: value,
            loading: true
        }, () => this.loadDiasFestivos() );        
    }

    handleDayPick( date, modifiers, input ){
        const name = input.props.inputProps.name;

        this.setState({
            ...this.state,
            [name]: date
        });        
    }

    handleExportClick(){
        const diasFestivos = this.state.diasFestivos;
        const fechaInicio = this.state.fechaInicio;
        const fechaFin = this.state.fechaFin;
        const fiTime = fechaInicio.getTime();
        const ffTime = fechaFin.getTime();
        const diff = ffTime - fiTime;
        const diasEntreFechas = Math.ceil( diff / (1000 * 3600 * 24) );
        let data = [];

        if( diff < 0 ) {
            this.setState({
                ...this.state,
                showToast: true,
                toastMessage: "La Fecha fin debe ser mayor a Fecha inicio."
            });

            return;
        }else if ( diasEntreFechas === 0 ) {
            const mesNumero = fechaInicio.getMonth() + 1; //January is 1
            const diaNumero = fechaInicio.getDate();
            const dia = diasFestivos.filter( ( festivo, index ) => ( mesNumero === parseInt( festivo.mes_numero ) && diaNumero === parseInt( festivo.dia_numero ) ))

            if( !dia || dia.length === 0 ) return;

            data = [{
                Fecha: dateToString( fechaInicio ),
                Descripcion: dia[0].descripcion,
                Pais: dia[0].pais_nombre
            }];
        }else {
            for( let i = 0; i < diasEntreFechas; i++ ){
                let fecha = Object.assign( fechaInicio );

                if( i !== 0 ){
                    fecha.setDate(fecha.getDate() + 1);
                }
                
                const mesNumero = fecha.getMonth() + 1; //January is 1
                const diaNumero = fecha.getDate();
                const dia = diasFestivos.filter( ( festivo, index ) => ( mesNumero === parseInt( festivo.mes_numero ) && diaNumero === parseInt( festivo.dia_numero ) ))

                if( !dia || dia.length === 0 ) continue;

                data.push({
                    Fecha: dateToString( fecha ),
                    Descripcion: dia[0].descripcion,
                    Pais: dia[0].pais_nombre
                });
            }
        }

        exportToXlsx( data, "Dias Festivos - descargado desde Cockycode");
    }

    componentDidMount(){
        this._isMounted = true;
        this.setState({
            ...this.state,
            loading: true
        }, () => this.loadDiasFestivos() );
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
                                    <option value="EC">Ecuador</option>
                                    <option value="MX">México</option>
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
                    <Row>
                        <Col>
                            <Form.Group>
                                <Button variant="success" onClick={ this.handleExportClick }><FontAwesomeIcon icon={faFileExcel} /> Exportar excel</Button>
                            </Form.Group>
                        </Col>
                    </Row>                  
                </Form>
                <div>
                    <span className="leyenda-dias-festivos">Los días festivos mostrados abajo son generales, el botón de <strong>Exportar</strong> descarga en Excel los días con las fechas exactas que se encuentran entre <strong>Fecha inicio</strong> y <strong>Fecha fin</strong>.</span>
                    { this.state.loading ?
                    <Spinner animation="border" variant="warning" className="spinnerCustom"/>
                    : this.state.diasFestivos?
                    this.state.diasFestivos.map( (dia, key) => (
                        <Card key={key} className="mb-3">
                            <Card.Body><FontAwesomeIcon icon={faCalendar} />{" "}<strong>{dia.dia_numero + " de " + monthNameByNumber(dia.mes_numero) + ". " + dia.descripcion}</strong></Card.Body>
                        </Card>
                    ))
                    : null}
                </div>
                <div className="toast-styles">
                    <Toast onClose={() => this.setState({...this.state, showToast: false})} show={ this.state.showToast } delay={3000} autohide>
                        <Toast.Header>
                            <strong className="mr-auto">Mensaje</strong>
                        </Toast.Header>
                        <Toast.Body>{this.state.toastMessage}</Toast.Body>
                    </Toast>
                </div>
            </Fragment>
        );
    }
}
 
export default ExportarFestivos;