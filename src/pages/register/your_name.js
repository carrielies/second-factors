import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import { browserHistory } from 'react-router'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            this.validate(e, {
                firstnames: {msg: "Enter your first name", summary: "You need to enter your first name", regEx: /\w+/},
                lastname: {msg: "Enter your last name", summary: "You need to enter your last name", regEx: /\w+/}
            }, (props) => {
                this.props.dispatch( {type: 'FIRSTNAMES', data: props.firstnames})
                this.props.dispatch( {type: 'LASTNAME', data: props.lastname})
                browserHistory.push("/register/ga")
            })
        }

        render() {

            return (
                <Govuk phaseBanner="true">
                    {this.props.breadcrumb}

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

