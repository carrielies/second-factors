import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {} from '../../utils/helpdesk_db'
import {saveTrustStoreSession} from '../../reducers/helpers'
import {saveHelpdeskSession} from '../../reducers/helpers'
import {saveGG3Session} from '../../reducers/helpers'


import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        select(e, gg_id) {
            e.preventDefault();

            let request = {
                name: "Helpdesk",
                auth_level_required: "1",
                auth_level_desired: "1",
                redirect_url: "/helpdesk/external_select_account?gg_id=" + gg_id,
                calling_service_request: {
                    name: "Spacegov Helpdesk",
                    auth_level_required: "1",
                    auth_level_desired: "1",
                    redirect_url: "/spacegov/trust_store/search_results"
                },
                accept_trust_request: {
                    name: "Spacegov Helpdesk",
                    auth_level_required: "1",
                    auth_level_desired: "1",
                    redirect_url: "/spacegov/trust_store/external_accept_trust?gg_id=" + gg_id
                }
            };
            saveGG3Session(this.props.dispatch, {request});
            browserHistory.push("/service_redirect");

        }

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
                        <td className="change-link"><a href="#" onClick={(e) => this.select(e, account.gg_id)}>Prove Identity</a></td>
                    </tr>

                )
            });

            return(
                <Govuk title="Spacegov Helpdesk" hidePhaseBanner={true}>
                    <div className="spacegov"></div>
                    <Breadcrumb text="" back="/spacegov/trust_store/search"/>
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