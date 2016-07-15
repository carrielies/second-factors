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
                license: {msg: "Enter your license number", summary: "You need to enter your license number", regEx: /\w+/},
            }, (props) => {

                let store = new StoreHelper(this.props);
                let service = store.service;
                let resp = service.response_from_gw;
                let enrolment = service.enrolled_users[resp.email];

                if ( enrolment.space_trading_license_number == props.license ) {
                    store.saveCookie( {service_trust_to_level_2: true} );
                    browserHistory.push("/service/landing_page")
                }
                else {
                    let errors = {};
                    errors["license"] = {msg: "The license number entered does not match our records", summary: "You need to enter your correct license number", regEx: /\w+/},
                    this.setState( {errors})
                }
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
                    <Question title={`Hello ${resp.name} of ${enrolment.org_name}`} errors={this.state.errors}>
                        <p>As you were unable to provide a second factor, we need to check that it really is you.</p>
                        <Field ref="license" name="license" labelText="Your secret space trading licence number" labelHint="Keep this a secret" errors={this.state.errors}/>
                        <a href="#" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    </Question>
                </Govuk>
            );

        }

    }
)