import React from 'react'
import {Breadcrumb, Govuk, Field, Question, Server } from '../../components/all'
import QuestionPage from '../../utils/question_page'
import { browserHistory, Link } from 'react-router'
import {findAccountByEmail} from '../../utils/database'
import {saveGG3Session} from '../../reducers/helpers'

import {connect} from 'react-redux'
export default connect((state) => state) (

    class extends QuestionPage {

        render() {

            let errors = this.state.errors;

            let session = this.props.session.gg3;
            let account = session.account;

            let resetEmail = null
            if ( account ) {
                resetEmail =
                    <div className="email">
                         <div className="banner"></div>
                         <p>
                             Hello,<br/><br/>

                             A request has been received to reset your password.  If you follow the link below you will be able to reset your password.
                             <br/><br/>
                             <a href="#next">https://gg3.gov.uk/resetpassword?ref=876876868787</a>
                             <br/>
                             <br/>
                             The password reset request is valid for the next 24 hours.

                         </p>
                    </div>
            }

            return (

                <Govuk phaseBanner="true">

                    <Breadcrumb text={`Recover password from Government Gateway account`}/>
                    <h1 className="heading-medium">Reset password</h1>
                    <p>If the email you entered is associated with an account in our records, you will receive an email from us with instructions for resetting your password.</p>

                    <p>If you don`t receive this email, please check your junk mail folder or visit our Help pages to contact Customer Service for futher assistance.</p>
                    <br/>
                    <Link to="/" className="button">Finish</Link>
                    <br/>
                    {resetEmail}
                </Govuk>

            )
        }
    }
)