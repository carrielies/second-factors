import { createStore, combineReducers, applyMiddleware } from 'redux'
import accountReducer from './reducers/account_reducer'
import serverReducer from './reducers/server_reducer'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

export default createStore(
    combineReducers({
        account: accountReducer,
        server: serverReducer,
        routing: routerReducer
    }),
    applyMiddleware(routerMiddleware(browserHistory))
);