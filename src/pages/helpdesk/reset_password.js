import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import Question from '../../components/question'
import Field from '../../components/field'
import StoreHelper from '../../utils/store_helper'
import {connect} from 'react-redux'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory, Link } from 'react-router'
import generatePassword from 'password-generator'
import {saveHelpdeskSession} from '../../reducers/store_helpers'
    
export default connect((state) => state) (
    class extends React.Component {
        constructor(props) {
            super(props);
            let new_password = generatePassword();
            this.state = { new_password };
            let session = this.props.session.helpdesk;
            let account = session.account;
            account.factors.password.secret = new_password;

            let actions = session.actions;
            actions.push("Password reset");

            saveHelpdeskSession(props.dispatch, {account, account_changed: true, actions});
        }


        render() {
            return(
                <Govuk title="Helpdesk">
                    <Content title="Reset password">
                        <p>
                            The customer will be asked to change this password, the next time they sign in.
                        </p>
                        <br/>
                        <span className="password_box">{this.state.new_password}</span>
                        <br/>
                        <br/>
                        <br/>
                        <Link to="/helpdesk/manage_account" className="button">Continue</Link>

                    </Content>
                </Govuk>
            )
        }
    }
)