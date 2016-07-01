import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import SignIn from './pages/sign_in'

export default function(props) {
    
    const history = syncHistoryWithStore(browserHistory, props.store);
    
    return (
        <Router history={history}>
            <Route path="/signin" component={SignIn}/>
        </Router>
        
    )
}
