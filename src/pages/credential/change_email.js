import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import React from 'react'
import { browserHistory } from 'react-router'

import {connect} from 'react-redux'
import {updateAccount, saveInteraction} from '../../utils/database'
import {saveCredentialSession} from '../../reducers/helpers'

export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            this.validate(e, {
                email: {msg: "Enter your new email", summary: "You need to enter your new email", regEx: /\w+/},
            }, (props) => {
                let session = this.props.session.credential;
                saveCredentialSession(this.props.dispatch, {new_email: props.email, new_email_code: "1234"});
                browserHistory.push("/credential/change_email_code");
            })
        }

        render() {

            let session = this.props.session.credential;
            let request = this.props.session.gg3.request;
            let account = session.account;

            return (
                <Govuk>
                    <Breadcrumb text={`${account.name}`} back="/credential/manage_account"/>
                    {this.props.breadcrumb}

                    <Question title="What's your new email?" errors={this.state.errors}>
                        <Field ref="email" name="email" errors={this.state.errors} labelText="" />
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

