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

        enrollUser(e) {

            this.validate(e, {
                license: {msg: "Enter your license number", summary: "You need to enter your license number", regEx: /\w+/},
                org: {msg: "Enter your organisation name", summary: "You need to enter your organisation name", regEx: /\w+/},
                mission: {msg: "Enter your mission statement", summary: "You need to enter your mission statement", regEx: /\w+/},
            }, (props) => {

                let store = new StoreHelper(this.props);
                let service = store.service;
                let resp = service.response_from_gw;

                let enrolment = {
                    trust_id: resp.trust_id,
                    space_trading_license_number: props.license,
                    org_name: props.org,
                    mission: props.mission
                };

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

            return(
                <Govuk title={service.request.name} hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>
                    <Question title={`Hello ${resp.name}`} errors={this.state.errors}>
                        <p>As this is the first time you have used this service, we need to get some details from you.</p>
                        <Field ref="license" name="license" labelText="Your secret space trading licence number" labelHint="Keep this a secret" errors={this.state.errors}/>
                        <Field ref="org" name="org" labelText="Your organisation name" errors={this.state.errors}/>
                        <Field ref="mission" name="mission" labelText="Your mission statement" errors={this.state.errors} labelHint="To boldy go, where no man has gone before"/>
                        <a href="#" className="button" onClick={(e) => this.enrollUser(e)}>Enrol for Spacegov</a>
                    </Question>
                    <hr/>
                    <BehindTheScenes/>
                </Govuk>
            );

        }

    }
)