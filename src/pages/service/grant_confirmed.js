import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import Question from '../../components/question'
import QuestionPage from '../../utils/question_page'
import StoreHelper from '../../utils/store_helper'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import JSONTree from 'react-json-tree'
import Field from '../../components/field'
import BehindTheScenes from '../../components/service_behind_the_scenes'
import Breadcrumb from '../../components/breadcrumb'

export default connect((state) => state) (
    class extends QuestionPage {

        render() {
            let account = this.props.account;
            let service = this.props.service;
            let resp = service.response_from_gw;
            let request = service.request;
            let cookie = this.props.cookie;
            let trust_level = resp.level;
            let enrolment = service.enrolled_users[resp.email];

            return (
                <Govuk title={service.request.name} hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>
                    <Breadcrumb text={`${account.name} (${enrolment.org_name})`} back="/service/landing_page"/>
                    <h1 className="heading-medium">Grant appliction submitted</h1>
                    <p>We will get back to you, once we have processed your application.</p>
                    <p>If you need to contact us, please quote the following reference</p>
                    <div className="password_box">QYTYTFHGGH55</div>
                    <br/>
                    <Link to="/service/landing_page" className="button">Continue</Link>
                    <hr/>
                    <BehindTheScenes/>
                </Govuk>
            )
        }
    }
)