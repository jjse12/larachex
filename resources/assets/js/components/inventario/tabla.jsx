import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import PropTypes from 'prop-types';

import {getInventario} from "../../reducers/inventario";
import {setInventarioSelected} from "../../reducers/inventario-selected";
import {getInventarioFromStore, getInventarioSelectedFromStore} from "../../reducers/getters";
import {getInventarioColumns}from '../../services/tables-column-getters';

const CheckboxTable = checkboxHOC(ReactTable);

@connect(
    store => ({
        inventario: getInventarioFromStore(store),
        selected: getInventarioSelectedFromStore(store),
    }),
    {getInventario, setInventarioSelected}
)
export default class TablaInventario extends Component {

    static propTypes = {
        inventario: PropTypes.any.isRequired,
        selected: PropTypes.object.isRequired,

        optionsVisibilityHandler: PropTypes.func.isRequired,

        getInventario: PropTypes.func.isRequired,
        setInventarioSelected: PropTypes.func.isRequired
    };


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

        this.forceUpdate();
    };

    isSelected = tracking => {
        return tracking in this.props.selected;
    };

    render() {

        if (this.props.inventario.length === 0)
            return null;

        const {toggleSelection, isSelected} = this;

        const checkboxProps = {
            selectType: "checkbox",
            isSelected,
            toggleSelection,
            getTrProps: (s, r) => {
                if (!r)
                    return {
                        style: {
                            backgroundColor: '',
                            color: '',
                        }};
                //console.log('r: ' + r);
                const selected = this.isSelected(r.original._id);
                return {
                    style: {
                        backgroundColor: selected ? "skyblue" : '',
                        color: selected ? 'white' : '',
                    }
                };
            }
        };

        /*
        const size = [];
        if (typeof this.table !== 'undefined')
            size[0] = this.table.getResolvedState().sortedData.length;

        else size[0] = this.props.inventario.length;
            alert(size[0]);
        */
        return (
            <div>
                <div className='col-10 offset-1'><br/>
                    <CheckboxTable
                        ref={r => (this.table = r)}
                        data={this.props.inventario}
                        columns={getInventarioColumns(this)}
                        keyField='tracking'
                        showPagination={false}
                        showPageSizeOptions={false}
                        minRows={0}
                        defaultPageSize={this.props.inventario.length}
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