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
import {saveGG3Session, saveSpacegovSession} from '../../reducers/helpers'
import Trust from '../../components/trust'
import {findEnrolment} from '../../utils/spacegov_db'

export default connect((state) => state) (
    class extends QuestionPage {
        constructor(props) {
            super(props);
            this.state = {enrolment: {}};
            let resp = props.session.gg3.response;

            findEnrolment(resp.gg_id).then( (enrolment) =>{
                if ( !enrolment ) {
                    browserHistory.push("/service/enrol");
                    return;
                }
                else if ( enrolment.trust_id != resp.trust_id || enrolment.trust_id_level_2 != resp.trust_id_level_2) {
                    //Note: We only care about level 1 trust at this point
                    browserHistory.push("/service/we_dont_trust_you");
                    return;
                }

                saveSpacegovSession(this.props.dispatch, {enrolment});
            })
        }


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
                    <Trust required="2" desired="2"/>
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