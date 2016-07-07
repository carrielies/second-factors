import React from 'react'
import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Ga from '../../components/ga'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory, Link } from 'react-router'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage {


        onClick(e) {
            e.preventDefault();

            if( this.refs.yes.checked ) {
                let account = this.props.helpdesk.account;
                account.trust_id = this.guid();

                delete( this.props.helpdesk.account.factors.google_authenticator );

                this.props.dispatch({type: 'SAVE_HELPDESK', data: {account}});
            }



            browserHistory.push("/helpdesk/manage_account")

        }

        render() {
            return(
                <Govuk>
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