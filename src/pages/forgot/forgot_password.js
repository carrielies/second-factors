import React from 'react'
import {Breadcrumb, Govuk, Field, Question, Server } from '../../components/all'
import QuestionPage from '../../utils/question_page'
import { browserHistory, Link } from 'react-router'
import {findAccountByEmail} from '../../utils/database'
import {saveGG3Session} from '../../reducers/helpers'

import {connect} from 'react-redux'
export default connect((state) => state) (

    class extends QuestionPage {

        constructor(props) {
            super(props);
            this.state = {errors: {}};
        }


        onNext(e) {
            this.validate(e,{
                email: {msg: "Enter your email", summary: "You need to enter your username", regEx: /\w+/}
            }, (props) => {

                findAccountByEmail(props.email).then( (account)=> {
                    if ( !account) {
                        browserHistory.push("/forgot_password_confirm");
                    }
                    else {
                        saveGG3Session(this.props.dispatch, {account: account, level: "1"});
                        browserHistory.push("/forgot_password_confirm");
                    }
                });
            })
        }

        render() {

            let errors = this.state.errors;

            let session = this.props.session.gg3;
            let request = session.request;

            return (

                <Govuk phaseBanner="true">

                    <Breadcrumb text={`Recover password from Government Gateway account`}/>
                    <Question title={`Recover password from Government Gateway account`} button="Sign in" errors={errors}>
                        <Field ref="email" name="email" labelText="Email" errors={errors} value={session.email}/>
                    </Question>

                    <a href="#" className="button" onClick={(e) => this.onNext(e)}>Reset password</a>

                </Govuk>
            )
        }
    }
)