import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {findAccount, updateAccount} from '../../utils/fraud_db'
import {applyInteraction} from '../../utils/database'
import {saveFraudSession} from '../../reducers/helpers'
import {saveGG3Session} from '../../reducers/helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        constructor(props) {
            super(props);
            let session = props.session.fraud;
            let account = session.account;
            this.state = {account};
        }

        componentDidMount() {
            let session = this.props.session.fraud;
            let account = session.account;

            findAccount(account.gg_id)
            .then((account) => {
                saveFraudSession( this.props.dispatch, {account});
            })
        }

        forceRetrust(e) {
            e.preventDefault();
            let session = this.props.session.fraud;
            let account = session.account;
            account.trust_id = this.trust_id();
            applyInteraction( account, "fraud", `Forced retrust` );
            updateAccount( account ).then( () => {
                saveFraudSession(this.props.dispatch, {trust_id_changed: true, account});
            });
        }

        suspendAccount(e) {
            e.preventDefault();
            let session = this.props.session.fraud;
            let account = session.account;
            account.status = "Suspended";
            applyInteraction( account, "fraud", `Account Suspended` );
            updateAccount( account ).then( () => {
                saveFraudSession(this.props.dispatch, {account});
            });
        }

        clearAccount(e) {
            e.preventDefault();
            let session = this.props.session.fraud;
            let account = session.account;
            account.status = "Active";
            applyInteraction( account, "fraud", `Account Cleared` );
            updateAccount( account ).then( () => {
                saveFraudSession(this.props.dispatch, {account});
            });
        }

        flagAccount(e) {
            e.preventDefault();
            let session = this.props.session.fraud;
            let account = session.account;
            account.status = "Flagged";
            applyInteraction( account, "fraud", `Account Flagged` );
            updateAccount( account ).then( () => {
                saveFraudSession(this.props.dispatch, {account});
            });
        }

        statusUpdates() {
            let session = this.props.session.fraud;
            let gg3 = this.props.session.gg3;
            let account = session.account;
            if (!account.status || account.status == "Active"){
               return(
                    <div>
                        <a href="#" onClick={(e) => this.suspendAccount(e)}>Suspend Account</a>
                        <br/>
                        <br/>
                        <a href="#" onClick={(e) => this.flagAccount(e)} >Flag Account</a>
                    </div>
                )
            }
            if (account.status == "Flagged"){
               return(
                    <div>
                       <a href="#" onClick={(e) => this.clearAccount(e)}>Clear Account</a>
                       <br/>
                       <br/>
                       <a href="#" onClick={(e) => this.suspendAccount(e)}>Suspend Account</a>
                    </div>
               )
            }
            if (account.status == "Suspended"){
               return(
                    <div>
                       <a href="#" onClick={(e) => this.clearAccount(e)}>Clear Account</a>
                        <br/>
                        <br/>
                        <a href="#" onClick={(e) => this.flagAccount(e)}>Flag Account</a>
                    </div>
               )
            }
        }

        eventLog() {

            let session = this.props.session.fraud;
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

            let session = this.props.session.fraud;
            let gg3 = this.props.session.gg3;
            let account = session.account;
            let account_status = account.status ? account.status: "Active"

            return(
                <Govuk title="Fraud Helpdesk" header="FRAUD.GOV">
                    <div className="fraud"></div>
                    <Breadcrumb text="" back="/fraud/search_results"/>
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
                        <tr>
                            <td>Status</td>
                            <td>{account_status}</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <br/>
                    {this.statusUpdates()}
                    <br/>
                    <br/>
                    {this.eventLog()}

                    <br/>

                    <a href="#" onClick={(e) => this.forceRetrust(e)} >Force services to re-trust user by asking for known facts</a>
                    <br/>
                    <br/>

                </Govuk>
            )
        }
    }
)
