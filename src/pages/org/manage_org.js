import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {findAccount, updateAccount, saveAccountInteraction} from '../../utils/database'
import {saveOrgSession, saveGG3Session} from '../../reducers/helpers'
import {getGroupAccounts} from '../../utils/database'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage {

        constructor(props) {
            super(props);


            this.state = {accounts: []};
        }

        componentDidMount() {
            let credential = this.props.session.credential;
            let account = credential.account;

            findAccount( account.gg_id ).then( (admin_account) => {
                saveOrgSession( this.props.dispatch, {admin_account, org_name: admin_account.org_name, group_id: admin_account.group_id});
                return admin_account;
            }).then( (admin_account) => {
                getGroupAccounts(admin_account.group_id).then( (accounts) => {
                    console.log(accounts)
                    let filteredAccounts = accounts.filter( (a) => a.gg_id != admin_account.gg_id );
                    this.setState( { accounts: filteredAccounts })
                })
            });
        }

        manageAccount(e, gg_id) {
            e.preventDefault();
            findAccount( gg_id ).then( (account) => {
                saveOrgSession(this.props.dispatch, {account});
                browserHistory.push("/org/manage_account");
            });
        }

        render() {

            let session = this.props.session.org;


            let admin_account = session.admin_account;
            let accounts = this.state.accounts;
            let org_name = admin_account ? admin_account.org_name : "";

            let account_list = accounts.map( (a) => {

                if ( !a.factors ) {
                    return(
                        <tr>
                            <td>{a.name}</td>
                            <td>{a.email}</td>
                            <td>{a.type == "admin" ? "Administrator" : "Assistant"}</td>
                            <td className="change-link"><a href="#" onClick={(e) => e.preventDefault()}>Resend email</a></td>
                        </tr>
                    )
                }

                return(
                    <tr>
                        <td>{a.name}</td>
                        <td>{a.email}</td>
                        <td>{a.type == "admin" ? "Administrator" : "Assistant"}</td>
                        <td className="change-link"><a href="#" onClick={(e) => this.manageAccount(e, a.gg_id)}>Manage Account</a></td>
                    </tr>
                )
            });

            return(
                <Govuk title="Organisation Management">
                    <Breadcrumb text={`${org_name}`} back="/credential/manage_account"/>



                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th colSpan="4">Your linked users</th>
                        </tr>
                        </thead>
                        <tbody>
                        {account_list}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="change-link"><Link to="/org/create_account">Create Account</Link></td>
                        </tr>

                        </tbody>
                    </table>
                </Govuk>
            )

        }

    }
)