import React from 'react'
import GovUk from '../components/govuk'
import { browserHistory, Link } from 'react-router'
import {allAccounts, findAccountByEmail} from '../utils/database'
import {saveGG3Session,clearAllSessions} from '../reducers/helpers'

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
            clearAllSessions(this.props.dispatch)
        }

        onSelectUser(e) {
            this.selectUser(e.target.value)
        }

        selectUser(user) {
            findAccountByEmail(user).then( (account) => {
                saveGG3Session(this.props.dispatch, {email: user, password: account.factors.password.secret});
            });
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
                    <Link to="/service">Spacegov</Link>
                    <br/>
                    <br/>
                    <Link to="/credential">Credential Management</Link>
                    <br/>
                    <br/>

                </GovUk>
            )
        }
    }
)