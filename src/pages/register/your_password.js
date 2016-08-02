import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'
import {saveRegistrationSession} from '../../reducers/helpers'
import {connect} from 'react-redux'
import {updateAccount, findAccount} from '../../utils/database'


export default connect((state) => state) (

    class extends QuestionPage {

        componentDidMount() {
            let session = this.props.session.registration;

            findAccount(session.gg_id).then( (account) => {
                saveRegistrationSession(this.props.dispatch, {account})
            });
        }

        onNext(e) {
            this.validate(e, {
                password: {msg: "Enter your password", summary: "You need to enter a password", regEx: /\w+/},
                password2: {msg: "Enter your password", summary: "You need to enter a password", regEx: /\w+/},
            }, (props) => {

                let session = this.props.session.registration;
                let account = session.account;
                account.factors.password.secret = props.password;

                updateAccount( account ).then( () => {
                    browserHistory.push("/register/your_auth_factors")
                });
            })
        }

        render() {
            let session = this.props.session.registration;
            let request = this.props.session.gg3.request;

            return (

                <Govuk>
                    <Breadcrumb text={`Register for ${request.name}`}/>

                    <Question title="Set your password" errors={this.state.errors}>

                        <ul className="list tick" >
                            <li className={this.state.chars_8 ? "li-tick" : ""}>It must contain at least 8 characters</li>
                            <li className={this.state.lowercase_uppercase ? "li-tick" : ""} >A lowercase letter and an uppercase letter</li>
                            <li className={this.state.special_char ? "li-tick" : ""} >At least one number and one special character</li>
                        </ul>

                        <Field ref="password" name="password" errors={this.state.errors} labelText="Password" type="password"/>
                        <Field ref="password2" name="password2" errors={this.state.errors} labelText="Confirm Password" type="password"/>
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

