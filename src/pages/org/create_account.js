import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'
import {saveOrgSession} from '../../reducers/helpers'
import {updateAccount, findAccount, saveAccount} from '../../utils/database'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            this.validate(e, {
                name: {msg: "Enter their name", summary: "You need to enter their name", regEx: /\w+/},
                email: {msg: "Enter their email", summary: "You need to enter their email", regEx: /\w+/},
            }, (props) => {


                let type = "assistant";

                if ( this.refs.admin.checked ) {
                    type="admin";
                }

                let session = this.props.session.org;
                let account = {
                    name: props.name,
                    email: props.email,
                    gg_id: this.cred_id(),
                    group_id: session.group_id,
                    org_name: session.org_name,
                    is_org: true,
                    type: type
                };

                saveAccount(account).then( ()=> {
                    saveOrgSession(this.props.dispatch, {account} );
                    browserHistory.push("/org/create_account_summary")
                });
            })
        }

        render() {
            let session = this.props.session.org;


            return (
                <Govuk phaseBanner="true" title={session.org_name}>
                    <Breadcrumb text={`Register a new user for ${session.org_name}`}/>

                    <Question title="Enter the new user's details" errors={this.state.errors}>
                        <Field ref="name" name="name" errors={this.state.errors} labelText="Name"/>
                        <Field ref="email" name="email" errors={this.state.errors} labelText="Email"/>

                        <h1 className="heading-small">Account type</h1>
                        <fieldset className="inline">
                            <label className="block-label">
                                <input id="admin" type="radio" name="radio-group" value="admin" ref="admin"/>Administrator
                            </label>
                            <label className="block-label">
                                <input id="assistant" type="radio" name="radio-group" value="assistant" ref="assistant"/>Assistant
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

