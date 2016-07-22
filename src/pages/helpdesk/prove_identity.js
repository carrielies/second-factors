import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import StoreHelper from '../../utils/store_helper'
import Breadcrumb from '../../components/breadcrumb'
import {saveAccountInteraction, findAccount} from '../../utils/helpdesk_db'
import {saveHelpdeskSession} from '../../reducers/store_helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        constructor(props) {
            super(props)
        }

        manage_account(log, account, id_proven) {
            let session = this.props.session.helpdesk;
            saveAccountInteraction(account.email, "helpdesk", log ).then( () => {
                return findAccount(account.email)
            }).then((a) => {
                saveHelpdeskSession( this.props.dispatch, {account: a, id_proven});
                browserHistory.push("/helpdesk/manage_account");
            })
        }

        identityProved(id_proof) {
            let account = this.props.session.helpdesk.account;
            this.manage_account(id_proof, account, true);
        }

        componentDidMount() {
            let session = this.props.session.helpdesk;
            if( session.id_proven ) {
                this.identityProved(session.id_proof);
            }
        }
        
        authFactors() {

            let factors = this.props.session.helpdesk.account.factors;

            let handlers = {
                google_authenticator: () => {
                    return(
                        <tr>
                            <td>Google authenticator</td>
                            <td>This requires a special app installed on THEIR browser or a phone app which generates a new code every 30 seconds.   </td>
                            <td></td>
                            <td className="change-link">
                                <Link to="/helpdesk/prove_google_authenticator">Issue Challenge</Link><br/>
                            </td>
                        </tr>
                    )
                }
            };

            return Object.keys(factors).map( k => handlers[k] ? handlers[k]() : null ).filter( (h) => h != null);
        }


        doNotTrust(e) {
            e.preventDefault();
            let session = this.props.session.helpdesk;
            let account = session.account;

            let actions = session.actions;
            actions.push("trust_id reset");
            account.trust_id = this.trust_id();

            saveHelpdeskSession(this.props.dispatch, {actions: actions});
            this.manage_account("unable to prove identity", account, false);
        }

        trustWithReason(e) {
            e.preventDefault();
            let session = this.props.session.helpdesk;
            let account = session.account;

            // saveHelpdeskSession(this.props.dispatch, {account: account, id_proof: true});
            this.manage_account(`Proved identity by other means: ${this.refs.how.value}`, account, true);
        }


        render() {

            let factors = this.authFactors();
            let account = this.props.session.helpdesk.account;

            return(
                <Govuk title="Helpdesk">
                    <Breadcrumb text={`${account.name}`} back="/helpdesk/search_results"/>
                    <Content>
                        <h1 className="heading-medium">Prove their identity ?</h1>
                        <p>We need to trust the customer is who they say they are.  This can be done by issuing a challenge based on 2nd factors they have set up.</p>
                    </Content>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th colSpan="4">Strong Authentication Factors</th>
                        </tr>
                        </thead>
                        <tbody>
                        {factors}
                        </tbody>
                    </table>

                    <br/>
                        <details>

                            <summary><span class="summary">Customer unable to prove their identity</span></summary>

                            <div class="panel panel-border-narrow">

                                <p>
                                    If you continue on, then you will break their trust between any of their enrolled services.
                                </p>

                                <a href="#" className="button" onClick={(e) => this.doNotTrust(e)}>Manage their account</a>

                            </div>

                        </details>
                        <br/>

                        <details>

                            <summary><span class="summary">I've proved their identity by other means</span></summary>

                            <div class="panel panel-border-narrow">

                                <h1 className="heading-small">
                                    How have you proved their identity ?
                                </h1>
                                <p>This will be recorded in their event log</p>
                                <textarea ref="how" cols="100" rows="3"></textarea>
                                <br/>
                                <br/>

                                <a href="#" className="button" onClick={(e) => this.trustWithReason(e)}>Manage their account</a>

                            </div>

                        </details>




                </Govuk>
            )
        }
    }
)