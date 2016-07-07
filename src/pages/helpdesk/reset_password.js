import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import Question from '../../components/question'
import Field from '../../components/field'
import {connect} from 'react-redux'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory, Link } from 'react-router'
import generatePassword from 'password-generator'
    
export default connect((state) => state) (
    class extends React.Component {
        constructor(props) {
            super(props);
            let new_password = generatePassword();
            this.state = { new_password }

            let account = props.helpdesk.account;
            account.factors.password.secret =

            props.dispatch( { type: 'SAVE_HELPDESK', data: {account}})
        }


        render() {
            return(
                <Govuk>
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