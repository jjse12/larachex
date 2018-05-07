import ReactDom from 'react-dom';
import React from 'react';
import store, { browserHistory } from './store';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Router, Route, Redirect, Switch } from 'react-router-dom';

import NavBar from './components/header/nav-bar';
import Inventario from './components/inventario';

import { ReactTableDefaults } from "react-table";

Object.assign(ReactTableDefaults, {

});

let admin = document.head.querySelector('meta[name="permisos"]').getAttribute('content');
let nombre = document.head.querySelector('meta[name="nombre"]').getAttribute('content');

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
                <NavBar admin={admin === 1} user={nombre}/>
                {routes}
            </div>
        </Router>
    </Provider>,
    document.getElementById('react-chex')
);


