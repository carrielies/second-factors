import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import React from 'react'
import { browserHistory } from 'react-router'

import {connect} from 'react-redux'
import {saveHelpdeskSession} from '../../reducers/helpers'
import {updateAccount, applyInteraction} from '../../utils/database'

export default connect((state) => state) (

    class extends QuestionPage {

        constructor(props) {
            super(props);
            this.state = {factor_to_remove: this.getQueryParameter("factor_to_remove")}
        }

        onClick(e) {
            e.preventDefault();

            if ( this.refs.yes.checked ) {
                let gg3 = this.props.session.gg3;
                let session = this.props.session.helpdesk;
                let account = session.account;
                let factor_to_remove = this.state.factor_to_remove;
                delete account.factors[factor_to_remove];

                if ( ! session.id_proven && !session.trust_id_changed) {
                    account.trust_id = this.trust_id();
                    saveHelpdeskSession( this.props.dispatch, {trust_id_changed: true});
                }

                applyInteraction( account, "helpdesk", `Removed ${factor_to_remove}` );

                updateAccount( account ).then( () => {
                    browserHistory.push("/helpdesk/manage_account")
                })
            }

            if ( this.refs.no.checked ) {
                browserHistory.push("/helpdesk/manage_account")
            }
        }

        render() {
            let gg3 = this.props.session.gg3;
            let session = this.props.session.helpdesk;
            let account = this.props.session.helpdesk.account || {};
            let factor_to_remove = this.state.factor_to_remove.replace("_", " ");

            return(
                <Govuk title="Helpdesk">
                    <Breadcrumb text={`${account.name} ${session.id_proven ?  "(Identity Proven)" : "(Identity not Proven)"}`} back="/helpdesk/manage_account"/>
                    <Question title={`Remove ${factor_to_remove}?`}>
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
