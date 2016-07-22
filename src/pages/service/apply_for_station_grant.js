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
import {saveGG3Session} from '../../reducers/helpers'

export default connect((state) => state) (
    class extends QuestionPage {


        onNext(e) {
            e.preventDefault();
            let request = {
                name: "Spacegov",
                auth_level_required: "2",
                auth_level_desired: "2",
                redirect_url: "/service/grant_confirmed"
            };
            saveGG3Session(this.props.dispatch, {request});
            browserHistory.push("/service_redirect");
        }


        render() {
            let enrolment = this.props.session.spacegov.enrolment;

            return (
                <Govuk title="Spacegov" hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>

                    <Breadcrumb text={`${enrolment.name} (${enrolment.org_name})`} back="/service/landing_page"/>
                    <Question title="Apply for station grant" para="We need some details about your space station.">

                        <Field ref="name" name="org" labelText="Your spacestation name"/>
                        <Field ref="location" name="location" labelText="Your galactic location"/>
                        <Field ref="spaceid" name="spaceid" labelText="Your spacestation identifier"/>
                        <Field ref="costcentre" name="costcentre" labelText="Your cost centre"/>
                    </Question>
                    <p>When you click apply, we will ask you to re-prove your identify</p>
                    <a href="#" className="button" onClick={(e) => this.onNext(e)}>Apply</a>
                    <hr/>
                    <BehindTheScenes/>
                </Govuk>

            )
        }
    }
)