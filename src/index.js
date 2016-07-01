import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import Routes from './routes'
import './stylesheets/gov.scss'


// const store = createStore(
//     combineReducers({
//         account: accountReducer,
//         routing: routerReducer
//     }),
//     applyMiddleware(routerMiddleware(browserHistory))
// );


function AppRoutes() {
    return(
        <Provider store={store}>
            <Routes store={store}/>
        </Provider>
    )
}


ReactDOM.render(<AppRoutes />, document.getElementsByTagName('body')[0]);
