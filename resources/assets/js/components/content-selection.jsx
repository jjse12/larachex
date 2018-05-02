import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';

import ClientesIcon from 'material-ui-icons/People';
import NuevaCargaIcon from 'material-ui-icons/AddToQueue';
import HomeIcon from 'material-ui-icons/Home';

import PaqueteIcon from 'material-ui-icons/CardGiftcard';
import DashboardIcon from 'material-ui-icons/Dashboard';
import AccessTime from 'material-ui-icons/AccessTime';
import CheckIcon from 'material-ui-icons/PlaylistAddCheck';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';

import ListSubheader from 'material-ui/List/ListSubheader';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Menu, { MenuItem, MenuList } from 'material-ui/Menu';

import {push} from "react-router-redux";
import {getNavbarSelectedFromStore} from "../reducers/getters";
import {setNavbarSelected} from "../reducers/contenido";

const styles = theme => ({
    menuItem: {
        '&:focus': {
            background: 'linear-gradient(45deg, red 30%, #FF8E53 90%)',
            color: 'white'
        },
        selected: {
            background: 'linear-gradient(45deg, red 30%, #FF8E53 90%)',
            color: 'white'
        },
        disabled: {
            background: 'linear-gradient(45deg, red 30%, #FF8E53 90%)',
            color: 'white'
        },
    },
    contenido: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        //background: 'darkblue',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
    },
});


const options = [
    'Clientes',
    'Ingresar nueva carga',
    'Inventario',
    'Todos los paquetes',
    'Todas las cargas',
    'Boletas pendientes',
    'Boletas confirmadas'
];


const iconos = [
    <ClientesIcon/>,
    <NuevaCargaIcon/>,
    <HomeIcon/>,
    <PaqueteIcon/>,
    <DashboardIcon/>,
    <AccessTime/>,
    <CheckIcon/>
]

@connect(
    store => ({
        selected: getNavbarSelectedFromStore(store)
    }),
    { setNavbarSelected, push}
)
@withStyles(styles)
export default class NavBarContentSelector extends Component {

    constructor(){
        super();
        this.state = {anchorEl: null, open: false};
    }

    static propTypes = {
        selected: PropTypes.number.isRequired,
        admin: PropTypes.bool.isRequired,

        push: PropTypes.func.isRequired,
        setNavbarSelected: PropTypes.func.isRequired,
    };

    componentDidMount() {
        switch (location.pathname.split('/app/')[1]){
            case 'clientes':
                this.props.setNavbarSelected(0);
                break;
            case 'ingresar-nueva-carga':
                this.props.setNavbarSelected(1);
                break;
            case 'inventario':
                this.props.setNavbarSelected(2);
                break;
            case 'historico/paquetes':
                this.props.setNavbarSelected(3);
                break;
            case 'historico/cargas':
                this.props.setNavbarSelected(4);
                break;
            case 'historico/entregas-sin-confirmar':
                this.props.setNavbarSelected(5);
                break;
            case 'historico/entregas-confirmadas':
                this.props.setNavbarSelected(3);
            break;


        }
    }

    pushLocation = (index) => {
        //console.log(this.props.selected);
        switch (index){
            case 0:
                this.props.push('/app/clientes');
                break;
            case 1:
                this.props.push('/app/ingresar-nueva-carga');
                break;
            case 2:
                this.props.push('/app/inventario');
                break;
            case 3:
                this.props.push('/app/historico/paquetes');
                break;
            case 4:
                this.props.push('/app/historico/cargas');
                break;
            case 5:
                this.props.push('/app/historico/entregas-sin-confirmar');
                break;
            case 6:
                this.props.push('/app/historico/entregas-confirmadas');
                break;
        }
    }

    getSelectedString = () => {
        switch (this.props.selected){
            case 0:
                return 'Clientes';
            case 1:
                return 'Ingreso de Carga';
            case 2:
                return 'Inventario';
            case 3:
                return 'Histórico de Paquetes';
            case 4:
                return 'Histórico de Cargas';
            case 5:
                return 'Boletas Pendientes';
            case 6:
                return 'Boletas Confirmadas';
        }
    }

    listItemClicked = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

    menuItemClicked = (index) => {
        this.props.setNavbarSelected(index);
        this.pushLocation(index);
        this.setState({ anchorEl: null });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    handleHistoricoClick = () =>{
        this.setState({open: !this.state.open})
    }

    render() {
        const selectedString = this.getSelectedString();
        const { classes } = this.props;
        const { anchorEl } = this.state;

        //console.log(this.props.selected);

        return (
            <div className='col-4'>
                <h1 className={`${classes.contenido} text-white seleccionado`} onClick={this.listItemClicked}>{selectedString}</h1>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {options.map((option, index) => (
                        (index < 3) ?
                                <MenuItem
                                    className={classes.menuItem}
                                    key={index}
                                    disabled={index === this.props.selected}
                                    selected={index === this.props.selected}
                                    onClick={foo => this.menuItemClicked(index)}
                                >
                                    {iconos[index]}<div className='offset-1'> {option} </div>
                                        <Divider/>
                                </MenuItem>
                            : (index < 5 ) ?
                            <MenuItem
                                className={classes.menuItem}
                                key={index}
                                disabled={index === this.props.selected}
                                selected={index === this.props.selected}
                                onClick={foo => this.menuItemClicked(index)}
                            >
                                {iconos[index]}<div className='offset-1'> {option} </div> {(this.props.admin ? <Divider/> : null)}
                            </MenuItem> :
                            (this.props.admin) ?
                            <MenuItem
                                className={classes.menuItem}
                                key={index}
                                disabled={index === this.props.selected}
                                selected={index === this.props.selected}
                                onClick={foo => this.menuItemClicked(index)}
                            >
                                {iconos[index]}<div className='offset-1'> {option} </div>
                            </MenuItem> : null
                    ))}
                </Menu>
            </div>
        );
    }
}