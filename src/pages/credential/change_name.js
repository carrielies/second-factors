import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import React from 'react'
import { browserHistory } from 'react-router'

import {connect} from 'react-redux'
import {saveRegistrationSession} from '../../reducers/helpers'
import {updateAccount, saveInteraction} from '../../utils/database'

export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            this.validate(e, {
                name: {msg: "Enter your new name", summary: "You need to enter your new name", regEx: /\w+/},
            }, (props) => {
                let session = this.props.session.credential;
                let account = session.account;
                account.name = props.name;
                updateAccount(account).then( () => {
                    return saveInteraction(account.gg_id, "credential_management", "change name")
                }).then( () => {
                    browserHistory.push("/credential/manage_account");
                });
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

                    <Question title="What's your new name?" errors={this.state.errors}>
                        <Field ref="name" name="name" errors={this.state.errors} labelText="" />
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

