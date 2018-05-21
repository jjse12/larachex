import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";


import {notificarEmail, notificarWhatsapp, notificarAmbos} from "./tooltips";

import {getInventario} from "../../reducers/inventario";
import {setInventarioSelected} from "../../reducers/inventario-selected";
import {getInventarioFromStore, getInventarioSelectedFromStore} from "../../reducers/getters";
import {getInventarioColumns}from './columnas';
import _ from "lodash";

const CheckboxTable = checkboxHOC(ReactTable);

const styles = theme => ({
    contentDiv:{
        marginBottom: '-50%',
        overflowY: 'hidden !important',
    },
    table: {
        height: (screen.height * 0.777778)+'px',
        //top: 0,
        //bottom: '400px',
    },
    total: {
        backgroundColor: '#dfeedf',
        display: 'inline-block',
        padding: '10px',
    },
    footer_filtrando: {
        backgroundColor: '#dfeedf',
        width: '100%',
    },
    footer_filtrando_label: {
        color: 'black',
        width:'100%',
        textAlign: 'center',
        marginTop: '10px',
    },
    btn_plan_esperando: {
        background: 'linear-gradient(22.5deg, orange 10%, white 50%, orange 90%)',
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    btn_plan_guatex: {
        background: 'linear-gradient(22.5deg, green 10%, white 50%, green 90%)',
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    btn_plan_ruta: {
        background: 'linear-gradient(22.5deg, green 10%, white 50%, green 90%)',
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    td_plan_btn: {
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    td_plan_btn_1notif: {
        width: '55%',
        marginLeft: '10%',
    },
    td_plan_btn_2notif: {
        width: '40%',
        marginLeft: '10%',
    },
    td_plan_notificon_1notif: {
        width: '20%',
        marginLeft: '5%',
    },
    td_plan_notificon_2notif: {
        width: '18%',
        marginLeft: '2%',
    },
});

@connect(
    store => ({
        inventario: getInventarioFromStore(store),
        selected: getInventarioSelectedFromStore(store),
    }),
    {getInventario, setInventarioSelected}
)
@withStyles(styles)
export default class TablaInventario extends Component {

    static propTypes = {
        inventario: PropTypes.any.isRequired,
        selected: PropTypes.object.isRequired,

        optionsVisibilityHandler: PropTypes.func.isRequired,

        getInventario: PropTypes.func.isRequired,
        setInventarioSelected: PropTypes.func.isRequired
    };

    constructor(){
        super();
        this.state = {
            selectAll: false
        }
    }

    componentDidMount() {
        this.props.getInventario();
    }

    toggleSelection = (tracking, bool, row) => {

        if (tracking in this.props.selected){
            delete this.props.selected[tracking];
        }
        else{
            this.props.selected[tracking] = row;
            //this.props.setInventarioSelected(selected);
        }

        if (Object.keys(this.props.selected).length === 0)
            this.props.optionsVisibilityHandler(false);
        else
            this.props.optionsVisibilityHandler(true);

        console.log(this.props.selected);

        this.forceUpdate();
    };

    toggleAll = () => {
        const all = !this.state.selectAll;
        if (all){
            Object.values(this.tabla.getWrappedInstance().getResolvedState().sortedData)
                .map(v => {if (!(v.tracking in this.props.selected)) this.props.selected[v.tracking] = v._original;});
        }
        else{

            Object.values(this.tabla.getWrappedInstance().getResolvedState().sortedData)
                .map(v => {if (v.tracking in this.props.selected) delete this.props.selected[v.tracking];});
        }

        //console.log(this.props.selected);

        if (Object.keys(this.props.selected).length === 0)
            this.props.optionsVisibilityHandler(false);
        else
            this.props.optionsVisibilityHandler(true);

        this.setState({selectAll: all});
    }

    isSelected = tracking => {
        return tracking in this.props.selected;
    };

    handleNotifEmailClicked = row => {
        alert(row);
    }

    handleNotifWhatsappClicked = row => {
        alert(row);
    }

    handlePlanClicked = (row) => {

        console.log(row);
    }

    getFooterNombre= () => {
        if (typeof this.tabla === 'undefined')
            return this.props.inventario.length;
        return this.tabla.getWrappedInstance().getResolvedState().sortedData.length;
    }

    getFooterPeso = () => {
        if (typeof this.tabla === 'undefined')
            return _.sum(_.map(this.props.inventario, d => d['peso']));
        return _.sum(_.map(this.tabla.getWrappedInstance().getResolvedState().sortedData, d => d['peso']))
    }

    handleFiltering = () => {
        //this.tabla.getWrappedInstance().getResolvedState().columns[5].Footer.props.children[2] = 723;
        //this.tabla.getWrappedInstance().getResolvedState().
        console.log(this.tabla.getWrappedInstance().getResolvedState().filtered.length);
        this.setState({selectAll: false});
    }

    render() {

        if (this.props.inventario.length === 0)
            return null;

        const { classes } = this.props;
        const { selectAll } = this.state;
        const {toggleSelection, isSelected, toggleAll} = this;
        const cantInventario = this.props.inventario.length;

        const checkboxProps = {
            selectType: "checkbox",
            isSelected,
            selectAll,
            toggleAll,
            toggleSelection,
            getTrProps: (s, r) => {
                if (typeof r === 'undefined') {
                    return {
                        style: {
                            backgroundColor: '',
                            color: '',
                        }
                    };
                }
                let selected = this.isSelected(r.original.tracking);
                return {
                    style: {
                        background: selected ? 'linear-gradient(45deg, #FE6B8B 5%, #FF8E53 90%)' : '',
                        //backgroundColor: selected ? "#FE6B8B" : '',
                        color: selected ? 'white' : '',
                    }
                };
            },
            getTheadTrProps: () => {
                return { style: { backgroundColor: '#eeffee',} };
            },
        };

        console.log('Rendering');

        return (
            <div className={` ${classes.contentDiv} col-10 offset-1`}>
                <h5 className={`${classes.total} `} >Hay {cantInventario} paquetes en el inventario || Peso total: {_.sum(_.map(this.props.inventario, d => d['peso']))} libras</h5>
                <CheckboxTable
                    className={`${classes.table} -striped -highlight`}
                    ref={r => (this.tabla = r)}
                    data={this.props.inventario}
                    columns={getInventarioColumns(this)}
                    onFilteredChange={this.handleFiltering}
                    keyField='tracking'
                    showPagination={false}
                    showPageSizeOptions={false}
                    minRows={0}
                    noDataText={'No se encontró ningún paquete'}
                    pageSize={cantInventario}
                    {...checkboxProps}
                />
            </div>
        );
    }
}