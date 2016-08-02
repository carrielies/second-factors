import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import React from 'react'
import { browserHistory } from 'react-router'

import {connect} from 'react-redux'
import {saveRegistrationSession} from '../../reducers/helpers'
import {deleteAccount, applyInteraction} from '../../utils/database'

export default connect((state) => state) (

    class extends QuestionPage {

        constructor(props) {
            super(props);
        }

        onClick(e) {
            e.preventDefault();
            if ( this.refs.yes.checked ) {
                let session = this.props.session.org;
                let account = session.account;

                deleteAccount(account.gg_id).then( () => {
                    browserHistory.push("/org/manage_org")
                })
            }

            if ( this.refs.no.checked ) {
                browserHistory.push("/org/manage_account")
            }
        }

        render() {
            let gg3 = this.props.session.gg3;
            let session = this.props.session.org;
            let account = session.account;

            return(
                <Govuk title="Organisation Management">
                    <Breadcrumb text={`${account.name}`} back="/org/manage_account"/>
                    <Question title={`Do you want to delete ${account.name}?`}>
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
