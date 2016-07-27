import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import React from 'react'
import { browserHistory } from 'react-router'

import {connect} from 'react-redux'
import {updateAccount, saveInteraction} from '../../utils/database'

export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            this.validate(e, {
                code: {msg: "Enter the code we've emailed to your new address ", summary: "You need to enter your new email", regEx: /\w+/},
            }, (props) => {
                let session = this.props.session.credential;
                let account = session.account;
                account.email = session.new_email;
                updateAccount(account).then( () => {
                    return saveInteraction(account.gg_id, "credential_management", "change email")
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

                    <Question title={`What's the code we've just emailed to ${session.new_email}?`} errors={this.state.errors}>
                        <Field ref="code" name="code" errors={this.state.errors} labelText="" />
                    </Question>
                    <br/>
                    <a href="#next" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    <br/>
                    <br/>
                    <div className="email">
                        <div className="banner"></div>
                        <p>
                            Hello {account.name},<br/><br/>

                            A request has been received to change your email address.  When prompted, enter the code:
                            <br/><br/>
                            {session.new_email_code}
                            <br/>
                            <br/>
                            This code will be valid for the next 15 minutes.

                        </p>
                    </div>

                </Govuk>
            )
        }
    }
)

