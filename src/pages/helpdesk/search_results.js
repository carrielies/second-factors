import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {} from '../../utils/helpdesk_db'
import {saveHelpdeskSession} from '../../reducers/helpers'
import {findAccount} from '../../utils/helpdesk_db'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{


        select(e, gg_id) {
            e.preventDefault();
            findAccount(gg_id).then( (account) => {
                saveHelpdeskSession(this.props.dispatch, {account, account_changed: false, trust_id_changed: false, trust_id_level_2_changed: false, id_proven: false, id_proof: null, actions: []} );
                browserHistory.push("/helpdesk/prove_identity")
            });
        }

        render() {
            let server = this.props.server;
            let session = this.props.session.helpdesk;

            let res = session.search_results.map( (account) => {
                return (
                    <tr>
                        <td>{account.name}</td>
                        <td>{account.email}</td>
                        <td>{account.gg_id}</td>
                        <td>{account.status}</td>
                        <td className="change-link"><a href="#" onClick={(e) => this.select(e, account.gg_id)}>Prove Identity</a></td>
                    </tr>

                )
            });

            return(
                <Govuk title={session.title}>
                    <Breadcrumb text="" back="/helpdesk/search"/>
                    <h1 className="heading-medium">Results</h1>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gateway ID</th>
                            <th>Status</th>
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