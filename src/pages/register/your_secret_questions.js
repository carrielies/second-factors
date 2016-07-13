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
            this.validate(e,{
                dob: {msg: "dob", summary: "You need to enter your date of birth", regEx: /\w+/},
                mothers_maiden_name: {msg: "mothers_maiden_name", summary: "You need to enter your mothers maiden name", regEx: /\w+/},
                first_pet: {msg: "first_pet", summary: "You need to enter your first pet", regEx: /\w+/}
            }, (props) => {
                e.preventDefault();
                this.props.dispatch( {type: 'SAVE_ACCOUNT', data: {dob: props.dob, mothers_maiden_name: props.mothers_maiden_name, first_pet: props.first_pet }})
                browserHistory.push("/register/your_auth_factors")
            })
        }

        render() {

            return (
                <Govuk phaseBanner="true">
                    <Breadcrumb text={`Register for ${this.props.service.request.name}`}/>

                    <Question title="Security Questions ?" para="These are only used to verify your identity if you phone our help desk." errors={this.state.errors}>
                        <Field ref="dob" name="dob" errors={this.state.errors} labelText="Date of birth" labelHint="dd/mm/yy"/>
                        <Field ref="mothers_maiden_name" name="mothers_maiden_name" errors={this.state.errors} labelText="Mothers maiden name"/>
                        <Field ref="first_pet" name="first_pet" errors={this.state.errors} labelText="Name of first pet"/>
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

