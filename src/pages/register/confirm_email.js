import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import React from 'react'
import { browserHistory } from 'react-router'

import {connect} from 'react-redux'
import {saveRegistrationSession} from '../../reducers/store_helpers'

export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            this.validate(e, {
                code: {msg: "Enter your email code", summary: "You need to enter your email code", regEx: /\w+/},
            }, (props) => {
                saveRegistrationSession(this.props.dispatch, {email_code: props.code} );
                browserHistory.push("/register/your_password")
            })
        }

        render() {

            let para = `We've sent an email to ${this.props.account.email} with a special code. `

            return (
                <Govuk>
                    <Breadcrumb text={`Register for ${this.props.service.request.name}`}/>
                    {this.props.breadcrumb}

                    <Question title="Confirm email code?" errors={this.state.errors} para={para}>
                        <Field ref="code" name="code" errors={this.state.errors} labelText="What's the code?" />
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

