import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {findAccount, updateAccount} from '../../utils/helpdesk_db'
import {applyInteraction} from '../../utils/database'
import {saveHelpdeskSession} from '../../reducers/helpers'
import {saveGG3Session} from '../../reducers/helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        constructor(props) {
            super(props);
            let session = props.session.helpdesk;
            let account = session.account;
            this.state = {account};
        }

        componentDidMount() {
            let session = this.props.session.helpdesk;
            let account = session.account;

            findAccount(account.gg_id)
            .then((account) => {
                saveHelpdeskSession( this.props.dispatch, {account});
            })
        }

        forceRetrust(e) {
            e.preventDefault();
            let session = this.props.session.helpdesk;
            let account = session.account;
            account.trust_id = this.trust_id();
            applyInteraction( account, "helpdesk", `Forced retrust` );
            updateAccount( account ).then( () => {
                saveHelpdeskSession(this.props.dispatch, {trust_id_changed: true, account});
            });
        }


        goBack(e) {
            let gg3 = this.props.session.gg3;
            if (gg3 && gg3.request && gg3.request.calling_service_request) {
                e.preventDefault();

                let request = gg3.request.calling_service_request;

                saveGG3Session(this.props.dispatch, {request});
                browserHistory.push("/service_redirect");
            }

        }


        authFactors() {
            let account = this.props.session.helpdesk.account;
            let factors = account.factors;

            let list = [];

            list.push(
                <tr>
                    <td>Password</td>
                    <td></td>
                    <td></td>
                    <td className="change-link">
                        <Link to="/helpdesk/reset_password">Reset password</Link>
                    </td>
                </tr>
            );

            if ( factors.google_authenticator ) {
                list.push(
                    <tr>
                        <td>Google authenticator</td>
                        <td></td>
                        <td>Enabled</td>
                        <td className="change-link">
                            <Link to="/helpdesk/remove_factor?factor_to_remove=google_authenticator">Remove Google authenticator</Link>
                        </td>
                    </tr>
                )
            }

            if ( factors.u2f_key ) {
                list.push(
                    <tr>
                        <td>U2F Key</td>
                        <td></td>
                        <td>Enabled</td>
                        <td className="change-link">
                            <Link to="/helpdesk/remove_factor?factor_to_remove=u2f_key">Remove U2F key</Link>
                        </td>
                    </tr>
                )
            }

            if ( factors.cryptophoto ) {
                list.push(
                    <tr>
                        <td>Cryptophoto</td>
                        <td></td>
                        <td>Enabled</td>
                        <td className="change-link">
                            <Link to="/helpdesk/remove_factor?factor_to_remove=cryptophoto">Remove CryptoPhoto</Link>
                        </td>
                    </tr>
                )
            }

            if ( factors.device_fingerprint ) {
                list.push(
                    <tr>
                        <td>Device Fingerprint</td>
                        <td></td>
                        <td>Enabled</td>
                        <td className="change-link">
                            <Link to="/helpdesk/remove_factor?factor_to_remove=device_fingerprint">Remove Device Fingerprint</Link>
                        </td>
                    </tr>
                )
            }


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

        render() {

            let session = this.props.session.helpdesk;
            let gg3 = this.props.session.gg3;
            let account = session.account;
            let callingService = null;
            if (gg3 && gg3.request && gg3.request.calling_service_request){
                callingService = <a href="#" className="button" onClick={(e) => this.goBack(e)}>Go back to {gg3.request.calling_service_request.name}</a>
            }
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
                            <td>{session.trust_id_changed ? "Trust broken" : ""}</td>
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
                    {this.eventLog()}

                    <br/>

                    <a href="#" onClick={(e) => this.forceRetrust(e)} >Force services to re-trust user by asking for known facts</a>
                    <br/>
                    <br/>
                    {callingService}

                </Govuk>
            )
        }
    }
)
