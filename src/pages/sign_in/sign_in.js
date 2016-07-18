import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Fingerprint from '../../components/fingerprint'
import Server from '../../components/server'
import { browserHistory, Link } from 'react-router'
import Breadcrumb from '../../components/breadcrumb'


import {connect} from 'react-redux'
export default connect((state) => state) (

    class extends QuestionPage {

        constructor(props) {
            super(props);
            this.state = {errors: {}};

        }
        
        componentDidMount() {
            let cookie = this.props.cookie;

            if( cookie.email ) {
                // already logged in

                let server = new Server(this.props.server);
                let service = this.props.service.request
                let account = server.findByEmail(cookie.email);

                if ( cookie.service_name === service.name ) {
                    this.props.dispatch({type: 'SAVE_ACCOUNT', data: {...account, signed_in: true, two_fa_passed: false}});
                    browserHistory.push("/your_auth_factors");
                }
                else {
                    this.props.dispatch({type: 'SAVE_ACCOUNT', data: {...account, signed_in: true}});
                    browserHistory.push("/sso");
                }
            }

        }

        onNext(e) {
            this.validate(e,{
                email: {msg: "Enter your email", summary: "You need to enter your username", regEx: /\w+/},
                password: {msg: "Enter your password", summary: "You need to enter your password", regEx: /\w+/}
            }, (props) => {

                let server = new Server(this.props.server);
                let account = server.findByEmailAndPassword(props.email, props.password);
                if ( !account ) {
                    let errors = {};
                    errors["email"] = {msg: "Invalid email/password", summary: "You need to enter a valid username and password", regEx: /\w+/}
                    this.setState( {errors});

                    e.preventDefault();
                    return;
                }

                this.props.dispatch({type: 'SAVE_ACCOUNT', data: {...account, signed_in: true, two_fa_passed: false}});
                browserHistory.push("/your_auth_factors");
            })
        }

        render() {

            let errors = this.state.errors;
            console.dir(this.props.server);

            return (

                <Govuk phaseBanner="true">

                    <Breadcrumb text={`Sign in to ${this.props.service.request.name} using your Government Gateway account`}/>
                    <Fingerprint/>
                    <Question title={`Sign in to ${this.props.service.request.name}`} button="Sign in" errors={errors}>
                        <Field ref="email" name="email" labelText="Email" errors={errors} value={this.props.account.email}/>
                        <Field ref="password" name="password"  labelText="Password" errors={errors} value={this.props.account.factors.password.secret} type="password"/>
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