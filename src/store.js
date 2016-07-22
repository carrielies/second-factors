import { createStore, combineReducers, applyMiddleware } from 'redux'
import sessionReducer from './reducers/session_reducer'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

export default createStore(
    combineReducers({
        session: sessionReducer,
        routing: routerReducer
    }),
    applyMiddleware(routerMiddleware(browserHistory))
);