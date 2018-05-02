import ReactDom from 'react-dom';
import React from 'react';
import store, { browserHistory } from './store';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Router, Route, Redirect, Switch } from 'react-router-dom';

import {ACTION_TYPE_STRING as ACTION_TYPE_CONTENIDO} from './reducers/contenido';
import {ACTION_TYPE_STRING as ACTION_TYPE_INVENTARIO_SELECTED} from './reducers/inventario-selected';


import NavBar from './components/nav-bar';
import Inventario from './components/inventario';


import { ReactTableDefaults } from "react-table";

Object.assign(ReactTableDefaults, {

});

var admin = document.head.querySelector('meta[name="permisos"]').getAttribute('content');
var nombre = document.head.querySelector('meta[name="nombre"]').getAttribute('content');

store.dispatch({
    type: ACTION_TYPE_INVENTARIO_SELECTED,
    inventarioSelected: []
});

const routes = (
    <Switch>
        <Redirect from={"/"} to={"/app/inventario"} exact />
        <Redirect from={"/app"} to={"/app/inventario"} exact />
        <Route exact path="/app/inventario" component={Inventario}/>
    </Switch>
);

ReactDom.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <div>
                <NavBar admin={admin == 1} user={nombre}/>
                {routes}
            </div>
        </Router>
    </Provider>,
    document.getElementById('react-chex')
);


