import React from 'react';
import _ from "lodash";

export const getInventarioColumns = inst => {
    return [
        {
            Header: 'Fecha de Ingreso',
            Cell: row => (
                <div className="seleccionado" title={'Registro de Carga #'+row.original.carga_id}>{row.original.carga_fecha}</div>
            )
        },
        {
            Header: 'Tracking',
            accessor: 'tracking',
            Cell: row => (
            <div className='seleccionado'>{row.value}</div>
            )
        },
        {
            Header: 'ID Cliente',
            accessor: 'cliente_id',
            Cell: row => (
                <div className='seleccionado'>{row.value}</div>
            ),
            sortable: true
        },
        {
            Header: 'Nombre Cliente',
            accessor: 'cliente_nombre',
            Cell: row => (
                <div className='seleccionado'>{row.value}</div>
            )
        },
        {
            Header: 'Peso',
            accessor: 'peso',
            Cell: row => (
                <div className='seleccionado'>{row.value}</div>
            ),
            Footer: (
                <span>
                <strong>Total:</strong>{" "}
                    {_.sum(_.map(inst.props.inventario, d => d['peso']))}
                </span>
            )
        },
        {
            Header: 'Plan de Entrega',
            accessor: 'plan',
            Cell: row => (
                <div className='seleccionado'>{row.value}</div>
            )
        },
        {
            Header: ''
        }
        ];
}
