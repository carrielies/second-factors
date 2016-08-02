import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'
import {saveRegistrationSession} from '../../reducers/helpers'

import {connect} from 'react-redux'
import {saveOrgSession} from '../../reducers/helpers'
import {findAccount, updateAccount, saveAccountInteraction} from '../../utils/database'

export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            this.validate(e, {
                org_name: {msg: "Enter your organisation name", summary: "You need to enter your organisation name", regEx: /\w+/},
            }, (props) => {

                let session = this.props.session.credential;
                let account = session.account;
                account.org_name = props.org_name;
                account.is_org = true;
                account.type = "admin";
                updateAccount( account ).then( () => {
                    browserHistory.push("/credential/manage_account")
                })
            })
        }

        render() {
            let session = this.props.session.credential;
            let request = this.props.session.gg3.request;
            let account = session.account;

            return (
                <Govuk phaseBanner="true">
                    <Breadcrumb text={`${account.name}`}/>

                    <Question title="What's your organisation name?" errors={this.state.errors}>
                        <Field ref="org_name" name="org_name" errors={this.state.errors} labelText="Organisation name"/>
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

