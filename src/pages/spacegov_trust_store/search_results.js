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

        render() {
            let server = this.props.server;
            let session = this.props.session.helpdesk;

            let res = session.search_results.map( (account) => {
                return (
                    <tr>
                        <td>{account.name}</td>
                        <td>{account.email}</td>
                        <td>{account.space_trading_license_number}</td>
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
                            <th>Email</th>
                            <th>License</th>
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