import React from 'react'
import {Breadcrumb, Govuk, Field, Question, Server } from '../../components/all'
import QuestionPage from '../../utils/question_page'
import { browserHistory, Link } from 'react-router'
import {findAccountByEmail} from '../../utils/database'
import {saveGG3Session} from '../../reducers/helpers'
import {saveResetPasswordSession} from '../../reducers/helpers'
import fecha from 'fecha'

import {connect} from 'react-redux'
export default connect((state) => state) (

    class extends QuestionPage {
        onClick(e) {
            e.preventDefault();

            let gg3 = this.props.session.gg3;
            let account = gg3.account;

            //save the original request so that we can recover it later
            let originalRequest = gg3.request;
            saveResetPasswordSession(this.props.dispatch, {originalRequest});

            this.login_user(account, originalRequest)

            if (this.has_factors(account)) {
                let request = {
                    name: originalRequest.name,
                    auth_level_required: "1",
                    auth_level_desired: "2",
                    redirect_url: "/forgot/password_reset"
                };
                saveGG3Session(this.props.dispatch, {request});
                browserHistory.push("/service_redirect");
            } else {
                browserHistory.push("/forgot/password_reset")
            }
        }

        login_user(account, originalRequest) {
            //I don't like this code being here.
            //This should be common code with the login code
            let time = fecha.format(new Date(), 'DD/MM/YY HH:mm:ss');
            let response = {
                level: "1",
                trust_id: account.trust_id,
                name: account.name,
                email: account.email,
                gg_id: account.gg_id,
                last_logged_in: time
            };
            saveGG3Session(this.props.dispatch, {response, signed_in: true, service_name: originalRequest.name});
        }

        has_factors(account) {
            let factors = account.factors;
            return (factors && (factors.google_authenticator || factors.device_fingerprint || factors.u2f_key || factors.cryptophoto))
        }

        render() {

            let errors = this.state.errors;

            let session = this.props.session.gg3;
            let account = session.account;

            let resetEmail = null
            if ( account ) {
                resetEmail =
                    <div className="email">
                         <div className="banner"></div>
                         <p>
                             Hello {account.name},<br/><br/>

                             A request has been received to reset your password.  If you follow the link below you will be able to reset your password.
                             <br/><br/>
                             <a href="#" onClick={(e) => this.onClick(e)}>https://gg3.gov.uk/resetpassword?ref=876876868787</a>
                             <br/>
                             <br/>
                             The password reset request is valid for the next 24 hours.

                         </p>
                    </div>
            }

            return (

                <Govuk phaseBanner="true">

                    <Breadcrumb text={`Recover password from Government Gateway account`}/>
                    <h1 className="heading-medium">Reset password</h1>
                    <p>If the email you entered is associated with an account in our records, you will receive an email from us with instructions for resetting your password.</p>

                    <p>If you don`t receive this email, please check your junk mail folder or visit our Help pages to contact Customer Service for futher assistance.</p>
                    <br/>
                    <Link to="/" className="button">Finish</Link>
                    <br/>
                    {resetEmail}
                </Govuk>

            )
        }
    }
)