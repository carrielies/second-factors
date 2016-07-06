import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Content from '../../components/content'
import React from 'react'
import Fingerprint from '../../components/fingerprint'
import Server from '../../components/server'
import { browserHistory, Link } from 'react-router'
import Breadcrumb from '../../components/breadcrumb'


import {connect} from 'react-redux'
export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            e.preventDefault();
            let cookie = this.props.cookie;
            let service = this.props.service.request;

            if( cookie.level === "1" && service.auth_level_desired === "2" ) {
                browserHistory.push("/your_auth_factors");
            }
            else {
                this.props.dispatch( {type: 'SAVE_ACCOUNT', data: {two_fa_passed: cookie.level === "2" }});
                browserHistory.push("/logged_in");
            }
        }



        render() {

            let cookie = this.props.cookie;
            let service = this.props.service;

            return(
                <Govuk>

                    <Content title={`Continue to ${service.request.name} ?`}>
                        <p>You are currently logged in as {cookie.email}.  Do you want to continue to {service.request.name} as this user ?</p>

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