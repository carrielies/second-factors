import React from 'react'
import {Breadcrumb, Govuk, Field, Question, Server } from '../../components/all'
import QuestionPage from '../../utils/question_page'
import { browserHistory, Link } from 'react-router'
import {findAccountByEmailAndPassword} from '../../utils/database'
import {saveGG3Session} from '../../reducers/store_helpers'

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
                if ( session.service_name === request.name ) {
                    saveGG3Session( this.props.dispatch, {level: "1"});
                    browserHistory.push("/your_auth_factors");
                }
                else {
                    browserHistory.push("/sso");
                }
            }

        }

        onNext(e) {
            this.validate(e,{
                email: {msg: "Enter your email", summary: "You need to enter your username", regEx: /\w+/},
                password: {msg: "Enter your password", summary: "You need to enter your password", regEx: /\w+/}
            }, (props) => {

                findAccountByEmailAndPassword(props.email, props.password).then( (account)=> {
                    if ( !account) {
                        let errors = {};
                        errors["email"] = {msg: "Invalid email/password", summary: "You need to enter a valid username and password", regEx: /\w+/}
                        this.setState( {errors});
                    }
                    else {
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
                                <a href="#" onClick={(e) => this.next(e)}>Recover your user password online or by post</a>
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