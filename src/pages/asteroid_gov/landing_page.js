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
import {findEnrolment} from '../../utils/asteroidgov_db'
import {saveAsteroidgovSession} from '../../reducers/helpers'

export default connect((state) => state) (
    class extends QuestionPage {

        constructor(props) {
            super(props);
            this.state = {enrolment: {}};
            let resp = props.session.gg3.response;

            findEnrolment(resp.gg_id).then( (enrolment) =>{
                if ( !enrolment ) {
                    browserHistory.push("/asteroid_gov/enrol");
                    return;
                }
                else if ( enrolment.trust_id != resp.trust_id ) {
                    browserHistory.push("/asteroid_gov/we_dont_trust_you");
                    return;
                }

                saveAsteroidgovSession(this.props.dispatch, {enrolment});
            })
        }

        render() {
            let session = this.props.session.asteroidgov;
            let gg3 = this.props.session.gg3;
            let request = gg3.request;
            let resp = gg3.response;

            return(
                <Govuk title="Asteroidgov" hidePhaseBanner={true} header="ASTEROID.GOV">
                    <div className="asteroidgov"></div>
                    <Content title={`Hello ${resp.name}`}>

                        <h1 className="heading-small">We trust you to level {resp.level}</h1>
                    </Content>
                    <hr/>
                    <BehindTheScenes/>

                </Govuk>
            )

        }


    }
)