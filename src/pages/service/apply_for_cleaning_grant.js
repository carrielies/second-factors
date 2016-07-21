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

        level_1() {
            let enrolment = this.props.session.spacegov.enrolment;

            return(
                <Govuk title="Spacegov" hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>

                    <Breadcrumb text={`${enrolment.name} (${enrolment.org_name})`} back="/service/landing_page"/>

                    <Content title="Apply for cleaning grant">
                            <p>As you were unable to authenticate with a second factor, you will need to visit
                                your local Spacegov office.</p>
                    </Content>
                    <Link to="/service/landing_page" className="button">Continue</Link>
                    <hr/>
                    <BehindTheScenes/>
                </Govuk>
            )
        }

        render() {
            let enrolment = this.props.session.spacegov.enrolment;
            let gg3 = this.props.session.gg3;
            let resp = gg3.response;

            if ( resp.level == "1") {
                return this.level_1();
            }

            return (
                <Govuk title="Spacegov" hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>

                    <Breadcrumb text={`${enrolment.name} (${enrolment.org_name})`} back="/service/landing_page"/>
                    <Question title="Apply for cleaning grant" para="We need some details about your space station.">

                        <Field ref="name" name="org" labelText="Your spacestation name"/>
                        <Field ref="location" name="location" labelText="Your galactic location"/>
                        <Field ref="spaceid" name="spaceid" labelText="Your spacestation identifier"/>
                        <Field ref="costcentre" name="costcentre" labelText="Your cost centre"/>
                    </Question>
                    <Link to="/service/grant_confirmed" className="button">Apply</Link>
                    <hr/>
                    <BehindTheScenes/>
                </Govuk>

            )
        }
    }
)