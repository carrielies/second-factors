import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {findAccount, updateAccount, saveAccountInteraction} from '../../utils/database'
import {saveOrgSession, saveGG3Session} from '../../reducers/helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        constructor(props) {
            super(props);
        }

        componentDidMount() {
            let session = this.props.session.org;
            let account = session.account;
            findAccount(account.gg_id)
            .then((account) => {
                saveOrgSession( this.props.dispatch, {account});
            })
        }


        authFactors() {
            let account = this.props.session.org.account;
            let factors = account.factors;

            let list = [];

            list.push(
                <tr>
                    <td>Password</td>
                    <td>This is enabled by default.  </td>
                    <td>Enabled</td>
                    <td className="change-link">
                        <Link to="/org/change_password">Change password</Link>
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
                            <Link to="/org/remove_factor?factor_to_remove=google_authenticator">Remove Google authenticator</Link>
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
                            <Link to="/org/remove_factor?factor_to_remove=u2f_key">Remove U2F key</Link>
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
                            <Link to="/org/remove_factor?factor_to_remove=cryptophoto">Remove CryptoPhoto</Link>
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
                            <Link to="/org/remove_factor?factor_to_remove=device_fingerprint">Remove Device Fingerprint</Link>
                        </td>
                    </tr>
                )
            }

            return list;
        }

        convertToAssistant(e) {
            e.preventDefault();

            let session = this.props.session.org;
            let account = session.account;
            account.type = "assistant";

            updateAccount(account).then( () => {
                saveOrgSession( this.props.dispatch, {account});
            });
        }

        convertToAdmin(e) {
            e.preventDefault();

            let session = this.props.session.org;
            let account = session.account;
            account.type = "admin";

            updateAccount(account).then( () => {
                saveOrgSession( this.props.dispatch, {account});
            });
        }



        render() {

            let gg3 = this.props.session.gg3;

            let session = this.props.session.org;
            let account = session.account;

            return(
                <Govuk title={session.org_name}>
                    <Breadcrumb text={`${account.name}`} back="/org/manage_org"/>

                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th colSpan="3">{account.name} details</th>
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
                            <td className="change-link"></td>
                        </tr>

                        { account.type === "admin" ?
                            <tr>
                                <td>Type</td>
                                <td>Adminstrator</td>
                                <td className="change-link"><a href="#" onClick={(e) => this.convertToAssistant(e)}>Convert to assistant</a></td>
                            </tr> :

                            <tr>
                                <td>Type</td>
                                <td>Assistant</td>
                                <td className="change-link"><a href="#" onClick={(e) => this.convertToAdmin(e)}>Convert to administrator</a></td>
                            </tr>
                        }



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
                    <Link to="/org/delete_account" className="button-secondary">Delete account</Link>

                </Govuk>
            )
        }
    }
)
