import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {findAccount, updateAccount, saveAccountInteraction} from '../../utils/database'
import {saveCredentialSession, saveGG3Session} from '../../reducers/helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        constructor(props) {
            super(props);
        }

        componentDidMount() {
            let response = this.props.session.gg3.response;

            findAccount(response.gg_id)
            .then((account) => {
                saveCredentialSession( this.props.dispatch, {account});
            })
        }

        goBack(e) {
            e.preventDefault();
            let request = this.props.session.gg3.request.calling_service_request;

            saveGG3Session(this.props.dispatch, {request});
            browserHistory.push("/service_redirect");

        }


        authFactors() {

            let account = this.props.session.credential.account;

            if ( !account  ) return [];
            let factors = account.factors;

            let list = [];

            list.push(
                <tr>
                    <td>Password</td>
                    <td>This is enabled by default.  </td>
                    <td>Enabled</td>
                    <td className="change-link">
                        <Link to="/credential/change_password">Change password</Link>
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
                            <Link to="/credential/remove_factor?factor_to_remove=google_authenticator">Remove Google authenticator</Link>
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
                            <Link to="/credential/remove_factor?factor_to_remove=u2f_key">Remove U2F key</Link>
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
                            <Link to="/credential/remove_factor?factor_to_remove=cryptophoto">Remove CryptoPhoto</Link>
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
                            <Link to="/credential/remove_factor?factor_to_remove=device_fingerprint">Remove Device Fingerprint</Link>
                        </td>
                    </tr>
                )
            }

            list.push(
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="change-link">
                        <Link to="/credential/your_auth_factors">Add additional second factor</Link>
                    </td>
                </tr>

            )

            return list;
        }


        render() {

            let gg3 = this.props.session.gg3;
            let session = this.props.session.credential;
            let account = session.account || {};

            let callingService = gg3.request.calling_service_request;

            return(
                <Govuk title="Credential Management">
                    <Breadcrumb text={`${account.name}`} hide_back={true}/>



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
                            <td className="change-link"><Link to="/credential/change_name">Change name</Link></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{`${account.email}`}</td>
                            <td className="change-link"><Link to="/credential/change_email">Change email</Link></td>
                        </tr>


                        { account.type === "individual" ?
                            <tr>
                                <td>Account type</td>
                                <td>Individual</td>
                                <td className="change-link"><Link to="/credential/convert_to_org">Convert to
                                    Organisation</Link></td>
                            </tr> : null
                        }

                        { account.type === "admin" ?
                            <tr>
                                <td>Account type</td>
                                <td>Administrator</td>
                                <td className="change-link"></td>
                            </tr> : null
                        }

                        { account.type === "assistant" ?
                            <tr>
                                <td>Account type</td>
                                <td>Assistant</td>
                                <td className="change-link"></td>
                            </tr> : null
                        }


                        { account.is_org ?
                            <tr>
                                <td>Organisation name</td>
                                <td>{account.org_name}</td>
                                <td className="change-link">
                                    { account.type === "admin" ?
                                        <Link to="/org/manage_org">Manage Organisation</Link> : null
                                    }
                                </td>
                            </tr> : null
                        }


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


                    {callingService ?
                    <a href="#" className="button" onClick={(e) => this.goBack(e)}>Go back to {callingService.name}</a> : null}

                </Govuk>
            )
        }
    }
)
