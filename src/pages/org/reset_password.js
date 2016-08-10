import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import Question from '../../components/question'
import QuestionPage from '../../utils/question_page'
import Field from '../../components/field'
import {connect} from 'react-redux'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory, Link } from 'react-router'
import {saveHelpdeskSession} from '../../reducers/helpers'
import {updateAccount, applyInteraction} from '../../utils/database'

    
export default connect((state) => state) (
    class extends QuestionPage {
        constructor(props) {
            super(props);
            let new_password = "monday12";
            this.state = { new_password };
            let session = this.props.session.org;
            let account = session.account;
            account.factors.password.secret = new_password;
            account.factors.password.force_reset = true;
            applyInteraction( account, "organisation", `Password reset` );

            updateAccount( account )
        }


        render() {
            let gg3 = this.props.session.gg3;

            let session = this.props.session.org;
            let account = session.account;
            return(
                <Govuk title={session.org_name}>
                    <Breadcrumb text={`${account.name}`} back="/org/manage_account"/>
                    <Content title="Reset password">
                        <p>
                            The customer will be asked to change this password, the next time they sign in.
                        </p>
                        <br/>
                        <span className="password_box">{this.state.new_password}</span>
                        <br/>
                        <br/>
                        <br/>
                        <Link to="/org/manage_account" className="button">Continue</Link>

                    </Content>
                </Govuk>
            )
        }
    }
)