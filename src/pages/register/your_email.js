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
                email: {msg: "Enter your email addess", summary: "You need to enter your email address", regEx: /\w+/},
            }, (props) => {

                let session = this.props.session.registration;
                let account = session.account;
                account.email = props.email;

                updateAccount( account ).then( () => {
                    browserHistory.push("/register/confirm_email")
                });
            })
        }

        render() {

            let session = this.props.session.registration;
            let request = this.props.session.gg3.request;

            return (
                <Govuk phaseBanner="true">
                    <Breadcrumb text={`Register for ${request.name}`}/>

                    <Question title="What is your email address?" errors={this.state.errors} para="Your email address will be needed whenever you sign in">
                        <Field ref="email" name="email" errors={this.state.errors} labelText="Email" />
                        <Field ref="confirm_email" name="confirm_email" errors={this.state.errors} labelText="Confirm email"/>
                    </Question>
                    <br/>
                    <a href="#next" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    <br/>
                    <br/>

                </Govuk>
            )
        }
    }
)

