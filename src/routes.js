import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import SignIn from './pages/sign_in'
import GoogleAuthenticator from './pages/google_authenticator'
import RegisterGoogleAuthenticator from './pages/register_google_authenticator'
import RegisterDevice from './pages/register_device'
import YourName from './pages/register/your_name'

export default function(props) {
    
    const history = syncHistoryWithStore(browserHistory, props.store);
    
    return (
        <Router history={history}>
            <Route path="/signin" component={SignIn}/>
            <Route path="/ga" component={GoogleAuthenticator}/>
            <Route path="/register/ga" component={RegisterGoogleAuthenticator}/>
            <Route path="/register/device" component={RegisterDevice}/>
            <Route path="/register/your_name" component={YourName}/>
        </Router>
        
    )
}
