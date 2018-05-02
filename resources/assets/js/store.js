import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer';

import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
const browserHistory = createHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const routerMiddlewareImpl = routerMiddleware(browserHistory);

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(routerMiddlewareImpl, thunk)
));
export { browserHistory };


export default store;
