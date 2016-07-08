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
import Sso from './pages/sign_in/sso'
import ServiceRedirect from './pages/sign_in/service_redirect'
import HelpDeskIndex from './pages/helpdesk/index'
import HelpDeskLandingPage from './pages/helpdesk/landing_page'
import HelpDeskSearch from './pages/helpdesk/search'
import HelpDeskSearchResults from './pages/helpdesk/search_results.js'
import HelpDeskProveIdentity from './pages/helpdesk/prove_identity'
import HelpDeskProveGoogleAuthenticator from './pages/helpdesk/prove_google_authenticator'
import HelpDeskManageAccount from './pages/helpdesk/manage_account'
import HelpDeskResetPassword from './pages/helpdesk/reset_password'
import HelpDeskManageGoogleAuthenticator from './pages/helpdesk/manage_google_authenticator'
import Summary from './pages/register/summary'
import Home from './pages/home'
import Demo from './pages/demo'
import CheckDevice from './pages/sign_in/check_device'
import LandingPage from './pages/service/landing_page'
import ServiceHome from './pages/service/index'

export default function(props) {
    
    const history = syncHistoryWithStore(browserHistory, props.store);
        

    return (
        <Router history={history}>
            <Route path="/signin" component={SignIn}/>
            <Route path="/ga" component={GoogleAuthenticator}/>
            <Route path="/your_auth_factors" component={YourAuthFactors}/>
            <Route path="/service_redirect" component={ServiceRedirect}/>
            <Route path="/sso" component={Sso}/>
            <Route path="/logged_in" component={LoggedIn}/>
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
            <Route path="/service/landing_page" component={LandingPage}/>
            <Route path="/service/index" component={ServiceHome}/>
            <Route path="/service" component={ServiceHome}/>
            <Route path="/helpdesk" component={HelpDeskIndex}/>
            <Route path="/helpdesk/index" component={HelpDeskIndex}/>
            <Route path="/helpdesk/landing_page" component={HelpDeskLandingPage}/>
            <Route path="/helpdesk/search" component={HelpDeskSearch}/>
            <Route path="/helpdesk/search_results" component={HelpDeskSearchResults}/>
            <Route path="/helpdesk/prove_identity" component={HelpDeskProveIdentity}/>
            <Route path="/helpdesk/prove_google_authenticator" component={HelpDeskProveGoogleAuthenticator}/>
            <Route path="/helpdesk/manage_account" component={HelpDeskManageAccount}/>
            <Route path="/helpdesk/manage_google_authenticator" component={HelpDeskManageGoogleAuthenticator}/>
            <Route path="/helpdesk/reset_password" component={HelpDeskResetPassword}/>
            <Route path="/check_device" component={CheckDevice}/>
            <Route path="/" component={Home}/>
            <Route path="/demo" component={Demo}/>
        </Router>
        
    )
}
