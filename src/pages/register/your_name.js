import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            this.validate(e, {
                firstnames: {msg: "Enter your first name", summary: "You need to enter your first name", regEx: /\w+/},
                lastname: {msg: "Enter your last name", summary: "You need to enter your last name", regEx: /\w+/}
            }, (props) => {
                this.props.dispatch( {type: 'SAVE_ACCOUNT', data: {firstnames: props.firstnames, lastname: props.lastname}})
                browserHistory.push("/register/your_email")
            })
        }

        render() {
            return (
                <Govuk phaseBanner="true">
                    <Breadcrumb text={`Register for ${this.props.service.request.name}`}/>

                    <Question title="What's your name ?" para="Enter all your names in full" errors={this.state.errors}>
                        <Field ref="firstnames" name="firstnames" errors={this.state.errors} labelText="First names"/>
                        <Field ref="lastname" name="lastname" errors={this.state.errors} labelText="Last name"/>
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

