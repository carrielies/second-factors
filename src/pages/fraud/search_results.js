import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {} from '../../utils/helpdesk_db'
import {saveGG3Session, saveFraudSession} from '../../reducers/helpers'
import {findAccount} from '../../utils/fraud_db'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{
        select(e, gg_id) {
            e.preventDefault();
            findAccount(gg_id).then( (account) => {
                saveFraudSession(this.props.dispatch, {account, account_changed: false, trust_id_changed: false, id_proven: false, id_proof: null, actions: []} );
                browserHistory.push("/fraud/manage_account")
            });
        }

        render() {
            let server = this.props.server;
            let session = this.props.session.fraud;

            let res = session.search_results.map( (account) => {
                return (
                    <tr>
                        <td>{account.name}</td>
                        <td>{account.gg_id}</td>
                        <td>{account.space_trading_license_number}</td>
                        <td>{account.org_name}</td>
                        <td className="change-link"><a href="#" onClick={(e) => this.select(e, account.gg_id)}>Manage Account</a></td>

                    </tr>

                )
            });

            return(
                <Govuk title="Fraud Helpdesk" header="FRAUD.GOV">
                    <div className="fraud"></div>
                    <Breadcrumb text="" back="/fraud/search"/>
                    <h1 className="heading-medium">Results</h1>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gateway ID</th>
                            <th>License</th>
                            <th>Organisation Name</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {res}

                        </tbody>
                    </table>
                    <br/>

                </Govuk>
            )
        }
    }
)