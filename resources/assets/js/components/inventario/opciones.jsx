import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import bootbox from 'bootbox';

import { getInventarioSelectedFromStore } from '../../reducers/getters';

import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import Divider from 'material-ui/Divider';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';

const styles = theme => ({
    footer: {
        position: 'fixed',
        bottom: 0,
    },
    panel_header: {
        background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    },
    footer_title: {
        fontSize: '24px',
        color: 'white',
        textAlign: "center",
        marginLeft: '10%',
        width: '100%'
    },
    boton:{
        color: 'white',
        textAlign: 'center',
        align: 'center',
        height: '40%',
        marginTop: '2.5%',
        marginBottom: '2.5%',
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    notif_icon:{
        marginTop: '5%',
        height: '90%',
        width: '50%',
        cursor: 'pointer'
    },
});

@connect(
    store => ({
        selected: getInventarioSelectedFromStore(store)
    }),
    {}
)
@withStyles(styles)
export default class FooterOpciones extends Component {

    static propTypes = {
        selected: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        visible: PropTypes.bool.isRequired,
    };

    constructor(){
        super();
        this.state={
            open: false
        };
    }

    componentDidMount() {

    }

    panelStateChange = (event, open) => {
        this.setState({open: open});
    }

    handleWhatsappClicked = () => {
        let cliente = this.props.selected[Object.keys(this.props.selected)[0]].cliente_id;
        let arr = Object.values(this.props.selected).map(val => val.cliente_id.toUpperCase() === cliente.toUpperCase());
        let mismoCliente= !arr.includes(false);

        if (mismoCliente){
            axios.get('/api/cliente/'+cliente+'/celular')
                .then(function (response) {
                    console.log(response);
                    alert(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    handleEmailClicked= () => {
        let cliente = this.props.selected[Object.keys(this.props.selected)[0]].cliente_id;
        let arr = Object.values(this.props.selected).map(val => val.cliente_id.toUpperCase() === cliente.toUpperCase());
        let mismoCliente= !arr.includes(false);

        if (mismoCliente){
            axios.get('/api/cliente/'+cliente+'/email')
                .then(function (response) {
                    console.log(response);
                    alert(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    handelEntregaClicked = () => {
        let cliente = this.props.selected[Object.keys(this.props.selected)[0]].cliente_id;
        let arr = Object.values(this.props.selected).map(val => val.cliente_id.toUpperCase() === cliente.toUpperCase());
        let mismoCliente= !arr.includes(false);

        if (mismoCliente){
            axios.get('/api/cliente/'+cliente+'/tarifa')
                .then(function (response) {
                    console.log(response);
                    alert(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    render() {
        if (!this.props.visible){
            return null;
        }
        const titulo = this.state.open ? "Esconder Opciones" : "Ver Opciones";

        return (
            <footer className={`${this.props.classes.footer} col-4 offset-4`} >
                <ExpansionPanel expanded={this.state.open} onChange={this.panelStateChange}>
                    <ExpansionPanelSummary className={this.props.classes.panel_header} expandIcon={<ExpandLessIcon />}>
                        <label className={this.props.classes.footer_title}>{titulo}</label>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-6'>
                                        <h5>Notificar</h5>
                                        <Divider/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <img onClick={this.handleWhatsappClicked} className={`${this.props.classes.notif_icon} `} src="/img/whatsapp-icons/whatsapp128px.png" />
                                    <img onClick={this.handleEmailClicked} className={`${this.props.classes.notif_icon} `} src="/img/email-icons/email128px.png" />
                                </div>
                                <div className='col-6'>
                                    <button onClick={this.handelEntregaClicked} className={`${this.props.classes.boton} col-12 btn btn-success`}>Entregar Mercaderia</button>
                                    <button className={`${this.props.classes.boton} col-12 btn btn-primary`}>Plan de Entrega</button>
                                </div>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </footer>

        );
    }
}