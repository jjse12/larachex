import React, {Component} from 'react';
import PropTypes from 'prop-types';

import NavBarContentSelector from './content-selection';

import bootbox from 'bootbox';
import bootstrap from 'bootstrap';

export default class NavBar extends Component {

    static propTypes = {
        user: PropTypes.string,
        admin: PropTypes.bool.isRequired
    };

    showConfirmLogout = () => {
        this.props.showConfirm(ID_LOGOUT);
    };

    logoutAlert = () => {
        bootbox.confirm({
            size: 'small',
            title: 'Salir del Sistema',
            message: 'Se cerrará la sesión...',
            buttons: {
                cancel: {
                    label: 'Regresar',
                    className: 'btn btn-md btn-info alinear-izquierda'
                },
                confirm: {
                    label: 'Continuar',
                    className: 'btn btn-md btn-danger alinear-derecha'
                }
            },
            callback: function (res) {
                if (res)
                    document.getElementById('logout-form').submit();
            }
        });
    }

    render(){

        return (
            <div>
                <div className='align-self-center color-orange '>
                    <header className='blog-header py-3 '>
                        <div className='row flex-nowrap justify-content-between align-items-center'>
                            <div className='col-4'>
                                <NavBarContentSelector admin={this.props.admin}/>
                            </div>
                            {/*<h3 className='col-3 text-white color-darkblue seleccionado' onClick={this.pushInentario}>Inventario</h3>*/}

                            <div className='col-4 text-center'>
                                <h1 className='text-white'>Chispudito Express</h1>
                            </div>
                            <div className='col-4 d-flex align-items-center'>
                                <h4 className='col-6 offset-2 text-white align-items-center' >{this.props.user}</h4>
                                <button className='col-4 nav-link btn-sm btn-danger' onClick={this.logoutAlert}>Cerrar Sesión</button>
                            </div>
                        </div>
                    </header>
                </div>

            </div>
        );
    }
}