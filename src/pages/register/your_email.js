import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'
import {saveRegistrationSession} from '../../reducers/helpers'
import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            this.validate(e, {
                email: {msg: "Enter your email addess", summary: "You need to enter your email address", regEx: /\w+/},
            }, (props) => {
                saveRegistrationSession(this.props.dispatch, {email: props.email} );
                // this.props.dispatch( {type: 'SAVE_ACCOUNT', data: {email: props.email}});
                browserHistory.push("/register/confirm_email")
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
                        <Field ref="email" name="email" errors={this.state.errors} labelText="Confirm email"/>
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

