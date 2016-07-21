import React from 'react'
import GovUk from '../components/govuk'
import StoreHelper from '../utils/store_helper'
import { browserHistory, Link } from 'react-router'
import {allAccounts, findAccount} from '../utils/database'
import {saveGG3Session} from '../reducers/store_helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends React.Component {

        constructor() {
            super();
            this.state = {accounts: []};

            allAccounts().then((accounts) => {
                this.setState({accounts} );
                this.selectUser(accounts[0].email);
            });
        }

        componentDidMount() {
            // let store = new StoreHelper(this.props);
            store.clearCookie();
            store.clearAccount();
            // let users = Object.keys(this.props.server);
            // this.selectUser(users[0])
        }

        onSelectUser(e) {
            this.selectUser(e.target.value)
        }

        selectUser(user) {
            findAccount(user).then( (account) => {
                saveGG3Session(this.props.dispatch, {email: user, password: account.factors.password.secret});
            });
            // let account = this.state.accounts.filter((a) => a.email === user)[0];
            //
            //
            //
            // let store = new StoreHelper(this.props);
            // let account = store.findAccountByEmail(user);
            //
            // let data = {
            //     email: user,
            //     factors: {
            //         password: {
            //             secret: account.factors.password.secret
            //         }
            //     }
            // };
            //
            // this.props.dispatch( {type: 'SAVE_ACCOUNT', data: data })

        }

        render() {
            let drop_down = this.state.accounts.map( (u) => <option value={u.email}>{u.email}</option> );

            return(
                <GovUk title="Home">
                    <br/>
                    <select onChange={(e) => this.onSelectUser(e)}>
                        {drop_down}
                    </select>
                    <br/>
                    <br/>
                    <Link to="/helpdesk">Helpdesk</Link>
                    <br/>
                    <br/>
                    <Link to="/service">Spacegovaa</Link>
                    <br/>
                    <br/>

                </GovUk>
            )
        }
    }
)