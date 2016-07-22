import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import Question from '../../components/question'
import QuestionPage from '../../utils/question_page'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import JSONTree from 'react-json-tree'
import Field from '../../components/field'
import BehindTheScenes from '../../components/service_behind_the_scenes'
import Breadcrumb from '../../components/breadcrumb'

export default connect((state) => state) (
    class extends QuestionPage {

        render() {
            let enrolment = this.props.session.spacegov.enrolment;

            return (
                <Govuk title="Spacegov" hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>
                    <Breadcrumb text={`${enrolment.name} (${enrolment.org_name})`} back="/service/landing_page"/>
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