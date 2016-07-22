import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import StoreHelper from '../../utils/store_helper'
import Breadcrumb from '../../components/breadcrumb'
import {findAccount, updateAccount, saveAccountInteraction} from '../../utils/helpdesk_db'
import {saveHelpdeskSession} from '../../reducers/store_helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        constructor(props) {
            super(props);
            let session = props.session.helpdesk;
            let account = session.account;
            this.state = {account};
        }

        resetChanges(e) {
            if(e) e.preventDefault();
            let session = this.props.session.helpdesk;
            let account = session.account;

            findAccount(account.email).then( (a) => {
                this.setState( {account: a} );
                saveHelpdeskSession(this.props.dispatch, {a, account_changed: false})
            })
        }

        saveChanges(e) {
            e.preventDefault();
            let session = this.props.session.helpdesk;
            let account = this.props.session.helpdesk.account;

            updateAccount(account).then(() => {
                return saveAccountInteraction(account.email, "helpdesk", session.actions.join(", ") );
            }).then( () => {
                browserHistory.push("/helpdesk/search")
            });
        }



        authFactors() {
            let account = this.props.session.helpdesk.account;
            let factors = account.factors;

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

        eventLog() {

            let session = this.props.session.helpdesk;
            let account = session.account;

            let interactions = account.interactions || [];
            let logs = interactions.map( (e) => {
                return(
                    <tr>
                        <td>{e.origin}</td>
                        <td>{e.event}</td>
                        <td>{e.time}</td>
                    </tr>
                )
            });

            return(

                <div>
                    <details>
                        <summary><span className="summary">View their event log</span></summary>
                        <div className="panel panel-border-narrow">
                            <table className="table-font-xsmall" >
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
                        </div>
                    </details>
                </div>
            )
        }

        pendingChanges() {

            let session = this.props.session.helpdesk;
            let actions = session.actions;
            if ( !session.account_changed) return null;

            let a = actions.map( (a) => <tr><td>{a}</td></tr>);

            let button_name = "Save changes";
            if( !session.id_proven ) {
                button_name = "Save changes and break trust";
            }

            return (
                <div>
                    {session.account_changed ? <a href="#" className="button" onClick={(e) => this.saveChanges(e)}>{button_name}</a> : null }
                    <br/>
                    <br/>
                    <details>
                        <summary><span className="summary">View pending changes</span></summary>
                        <div className="panel panel-border-narrow">
                            <table className="table-font-xsmall" >
                                <tbody>
                                    {a}
                                </tbody>
                            </table>
                        </div>
                    </details>
                </div>
            )
        }

        render() {

            let session = this.props.session.helpdesk;
            let account = session.account;

            return(
                <Govuk title="Helpdesk">
                    <Breadcrumb text={`${account.name} ${session.id_proven ?  "(Identity Proven)" : "(Identity not Proven)"}`} back="/helpdesk/search_results"/>



                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th colSpan="3">Their details</th>
                        </tr>
                        </thead>
                        <tbody>

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
                            <td></td>
                        </tr>

                        </tbody>
                    </table>
                    <br/>



                    <br/>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th colSpan="4">Their authentication Factors</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.authFactors()}

                        </tbody>
                    </table>
                    <br/>

                    {this.pendingChanges()}
                    {this.eventLog()}

                    <br/>

                    <a href="#" onClick={(e) => this.forceRetrust(e)} >Force services to re-trust user by asking for known facts</a>


                </Govuk>
            )
        }
    }
)
