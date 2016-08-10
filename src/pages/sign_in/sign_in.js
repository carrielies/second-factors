import React from 'react'
import {Breadcrumb, Govuk, Field, Question, Server } from '../../components/all'
import QuestionPage from '../../utils/question_page'
import { browserHistory, Link } from 'react-router'
import {findAccountByEmailAndPassword, saveInteraction, findAccount} from '../../utils/database'
import {saveGG3Session} from '../../reducers/helpers'

import {connect} from 'react-redux'
export default connect((state) => state) (

    class extends QuestionPage {

        constructor(props) {
            super(props);
            this.state = {errors: {}};
        }
        
        componentDidMount() {

            let session = this.props.session.gg3;
            let request = session.request;
            if( session.signed_in  ) {
                findAccount(session.account.gg_id).then( (account) => {
                    saveGG3Session(this.props.dispatch, {account});

                    if ( session.service_name === request.name ) {
                        saveGG3Session( this.props.dispatch, {level: "1"});
                        browserHistory.push("/your_auth_factors");
                    }
                    else {
                        browserHistory.push("/sso");
                    }
                })
            }
        }

        onNext(e) {
            this.validate(e,{
                email: {msg: "Enter your email", summary: "You need to enter your username", regEx: /\w+/},
                password: {msg: "Enter your password", summary: "You need to enter your password", regEx: /\w+/}
            }, (props) => {

                findAccountByEmailAndPassword(props.email, props.password).then( (account)=> {
                    let status = account ? account.status : 'Failed'
                    let errors = {};
                    switch(status) {
                        case 'Failed' :
                            errors["email"] = {msg: "Invalid email/password", summary: "You need to enter a valid username and password", regEx: /\w+/}
                            this.setState( {errors});
                            break;
                        case 'Deleted' :
                            saveInteraction( account.gg_id, "sign-in", `Attempted Login with Deleted Account` );
                            errors["email"] = {msg: "Invalid email/password", summary: "You need to enter a valid username and password", regEx: /\w+/}
                            this.setState( {errors});
                            break;
                        case 'Suspended' :
                            saveInteraction( account.gg_id, "sign-in", `Login with Suspended Account` );
                            errors["email"] = {msg: "Account Suspended", summary: "Your account has been suspended", regEx: /\w+/}
                            this.setState( {errors});
                            break;
                        case 'Flagged' :
                            saveInteraction( account.gg_id, "sign-in", `Login with Flagged Account` );
                            saveGG3Session(this.props.dispatch, {account: account, level: "1"});
                            browserHistory.push("/your_auth_factors");
                            break;
                        default :
                            saveGG3Session(this.props.dispatch, {account: account, level: "1"});
                            browserHistory.push("/your_auth_factors");
                    }
                });
            })
        }

        render() {

            let errors = this.state.errors;

            let session = this.props.session.gg3;
            let request = session.request;

            let help_url_link = "https://www.gov.uk/help"
            let help_url_text = "Help using GOV.UK"
            if (request) {
                if (request.help && request.help.url_link && request.help.url_text) {
                    help_url_link = request.help.url_link
                    help_url_text = request.help.url_text
                }
            }
            return (

                <Govuk phaseBanner="true">

                    <Breadcrumb text={`Sign in to ${request.name} using your Government Gateway account`}/>
                    <Question title={`Sign in to ${request.name}`} button="Sign in" errors={errors}>
                        <Field ref="email" name="email" labelText="Email" errors={errors} value={session.email}/>
                        <Field ref="password" name="password"  labelText="Password" errors={errors} value={session.password} type="password"/>
                    </Question>

                    <a href="#" className="button" onClick={(e) => this.onNext(e)}>Continue</a>

                    <div className="grid-row">
                        <div className="column-two-thirds">
                            <h1 className="heading-medium">Problems signing into the Government Gateway?</h1>
                        </div>
                    </div>

                    <details>
                        <summary><span className="summary">Forgotten your password?</span></summary>
                        <div className="panel panel-border-narrow">
                            <p>
                                <Link to="/forgot/password">Recover your password</Link>
                            </p>
                        </div>
                    </details>

                    <details>
                        <summary><span className="summary">Forgotten your email?</span></summary>
                        <div className="panel panel-border-narrow">
                            <p>
                                Help desk will be able to recover your email for you<br/>
                                <Link to={help_url_link}>{help_url_text}</Link>
                            </p>
                        </div>
                    </details>
                    <details>
                        <summary><span className="summary">Create a new account?</span></summary>
                        <div className="panel panel-border-narrow">
                            <p>
                                <Link to="/register">Register a new account</Link>
                            </p>
                        </div>
                    </details>

                </Govuk>
            )
        }
    }
)