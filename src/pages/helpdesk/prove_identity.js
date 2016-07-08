import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import StoreHelper from '../../utils/store_helper'
import Breadcrumb from '../../components/breadcrumb'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        constructor(props) {
            super(props)
        }
        
        authFactors() {
            
            let store = new StoreHelper(this.props);
            let account = store.serverAccount( store.helpdesk.selected_account );
            let factors = account.factors || [];

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
                },
                password: () => {
                    return(
                        null
                    )
                },
                device_fingerprint: () => {
                    return(
                        null
                    )
                }
            };

            let list = [];

            Object.keys(factors).forEach( (k) => {
                let entry = handlers[k]();
                if (entry) list.push(entry)
            });

            return list;
        }


        forceRetrust(e) {
            e.preventDefault();
            let store = new StoreHelper(this.props);
            let account = store.serverAccount( store.helpdesk.selected_account );
            store.saveServerAccount(account.breakTrust());
            let helpdesk = store.helpdesk;
            helpdesk.trust_broken = true;
            store.saveHelpdesk(helpdesk);
            store.saveInteraction( "help_desk", "Forced retrust", account);
            browserHistory.push("/helpdesk/manage_account");
        }

        continueWithReason(e) {
            let store = new StoreHelper(this.props);
            let account = store.serverAccount(store.helpdesk.selected_account);
            store.saveInteraction( "help_desk", `Proved identity by other means: ${this.refs.how.value}`, account);
            browserHistory.push("/helpdesk/manage_account");
        }



        render() {

            let factors = this.authFactors();
            let store = new StoreHelper(this.props);
            let account = store.serverAccount(store.helpdesk.selected_account);

            return(
                <Govuk title="Helpdesk">
                    <Breadcrumb text={`${account.firstnames} ${account.lastname}`} back="/helpdesk/search_results"/>
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

                        <tr>
                            <td>Shared Secrets</td>
                            <td>These are facts that the user entered when they setup the gateway account<br/>
                            </td>
                            <td></td>
                            <td className="change-link">
                                <Link to="/helpdesk/prove_google_authenticator">Issue Challenge</Link>
                            </td>
                        </tr>



                        </tbody>
                    </table>

                    <br/>
                        <details>

                            <summary><span class="summary">Customer unable to prove their identity</span></summary>

                            <div class="panel panel-border-narrow">

                                <p>
                                    If you continue on, then you will break their trust between any of their enrolled services.
                                </p>

                                <a href="#" className="button" onClick={(e) => this.forceRetrust(e)}>Manage their account</a>

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

                                <a href="#" className="button" onClick={(e) => this.continueWithReason(e)}>Manage their account</a>

                            </div>

                        </details>




                </Govuk>
            )
        }
    }
)