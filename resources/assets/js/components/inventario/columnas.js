import React from 'react';
import _ from "lodash";
import { StatefulToolTip } from 'react-portal-tooltip';
import {notificarAmbos, notificarEmail, notificarWhatsapp} from "./tooltips";
import {anchoFecha, anchoId, anchoPeso, anchoPlan, anchoTracking, anchoModificar} from "./constantes";


export const getInventarioColumns = (inst) => {
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
            width: anchoFecha,
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
            width: anchoTracking,
            sortable: false,
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
            width: anchoId,
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
            Footer: () => {
                if (!inst.tabla || inst.tabla.getWrappedInstance().getResolvedState().filtered.length === 0)
                    return null;

                return <div className={inst.props.classes.footer_filtrando}>
                    <label className={inst.props.classes.footer_filtrando_label}>Total: {inst.getFooterNombre()} paquetes - {inst.getFooterPeso()} libras</label>
                </div>;
            },
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
            sortable: true,
            width: anchoPeso,
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
            resizable: false,
            width: anchoPlan,
            filterable: true,
            filterMethod: (filter, row) => (
                filter.value.trim() === '' ? true :
                    filter.value.split(" ").map(i => (
                        i === '' ? false :
                            row.plan.toLowerCase().includes(i.toLowerCase())
                    )).includes(true)
            ),
            sortMethod: (a, b) => {
                //if (a )
                if (a === "") return -1;
                if (b === "") return 1;
                let aArr = a.split('/'), bArr = b.split('/');
                return (new Date(bArr[2], bArr[1] - 1, bArr[0])).getTime() -
                (new Date(aArr[2], aArr[1] - 1, aArr[0])).getTime() < 0 ? -1 : 1;
            },
            Cell: row => (getPlanCell(inst, row))
        },
        {
            Header: null,
            sortable: false,
            resizable: false,
            width: anchoModificar,
            Cell: row => (
                <img className='icon-update' src='/img/edit.png'/>
            )
        }
        ];
};

function getPlanCell(inst, row){
    let title = 'Asignar un plan de entrega al paquete',
        texto = 'Asignar',
        className = 'plan btn btn-sm';
    let onClick = () => inst.handlePlanClicked(row.original);
    let onWhatsappClick = () => inst.handleNotifWhatsappClicked(row.original);
    let onEmailClick = () => inst.handleNotifEmailClicked(row.original);

    let boton, tooltip = null, iconos = null, style = {};
    switch (row.value){
        case "":
            className += ` btn-danger ${inst.props.classes.td_plan_btn} `;
            tooltip = notificarAmbos(onWhatsappClick, onEmailClick);
            break;
        case "whats":
            className += ` btn-danger ${inst.props.classes.td_plan_btn_1notif}`;
            tooltip = notificarEmail(onEmailClick);
            iconos = <img title='Cliente notificado vía whatsapp'
                          className={`${inst.props.classes.td_plan_notificon_1notif}`}
                          src='/img/whatsapp-icons/whatsapp128px.png'/>;
            break;
        case 'email':
            className += ` btn-danger ${inst.props.classes.td_plan_btn_1notif}`;
            tooltip = notificarWhatsapp(onWhatsappClick);
            iconos = <img title='Cliente notificado vía email'
                          className={`${inst.props.classes.td_plan_notificon_1notif}`}
                          src='/img/email-icons/email128px.png'/>;
            break;
        case 'whatsmail':
            className += ` btn-danger ${inst.props.classes.td_plan_btn_2notif} `;
            boton = <button
                title={title}
                onClick={onClick}
                className={className}
            >{texto}
            </button>;

            return <div >
                {boton}
                <img title={'Cliente notificado vía whatsapp'} className={`${inst.props.classes.td_plan_notificon_2notif}`} src='/img/whatsapp-icons/whatsapp128px.png'/>
                <img title={'Cliente notificado vía email'} className={`${inst.props.classes.td_plan_notificon_2notif}`} src='/img/email-icons/email128px.png'/>
            </div>;
        case 'Oficina':
            className = `${inst.props.classes.td_plan_btn} plan btn btn-sm btn-success`;
            title = 'El cliente pasará a recoger el paquete';
            texto = 'Oficina';
            break;
        default:
            if (row.value.includes("/")){
                if (row.value.includes("Guatex")){
                    className += ` ${inst.props.classes.td_plan_btn} `;
                    title = 'El paquete se entregará en la fecha indicada vía Guatex';
                    texto = 'Guatex';
                    style={ backgroundColor: '#f3cb38', color: 'white' };
                    tooltip = row.value.split(":")[1];
                    break;
                }
                else{
                    className += ` btn-info ${inst.props.classes.td_plan_btn} `;
                    title = 'El paquete se entregará en la fecha indicada';
                    texto = 'En Ruta';
                    tooltip = row.value;
                    break;
                }
            }
            else if (Number(row.value) < 1){
                className += ` btn-dark ${inst.props.classes.td_plan_btn} `;
                title = 'Notificarle vía whatsapp/email';
                texto = 'Avisar al cliente';
                tooltip = notificarAmbos(onWhatsappClick, onEmailClick);
                break;
            }
            else {
                className += ` ${inst.props.classes.td_plan_btn} `;
                title = 'El cliente está esperando más paquetes';
                texto = 'Esperando';
                style={backgroundColor: '#FF8605', color: 'white'};
                tooltip = row.value;
                break;
            }
    }

    if (tooltip !== null){

        boton = <button
            title={title}
            onClick={onClick}
            className={className}
            style={style}
        >{texto}
        </button>;

        if (iconos === null){

            return <StatefulToolTip
                position='left' arrow='center'
                parent={boton}>
                {tooltip}
            </StatefulToolTip>;
        }

        return <div>
            <StatefulToolTip
                position='left' arrow='center'
                parent={boton}>
                {tooltip}
            </StatefulToolTip>
            {iconos}
        </div>;
    }

    return <button title={title} onClick={onClick} className={className}>{texto}</button>;
}


