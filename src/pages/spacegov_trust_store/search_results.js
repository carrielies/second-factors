import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {} from '../../utils/helpdesk_db'
import {saveTrustStoreSession} from '../../reducers/helpers'


import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        render() {
            let server = this.props.server;
            let session = this.props.session.trust_store;

            let res = session.search_results.map( (account) => {
                return (
                    <tr>
                        <td>{account.name}</td>
                        <td>{account.gg_id}</td>
                        <td>{account.space_trading_license_number}</td>
                        <td>{account.org_name}</td>
                    </tr>

                )
            });

            return(
                <Govuk title="Spacegov Trust Store">
                    <Breadcrumb text="" back="/spacegov/trust_store/search"/>
                    <h1 className="heading-medium">Results</h1>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gateway ID</th>
                            <th>License</th>
                            <th>Organisation Name</th>
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