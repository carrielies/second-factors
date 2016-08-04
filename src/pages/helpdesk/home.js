import React from 'react'
import GovUk from '../../components/govuk'
import { browserHistory, Link } from 'react-router'
import {allAccounts, findAccountByEmail} from '../../utils/database'
import {exportGroupEnrolments} from '../../utils/helpdesk_db'
import {saveGG3Session,clearAllSessions} from '../../reducers/helpers'
import {serialize, deserialize } from '../../utils/serialize'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {filteredAccounts: [], data: ""};
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

        inArray(account, allowedGroups) {
            return (allowedGroups.find( (group) => group.group_id == account.group_id))
        }

        init(session) {
            let allowedGroups = []
            exportGroupEnrolments().then((groupEnrolments) => {
                allowedGroups = groupEnrolments
            });

            allAccounts().then((allAccounts) => {
                let filteredAccounts = allAccounts.filter( (a) => this.inArray(a, allowedGroups))
                this.setState({filteredAccounts} );
                this.selectUser(filteredAccounts[0].email);
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
            let drop_down = this.state.filteredAccounts.map( (u) => <option key={u.email} value={u.email}>{u.email}</option> );

            return(
                <GovUk title="Helpdesk">
                    <br/>
                    <select onChange={(e) => this.onSelectUser(e)}>
                        {drop_down}
                    </select>
                    <br/>
                    <br/>
                    <Link to="/helpdesk/index">Helpdesk</Link>
                    <br/>
                    <br/>
                    <Link to="/spacegov/trust_store">Spacegov Helpdesk TrustStore Service</Link>
                    <br/>
                    <br/>
                    <Link to="/org">Helpdesk Management</Link>
                    <br/>
                    <br/>
                    <a href={`/?session_state=${this.state.data}`}>Open a new window (and copy state)</a>
                    <input type="hidden"  value={this.state.data} name="session_state"/>

                </GovUk>
            )
        }
    }
)