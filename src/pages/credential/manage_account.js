import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {findAccount, updateAccount, saveAccountInteraction} from '../../utils/database'
import {saveHelpdeskSession} from '../../reducers/helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        constructor(props) {
            super(props);

            let session = props.session.credential;
            let account = session.account;
            this.state = {account: {}};
        }

        componentDidMount() {
            let response = this.props.session.gg3.response;

            findAccount(response.gg_id)
            .then((account) => {
                saveCredentialSession( this.props.dispath, {account});
            })
        }


        authFactors() {
            let account = this.props.session.credential.account;
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

            let session = this.props.session.credential;
            let account = this.props.session.credential.account || {}

            return(
                <Govuk title="Credential Management">
                    <Breadcrumb text={`${account.name}`} back="/helpdesk/search_results"/>



                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th colSpan="3">Your details</th>
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

                        </tbody>
                    </table>
                    <br/>



                    <br/>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th colSpan="4">Your authentication Factors</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.authFactors()}

                        </tbody>
                    </table>
                    <br/>

                </Govuk>
            )
        }
    }
)
