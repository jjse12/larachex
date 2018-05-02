import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getInventario} from "../reducers/inventario";
import {setSelected} from "../reducers/inventario-selected";
import {getInventarioFromStore, getInventarioSelectedFromStore} from "../reducers/getters";
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import {getInventarioColumns}from '../services/tables-column-getters';
import _ from 'material-ui/SwipeableDrawer';

const CheckboxTable = checkboxHOC(ReactTable);

@connect(
    store => ({
        inventario: getInventarioFromStore(store),
        selected: getInventarioSelectedFromStore(store),
        selectAll: false,
    }),
    {getInventario, setSelected}
)
export default class Inventario extends Component {


    static propTypes = {
        inventario: PropTypes.array.isRequired,
        selected: PropTypes.array,
        selectedAll: PropTypes.bool,

        getInventario: PropTypes.func.isRequired
    };


    componentDidMount() {
        this.props.getInventario();
        //this.props.getSelected();
    }

    toggleSelection = (tracking) => {
        const keyIndex = this.props.selected.indexOf(tracking);
        let sel = this.props.selected;
        if (keyIndex >= 0){
            sel.splice(keyIndex, 1);
            this.props.setSelected(sel);
        }
        else{
            sel.push(tracking);
            this.props.setSelected(sel);
        }
        //console.log(this.props.selected);
        this.forceUpdate();
    };

    toggleAll = () => {

    }

    isSelected = tracking => {
        return this.props.selected.includes(tracking);
    };


    render() {
        //console.log(this.state);

        if (this.props.inventario.length === 0)
            return null;

        const {toggleSelection, toggleAll, isSelected, selectAll} = this;

        const checkboxProps = {
            selectAll,
            isSelected,
            toggleSelection,
            toggleAll,
            selectType: "checkbox",

            getTrProps: (s, r) => {
                if (!r)
                    return {
                        style: {
                            backgroundColor: '',
                            color: '',
                        }};
                console.log('r: ' + r);
                const selected = this.isSelected(r.original._id);
                return {
                    style: {
                        backgroundColor: selected ? "skyblue" : '',
                        color: selected ? 'white' : '',
                    }
                };
            }
        };


        return (
            <div>
                <div className='col-10 offset-1'><br/>
                <CheckboxTable
                    data={this.props.inventario}
                    columns={getInventarioColumns(this)}
                    showPagination={false}
                    showPageSizeOptions={false}
                    filterable
                    defaultPageSize={this.props.inventario.length}
                    ref={r => (this.checkboxTable = r)}
                    className="-striped -highlight"
                    {...checkboxProps}
                    />
                </div>
                <div className='col-10 offset-1'><br/>
                    <h5>Hay {this.props.inventario.length} paquetes en el inventario</h5>
                </div>
            </div>
        );
    }
}