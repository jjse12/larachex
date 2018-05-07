import React from 'react';
import _ from "lodash";

export const getInventarioColumns = inst => {
    return [
        {
            filterable: true,
            filterMethod: (filter, row) => (
                filter.value.trim() === '' ? true :
                filter.value.split(" ").map(i => (
                    i === '' ? false :
                    row.carga_fecha.includes(i)
                )).includes(true) || filter.value.split(" ").map(i => (
                    i === '' ? false :
                    '#'+row._original.carga_id === (i)
                )).includes(true)
            ),
            sortMethod: (a, b) => {
                let aArr = a.split('/'), bArr = b.split('/');
                return (new Date(bArr[2], bArr[1] - 1, bArr[0])).getTime() -
                    (new Date(aArr[2], aArr[1] - 1, aArr[0])).getTime() < 0 ? -1 : 1;
            },
            width: 150,
            Header: 'Fecha de Ingreso',
            accessor: 'carga_fecha',
            Cell: row => (
                <div className="seleccionado" title={'Registro de Carga #'+row.original.carga_id}>{row.original.carga_fecha}</div>
            )
        },
        {
            Header: 'Tracking',
            accessor: 'tracking',
            Cell: row => (
                <div className='seleccionado'>{row.value}</div>
            ),
            width: 275,
            filterable: true,
            filterMethod: (filter, row) => (
                filter.value.trim() === '' ? true :
                    filter.value.split(" ").map(i => (
                        i === '' ? false :
                            row.tracking.toLowerCase().includes(i.toLowerCase())
                    )).includes(true)
            ),
        },
        {
            Header: 'ID Cliente',
            accessor: 'cliente_id',
            Cell: row => (
                <div className='seleccionado'>{row.value}</div>
            ),
            width: 100,
            sortable: true,
            filterable: true,
            filterMethod: (filter, row) => (
                filter.value.trim() === '' ? true :
                    filter.value.split(" ").map(i => (
                        i === '' ? false :
                            row.cliente_id.toLowerCase().includes(i.toLowerCase())
                    )).includes(true)
            ),
        },
        {
            Header: 'Nombre Cliente',
            accessor: 'cliente_nombre',
            Cell: row => (
                <div className='seleccionado'>{row.value}</div>
            ),
            filterable: true,
            filterMethod: (filter, row) => (
                filter.value.trim() === '' ? true :
                    !filter.value.split(" ").map(i => (
                        i === '' ? true :
                            row.cliente_nombre.toLowerCase().includes(i.toLowerCase())
                    )).includes(false)
            ),
        },
        {
            Header: 'Peso',
            accessor: 'peso',
            Cell: row => (
                <div className='seleccionado'>{row.value}</div>
            ),
            Footer: (
                <span>
                <strong>Total:</strong><br/>
                    {_.sum(_.map(inst.props.inventario, d => d['peso']))} libras
                </span>
            ),
            sortable: true,
            width: 80,
            resizable: false,
            filterable: true,
            filterMethod: (filter, row) => (
                filter.value.trim() === '' ? true :
                    !filter.value.split(" ").map(i => (
                        i === '' ? true:
                            i.includes('>') ? row.peso > Number(i.split('>')[1]) :
                                i.includes('<') ? row.peso < Number(i.split('<')[1]) :
                            row.peso === Number(i)
                    )).includes(false)
            ),
        },
        {
            Header: 'Plan de Entrega',
            accessor: 'plan',
            Cell: row => (
                <div className='seleccionado'>{row.value}</div>
            ),
            resizable: false,
            width: 175,
            filterable: true,
            filterMethod: (filter, row) => (
                filter.value.trim() === '' ? true :
                    filter.value.split(" ").map(i => (
                        i === '' ? false :
                            row.plan.toLowerCase().includes(i.toLowerCase())
                    )).includes(true)
            ),
        },
        {
            Header: null,
            sortable: false,
            resizable: false,
            width: 70,
            Cell: row => (
                <img className='icon-update' src='/img/edit.png'/>
            )
        }
        ];
}
