import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Content from '../../components/content'
import React from 'react'
import { browserHistory, Link } from 'react-router'


import {connect} from 'react-redux'
export default connect((state) => state) (

    class extends QuestionPage {

        componentDidMount() {
            this.onNext();
        }

        onNext(e) {
            if(e) e.preventDefault();

            let session = this.props.session.gg3;
            let request = session.request;
            let account = session.account;

            if( session.level === "1" && request.auth_level_desired === "2" ) {
                browserHistory.push("/your_auth_factors");
            }
            else {
                // this.props.dispatch( {type: 'SAVE_ACCOUNT', data: {two_fa_passed: cookie.level === "2" }});
                browserHistory.push("/logged_in");
            }
        }



        render() {

            let session = this.props.session.gg3;
            let request = session.request;
            let account = session.account;

            return(
                <Govuk>

                    <Content title={`Continue to ${request.name} ?`}>
                        <p>You are currently logged in as {account.email}.  Do you want to continue to {request.name} as this user ?</p>

                        <a href="#" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                        <br/>
                        <br/>
                        <a href="#">Log in as a different user</a>

                    </Content>

                </Govuk>
            )
        }
    }
)