import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'
import {saveOrgSession} from '../../reducers/helpers'

import {findAccount, updateAccount, saveAccountInteraction} from '../../utils/database'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            this.validate(e, {
                old_password: {msg: "Enter your old password", summary: "You need to your old password", regEx: /\w+/},
                password1: {msg: "Enter your password", summary: "You need to enter a password", regEx: /\w+/},
                password2: {msg: "Enter your password", summary: "You need to enter a password", regEx: /\w+/},
            }, (props) => {

                let session = this.props.session.credential;
                let account = session.account;
                let gg3 = this.props.session.gg3;
                let resp = gg3.response;
                if (this.has_factors(account) && resp.level != 2) {
                    account.trust_id = this.trust_id();
                    account.trust_id_level_2 = this.trust_id();
                }
                account.factors.password = {
                    secret: props.password1
                };

                updateAccount(account).then( () => {
                    browserHistory.push("/credential/manage_account")
                });
            })
        }

        render() {
            let session = this.props.session.credential;
            let account = session.account;
            let request = this.props.session.gg3.request;

            return (

                <Govuk>
                    <Breadcrumb text={`${account.name}`}/>

                    <Question title="Change your password" errors={this.state.errors}>

                        <ul className="list tick" >
                            <li className={this.state.chars_8 ? "li-tick" : ""}>It must contain at least 8 characters</li>
                            <li className={this.state.lowercase_uppercase ? "li-tick" : ""} >A lowercase letter and an uppercase letter</li>
                            <li className={this.state.special_char ? "li-tick" : ""} >At least one number and one special character</li>
                        </ul>

                        <Field ref="old_password" name="old_password" errors={this.state.errors} labelText="Old password" type="password"/>
                        <Field ref="password1" name="password1" errors={this.state.errors} labelText="New password" type="password"/>
                        <Field ref="password2" name="password2" errors={this.state.errors} labelText="Confirm new password" type="password"/>
                        <br/>
                        <a href="#next" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                        <br/>
                        <br/>

                    </Question>
                </Govuk>
            )
        }

    }
)

