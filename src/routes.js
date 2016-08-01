import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import SignIn from './pages/sign_in/sign_in'
import ForgotPassword from './pages/forgot/forgot_password'
import ForgotPasswordConfirm from './pages/forgot/forgot_password_confirm'
import ForgotPasswordReset from './pages/forgot/forgot_password_reset'
import CryptoPhoto from './pages/sign_in/cryptophoto'
import GoogleAuthenticator from './pages/sign_in/google_authenticator'
import U2F from './pages/sign_in/u2f'
import SetupGa from './pages/register/setup_ga'
import SetupCryptoPhoto from './pages/register/setup_cryptophoto'
import SetupDevice from './pages/register/setup_device'
import SetupU2F from './pages/register/u2f'
import YourName from './pages/register/your_name'
import YourEmail from './pages/register/your_email'
import ConfirmEmail from './pages/register/confirm_email'
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
import HelpDeskExternalSelectAccount from './pages/helpdesk/external_select_account.js'
import HelpDeskProveIdentity from './pages/helpdesk/prove_identity'
import HelpDeskProveGoogleAuthenticator from './pages/helpdesk/prove_google_authenticator'
import HelpDeskManageAccount from './pages/helpdesk/manage_account'
import HelpDeskResetPassword from './pages/helpdesk/reset_password'
import HelpDeskRemoveFactor from './pages/helpdesk/remove_factor'
import Summary from './pages/register/summary'
import Home from './pages/home'
import CheckDevice from './pages/sign_in/check_device'
import LandingPage from './pages/service/landing_page'
import AsteroidGovLandingPage from './pages/service/asteroid_gov_landing_page'
import ServiceHome from './pages/service/index'
import ServiceEnrol from './pages/service/enrol'
import WeDontTrustYou from './pages/service/we_dont_trust_you'
import ServiceMyDetails from './pages/service/my_details'
import ServiceCleaningGrant from './pages/service/apply_for_cleaning_grant'
import ServiceStationGrant from './pages/service/apply_for_station_grant'
import ServiceGrantConfirmed from './pages/service/grant_confirmed'
import ServiceFeedback from './pages/service/feedback'
import ServiceHelp from './pages/service/help'
import ServiceContact from './pages/service/contact'
import CredentialHome from './pages/credential/index'
import CredentialManageAccount from './pages/credential/manage_account'
import CredentialLandingPage from './pages/credential/landing_page'
import CredentialChangeName from './pages/credential/change_name'
import CredentialChangeEmail from './pages/credential/change_email'
import CredentialChangeEmailCode from './pages/credential/change_email_code'
import CredentialRemoveFactor from './pages/credential/remove_factor'
import CredentialYourAuthFactors from './pages/credential/your_auth_factors'
import CredentialSetupGa from './pages/credential/setup_ga'
import CredentialSetupDevice from './pages/credential/setup_device'
import CredentialSetupCryptophoto from './pages/credential/setup_cryptophoto'
import CredentialChangePassword from './pages/credential/change_password'
import CredentialConvertToOrg from './pages/credential/convert_to_org'
import CredentialU2f from './pages/credential/u2f'

import SpacegovTrustStoreHome from './pages/spacegov_trust_store/index'
import SpacegovTrustStoreLandingPage from './pages/spacegov_trust_store/landing_page'
import SpacegovTrustStoreSearch from './pages/spacegov_trust_store/search'
import SpacegovTrustStoreSearchResults from './pages/spacegov_trust_store/search_results'


import OrgManageOrg from './pages/org/manage_org'
import OrgManageAccount from './pages/org/manage_account'
import OrgRemoveFactor from './pages/org/remove_factor'



