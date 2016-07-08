import React from 'react'
import GovUk from '../components/govuk'
import StoreHelper from '../utils/store_helper'
import { browserHistory, Link } from 'react-router'
// import {DropdownList} from 'react-widgets'

import {connect} from 'react-redux'
// import 'react-widgets/lib/less/react-widgets.less'

export default connect((state) => state) (
    class extends React.Component {



        componentDidMount() {
            let store = new StoreHelper(this.props);
            store.clearCookie();
            let users = Object.keys(this.props.server);
            this.selectUser(users[0])
        }

        onSelectUser(e) {
            this.selectUser(e.target.value)
        }

        selectUser(user) {
            let store = new StoreHelper(this.props);
            let account = store.findAccountByEmail(user);

            let data = {
                email: user,
                factors: {
                    password: {
                        secret: account.factors.password.secret
                    }
                }
            };

            this.props.dispatch( {type: 'SAVE_ACCOUNT', data: data })

        }

        render() {

            let users = Object.keys(this.props.server);

            let drop_down = users.map( (u) => {
                return(
                    <option value={u}>{u}</option>
                )
            });

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
                    <Link to="/service">Child Maintenance</Link>
                    <br/>
                    <br/>
                    <Link to="/register">Register for Child Maintenance</Link>
                    <br/>
                    <br/>



                </GovUk>
            )
        }
    }
)