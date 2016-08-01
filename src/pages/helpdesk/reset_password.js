import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import Question from '../../components/question'
import QuestionPage from '../../utils/question_page'
import Field from '../../components/field'
import {connect} from 'react-redux'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory, Link } from 'react-router'
import generatePassword from 'password-generator'
import {saveHelpdeskSession} from '../../reducers/helpers'
import {updateAccount, saveInteraction} from '../../utils/database'

    
export default connect((state) => state) (
    class extends QuestionPage {
        constructor(props) {
            super(props);
            let new_password = generatePassword();
            this.state = { new_password };
            let session = props.session.helpdesk;
            let account = session.account;
            account.factors.password.secret = new_password;

            if ( ! session.id_proven && !session.trust_id_changed) {
                account.trust_id = this.trust_id();
                saveHelpdeskSession( this.props.dispatch, {trust_id_changed: true});
            }


            updateAccount( account )
        }


        render() {
            let session = this.props.session.helpdesk;
            let account = session.account;

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