export default function(props) {
    
    const history = syncHistoryWithStore(browserHistory, props.store);
        

    return (
        <Router history={history}>


            <Route path="/signin" component={SignIn}/>
            <Route path="/forgot/password" component={ForgotPassword}/>
            <Route path="/forgot/password_email_confirm" component={ForgotPasswordConfirm}/>
            <Route path="/forgot/password_reset" component={ForgotPasswordReset}/>
            <Route path="/cryptophoto" component={CryptoPhoto}/>
            <Route path="/ga" component={GoogleAuthenticator}/>
            <Route path="/u2f" component={U2F}/>
            <Route path="/your_auth_factors" component={YourAuthFactors}/>
            <Route path="/service_redirect" component={ServiceRedirect}/>
            <Route path="/sso" component={Sso}/>
            <Route path="/logged_in" component={LoggedIn}/>
            <Route path="/register/ga" component={SetupGa}/>
            <Route path="/register/u2f" component={SetupU2F}/>
            <Route path="/register/cryptophoto" component={SetupCryptoPhoto}/>
            <Route path="/register/device" component={SetupDevice}/>
            <Route path="/register" component={YourName}/>
            <Route path="/register/your_name" component={YourName}/>
            <Route path="/register/your_email" component={YourEmail}/>
            <Route path="/register/confirm_email" component={ConfirmEmail}/>
            <Route path="/register/your_password" component={YourPassword}/>
            <Route path="/register/your_auth_factors" component={RegisterYourAuthFactors}/>
            <Route path="/register/summary" component={Summary}/>
            <Route path="/service/landing_page" component={LandingPage}/>
            <Route path="/service/we_dont_trust_you" component={WeDontTrustYou}/>
            <Route path="/service/enrol" component={ServiceEnrol}/>
            <Route path="/service/asteroid_gov_landing_page" component={AsteroidGovLandingPage}/>
            <Route path="/service/index" component={ServiceHome}/>
            <Route path="/service/my_details" component={ServiceMyDetails}/>
            <Route path="/service/apply_for_cleaning_grant" component={ServiceCleaningGrant}/>
            <Route path="/service/apply_for_station_grant" component={ServiceStationGrant}/>
            <Route path="/service/grant_confirmed" component={ServiceGrantConfirmed}/>
            <Route path="/service/feedback" component={ServiceFeedback}/>
            <Route path="/service/help" component={ServiceHelp}/>
            <Route path="/service/contact" component={ServiceContact}/>

            <Route path="/spacegov/trust_store" component={SpacegovTrustStoreHome}/>
            <Route path="/spacegov/trust_store/landing_page" component={SpacegovTrustStoreLandingPage}/>
            <Route path="/spacegov/trust_store/search" component={SpacegovTrustStoreSearch}/>
            <Route path="/spacegov/trust_store/search_results" component={SpacegovTrustStoreSearchResults}/>

            <Route path="/service" component={ServiceHome}/>
            <Route path="/helpdesk" component={HelpDeskIndex}/>
            <Route path="/helpdesk/index" component={HelpDeskIndex}/>
            <Route path="/helpdesk/landing_page" component={HelpDeskLandingPage}/>
            <Route path="/helpdesk/search" component={HelpDeskSearch}/>
            <Route path="/helpdesk/search_results" component={HelpDeskSearchResults}/>
            <Route path="/helpdesk/prove_identity" component={HelpDeskProveIdentity}/>
            <Route path="/helpdesk/prove_google_authenticator" component={HelpDeskProveGoogleAuthenticator}/>
            <Route path="/helpdesk/manage_account" component={HelpDeskManageAccount}/>
            <Route path="/helpdesk/remove_factor" component={HelpDeskRemoveFactor}/>
            <Route path="/helpdesk/reset_password" component={HelpDeskResetPassword}/>
            <Route path="/helpdesk/external_select_account" component={HelpDeskExternalSelectAccount}/>


            <Route path="/check_device" component={CheckDevice}/>
            <Route path="/" component={Home}/>
            <Route path="/credential" component={CredentialHome}/>
            <Route path="/credential/landing_page" component={CredentialLandingPage}/>
            <Route path="/credential/manage_account" component={CredentialManageAccount}/>
            <Route path="/credential/change_name" component={CredentialChangeName}/>
            <Route path="/credential/change_email" component={CredentialChangeEmail}/>
            <Route path="/credential/change_email_code" component={CredentialChangeEmailCode}/>
            <Route path="/credential/remove_factor" component={CredentialRemoveFactor}/>
            <Route path="/credential/ga" component={CredentialSetupGa}/>
            <Route path="/credential/your_auth_factors" component={CredentialYourAuthFactors}/>
            <Route path="/credential/u2f" component={CredentialU2f}/>
            <Route path="/credential/device" component={CredentialSetupDevice}/>
            <Route path="/credential/cryptophoto" component={CredentialSetupCryptophoto}/>
            <Route path="/credential/change_password" component={CredentialChangePassword}/>
            <Route path="/credential/convert_to_org" component={CredentialConvertToOrg}/>

            <Route path="/org/manage_org" component={OrgManageOrg}/>
            <Route path="/org/manage_account" component={OrgManageAccount}/>
            <Route path="/org/remove_factor" component={OrgRemoveFactor}/>


        </Router>
        
    )
}
