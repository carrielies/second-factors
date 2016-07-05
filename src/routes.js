import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import SignIn from './pages/sign_in/sign_in'
import GoogleAuthenticator from './pages/sign_in/google_authenticator'
import SetupGa from './pages/register/setup_ga'
import SetupDevice from './pages/register/setup_device'
import YourName from './pages/register/your_name'
import YourEmail from './pages/register/your_email'
import ConfirmEmail from './pages/register/confirm_email'
import YourSecret from './pages/register/your_secret_questions'
import YourPassword from './pages/register/your_password'
import RegisterYourAuthFactors from './pages/register/your_auth_factors'
import YourAuthFactors from './pages/sign_in/your_auth_factors'
import LoggedIn from './pages/sign_in/logged_in'
import Summary from './pages/register/summary'
import Demo from './pages/demo'
import CheckDevice from './pages/sign_in/check_device'

export default function(props) {
    
    const history = syncHistoryWithStore(browserHistory, props.store);
    
    return (
        <Router history={history}>
            <Route path="/signin" component={SignIn}/>
            <Route path="/ga" component={GoogleAuthenticator}/>
            <Route path="/your_auth_factors" component={YourAuthFactors}/>
            <Route path="/register/ga" component={SetupGa}/>
            <Route path="/register/device" component={SetupDevice}/>
            <Route path="/register" component={YourName}/>
            <Route path="/register/your_name" component={YourName}/>
            <Route path="/register/your_email" component={YourEmail}/>
            <Route path="/register/your_secret" component={YourSecret}/>
            <Route path="/register/confirm_email" component={ConfirmEmail}/>
            <Route path="/register/your_password" component={YourPassword}/>
            <Route path="/register/your_auth_factors" component={RegisterYourAuthFactors}/>
            <Route path="/register/summary" component={Summary}/>
            <Route path="/logged_in" component={LoggedIn}/>
            <Route path="/check_device" component={CheckDevice}/>
            <Route path="/demo" component={Demo}/>
        </Router>
        
    )
}
