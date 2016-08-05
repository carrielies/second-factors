import React from 'react'
import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Ga from '../../components/ga'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory, Link } from 'react-router'
import {saveHelpdeskSession} from '../../reducers/helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage {


        onClick(e) {
            e.preventDefault();

            if( this.refs.yes.checked ) {
                let session = this.props.session.helpdesk;
                let actions = session.actions;
                let account = session.account;
                delete( account.factors.google_authenticator );
                actions.push("Removed Google authenticator");
                saveHelpdeskSession(this.props.dispatch, {actions, account, account_changed: true, actions});
            }

            browserHistory.push("/helpdesk/manage_account")

        }

        render() {
            let account = this.props.session.helpdesk.account;

            return(
                <Govuk title={session.title}>
                    <Breadcrumb text={`${account.name}`}/>
                    <Question title="Remove Google Authenticator?">
                        <p>
                            Removing google authenticator from the account will force the customers trust to existing services
                           to be broken.  Are you sure ?
                        </p>
                        <fieldset className="inline">
                            <label className="block-label">
                                <input id="yes" type="radio" name="radio-group" value="Yes" ref="yes"/>Yes
                            </label>
                            <label className="block-label">
                                <input id="no" type="radio" name="radio-group" value="No" ref="no"/>No
                            </label>
                        </fieldset>
                    </Question>
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.onClick(e)}>Continue</a>
                </Govuk>
            )
        }
    }
)