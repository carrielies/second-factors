import { createStore, combineReducers, applyMiddleware } from 'redux'
import accountReducer from './reducers/account_reducer'
import serverReducer from './reducers/server_reducer'
import serviceReducer from './reducers/service_reducer'
import cookieReducer from './reducers/cookie_reducer'
import helpdeskReducer from './reducers/helpdesk_reducer'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

export default createStore(
    combineReducers({
        account: accountReducer,
        server: serverReducer,
        service: serviceReducer,
        cookie: cookieReducer,
        helpdesk: helpdeskReducer,
        routing: routerReducer
    }),
    applyMiddleware(routerMiddleware(browserHistory))
);