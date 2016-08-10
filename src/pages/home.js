import React from 'react'
import GovUk from '../components/govuk'
import { browserHistory, Link } from 'react-router'
import {allAccounts, findAccountByEmail} from '../utils/database'
import {saveGG3Session,clearAllSessions} from '../reducers/helpers'
import {serialize, deserialize } from '../utils/serialize'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {accounts: [], data: ""};
            let session_state = this.getQueryParameter("session_state");

            if (session_state) {
                deserialize(props.dispatch, session_state).then((session) => {
                    this.init(session);
                });
            }
            else {
                this.init(props.session);
            }
        }

        init(session) {
            allAccounts().then((accounts) => {
                this.setState({accounts} );
                this.selectUser(accounts[0].email);
            });

            serialize(session).then( (data) => {
                this.setState({ data})
            })
        }

        getQueryParameter(name) {
            var url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
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
            let drop_down = this.state.accounts.map( (u) => <option key={u.email} value={u.email}>{u.status == 'Deleted' ? "DELETED : " + u.email : u.email}</option> );

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
                    <Link to="/fraud">Fraud</Link>
                    <br/>
                    <br/>
                    <a href={`/?session_state=${this.state.data}`}>Open a new window (and copy state)</a>
                    <input type="hidden"  value={this.state.data} name="session_state"/>

                </GovUk>
            )
        }
    }
)