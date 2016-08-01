import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'
import {saveOrgSession} from '../../reducers/helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            this.validate(e, {
                name: {msg: "Enter their full name", summary: "You need to enter their full name", regEx: /\w+/},
                email: {msg: "Enter your their email", summary: "You need to enter their email", regEx: /\w+/},
            }, (props) => {
                saveOrgSession(this.props.dispatch, {name: props.name, gg_id: this.cred_id()} );
                browserHistory.push("/org/create_account_summary")
            })
        }

        render() {
            let session = this.props.session.org;


            return (
                <Govuk phaseBanner="true">
                    <Breadcrumb text={`Register for ${session.org_name}`}/>

                    <Question title="What's their details ?" para="Enter all your names in full" errors={this.state.errors}>
                        <Field ref="name" name="name" errors={this.state.errors} labelText="Name"/>
                        <Field ref="email" name="email" errors={this.state.errors} labelText="Email"/>

                        <h1 className="heading-small">Account type</h1>
                        <fieldset className="inline">
                            <label className="block-label">
                                <input id="yes" type="radio" name="radio-group" value="admin" ref="admin"/>Administrator
                            </label>
                            <label className="block-label">
                                <input id="no" type="radio" name="radio-group" value="assistant" ref="assistant"/>Assistant
                            </label>
                        </fieldset>

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
