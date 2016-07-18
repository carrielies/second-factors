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

export default connect((state) => state) (
    class extends QuestionPage {

        onNext(e) {

            this.validate(e, {
                secret: {msg: "You need to enter an amount", summary: "Enter your station tax bill", regEx: /\w+/},
            }, (props) => {

                let store = new StoreHelper(this.props);
                let service = store.service;
                let resp = service.response_from_gw;
                let enrolment = service.enrolled_users[resp.email];
                enrolment.trust_id = resp.trust_id;
                service.enrolled_users[resp.email] = enrolment;
                store.saveService( service );
                browserHistory.push("/service/landing_page")
            })
        }

        render() {
            console.dir(this.props.cookie);
            console.dir(this.props.service);
            let service = this.props.service;
            let resp = service.response_from_gw;
            let request = service.request;
            let enrolment = service.enrolled_users[resp.email];

            return(
                <Govuk title={service.request.name} hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>
                    <Question title={`Hello ${resp.name}`} errors={this.state.errors}>
                        <p>We need to check that it really is you.</p>
                        <Field ref="secret" name="secret" labelText="What was your last station tax bill to the nearest pound ?" errors={this.state.errors}/>
                        <a href="#" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    </Question>
                </Govuk>
            );

        }

    }
)