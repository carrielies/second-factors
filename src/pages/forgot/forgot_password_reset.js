import React from 'react'
import {Breadcrumb, Govuk, Field, Question, Server } from '../../components/all'
import QuestionPage from '../../utils/question_page'
import { browserHistory, Link } from 'react-router'
import {updateAccount} from '../../utils/database'
import {saveGG3Session} from '../../reducers/helpers'

import {connect} from 'react-redux'
export default connect((state) => state) (

    class extends QuestionPage {

        constructor(props) {
            super(props);
            this.state = {errors: {}};
        }


        onNext(e) {
            this.validate(e,{
                password: {msg: "Enter your password", summary: "You need to enter a password", regEx: /\w+/},
                password2: {msg: "Enter your password", summary: "You need to enter a password", regEx: /\w+/}
            }, (props) => {
                let session = this.props.session.gg3;
                let account = session.account;
                account.factors.password.secret = props.password
                updateAccount(account).then(() => {
                    browserHistory.push("/signin");
                }
                );

            })
        }

        render() {

            let errors = this.state.errors;

            let session = this.props.session.gg3;
            let account = session.account;
            let request = session.request;

            return (

                <Govuk phaseBanner="false">

                    <Breadcrumb text={`Reset password on Government Gateway account`}/>
                    <Question title="Reset your password" errors={this.state.errors}>

                        <ul className="list tick" >
                            <li className={this.state.chars_8 ? "li-tick" : ""}>It must contain at least 8 characters</li>
                            <li className={this.state.lowercase_uppercase ? "li-tick" : ""} >A lowercase letter and an uppercase letter</li>
                            <li className={this.state.special_char ? "li-tick" : ""} >At least one number and one special character</li>
                        </ul>
                        <Field ref="password" name="password" errors={this.state.errors} labelText="Password" type="password"/>
                        <Field ref="password2" name="password2" errors={this.state.errors} labelText="Confirm Password" type="password"/>
                        <br/>
                        <a href="#next" className="button" onClick={(e) => this.onNext(e)}>Reset password</a>
                        <br/>
                        <br/>

                    </Question>
                </Govuk>
            )
        }
    }
)