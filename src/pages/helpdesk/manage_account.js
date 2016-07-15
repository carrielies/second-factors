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

        forceRetrust(e) {
            e.preventDefault();
            let store = new StoreHelper(this.props);
            let account = store.serverAccount( store.helpdesk.selected_account );
            store.saveServerAccount(account.breakTrust());
            let helpdesk = store.helpdesk;
            helpdesk.trust_broken = true;
            store.saveHelpdesk(helpdesk);
            store.saveInteraction( "help_desk", "Forced retrust", account);
        }


        authFactors() {
            let store = new StoreHelper(this.props);
            let account = store.serverAccount(store.helpdesk.selected_account);

            let factors = account.factors || [];

            let handlers = {
                google_authenticator: () => {
                    return(
                        <tr>
                            <td>Google authenticator</td>
                            <td>This requires a special app installed on THEIR browser or a phone app which generates a new code every minute or so. </td>
                            <td>Enabled</td>
                            <td className="change-link">
                                <Link to="/helpdesk/manage_google_authenticator">Manage</Link>
                            </td>
                        </tr>
                    )
                },
                password: () => {
                    return (
                        <tr>
                            <td>Password</td>
                            <td>This is enabled by default.  </td>
                            <td>Enabled</td>
                            <td className="change-link">
                                <Link to="/helpdesk/reset_password">Reset password</Link>
                            </td>
                        </tr>
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

        render() {

            let service = this.props.service;
            let resp = service.response_from_gw;

            let store = new StoreHelper(this.props);
            let account = store.serverAccount(store.helpdesk.selected_account);
            let helpdesk = store.helpdesk;

            let logs = account.interactions.map( (e) => {
               return(
                   <tr>
                       <td>{e.origin}</td>
                       <td>{e.event}</td>
                       <td>{e.time}</td>
                   </tr>
               )
            });

            return(
                <Govuk title="Helpdesk">
                    <Breadcrumb text={`${account.name}`} back="/helpdesk/prove_identity"/>

                    <h1 className="heading-medium">{`${account.name}`}</h1>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th colSpan="3">Their details</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr>
                            <td>Credential Id</td>
                            <td>{`${account.cred_id}`}</td>
                            <td className="change-link"></td>
                        </tr>

                        <tr>
                            <td>Name</td>
                            <td>{`${account.name}`}</td>
                            <td className="change-link"></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{`${account.email}`}</td>
                            <td className="change-link">

                            </td>
                        </tr>

                        <tr>
                            <td>Trust Id</td>
                            <td>{account.trust_id}</td>
                            <td> {helpdesk.trust_broken ? "Forced Retrust" : ""}</td>
                        </tr>

                        </tbody>
                    </table>

                    <br/>

                    <h1 className="heading-medium">Their authentication factors</h1>
                    <a href="#" onClick={(e) => this.forceRetrust(e)} >Force services to re-trust user by asking for known facts</a>
                    <br/>
                    <br/>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th colSpan="4">Authentication Factors</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.authFactors()}

                        </tbody>
                    </table>
                    <br/>

                    <h1 className="heading-medium">Their event log</h1>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th>Origin</th>
                            <th>Event</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs}
                        </tbody>
                    </table>





                </Govuk>
            )
        }
    }
)