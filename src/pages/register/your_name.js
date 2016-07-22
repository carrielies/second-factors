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
                name: {msg: "Enter your full name", summary: "You need to enter your full name", regEx: /\w+/},
            }, (props) => {
                saveRegistrationSession(this.props.dispatch, {name: props.name} );
                // this.props.dispatch( {type: 'SAVE_ACCOUNT', data: {name: props.name, trust_id: this.guid(), signed_in: true, cred_id: this.cred_id(), interactions: [] }})
                browserHistory.push("/register/your_email")
            })
        }

        render() {
            return (
                <Govuk phaseBanner="true">
                    <Breadcrumb text={`Register for ${this.props.service.request.name}`}/>

                    <Question title="What's your name ?" para="Enter all your names in full" errors={this.state.errors}>
                        <Field ref="name" name="name" errors={this.state.errors} labelText="Name"/>
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

