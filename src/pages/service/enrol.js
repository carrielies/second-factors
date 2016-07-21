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
import {saveEnrolment} from '../../utils/spacegov_db'

export default connect((state) => state) (
    class extends QuestionPage {

        license() {
            return 'SPxxxxxxxx'.replace(/[xy]/g, function(c) {
                let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16).toUpperCase();
            });

        }

        enrollUser(e) {

            this.validate(e, {
                org: {msg: "Enter your organisation name", summary: "You need to enter your organisation name", regEx: /\w+/},
                mission: {msg: "Enter your mission statement", summary: "You need to enter your mission statement", regEx: /\w+/},
            }, (props) => {

                let resp = this.props.session.gg3.response;
                let licenseNumber = this.license();

                let enrolment = {
                    email: resp.email,
                    name: resp.name,
                    trust_id: resp.trust_id,
                    space_trading_license_number: licenseNumber,
                    org_name: props.org,
                    mission: props.mission
                };

                saveEnrolment(enrolment);
                this.setState( {licenseNumber: licenseNumber} );
            })
        }

        yourLicenseNumber() {
            let gg3 = this.props.session.gg3;
            let request = gg3.request;
            return(
                <Govuk title={request.name} hidePhaseBanner={true} header="SPACE.GOV">
                    <h1 className="heading-medium">Your license number</h1>
                    <div className="password_box">{this.state.licenseNumber}</div>
                    <br/>
                    <p>You will need to make a not of this number, as you may need it in the future</p>
                    <br/>
                    <Link className="button" to="/service/landing_page">Continue</Link>
                </Govuk>
            )
        }

        render() {


            let session = this.props.session.spacegov;
            let gg3 = this.props.session.gg3;
            let resp = gg3.response;
            let request = gg3.request;

            if ( this.state.licenseNumber) {
                return this.yourLicenseNumber();
            }
            else {
                return (
                    <Govuk title={request.name} hidePhaseBanner={true} header="SPACE.GOV">
                        <div className="spacegov"></div>
                        <Question title={`Hello ${resp.name}`} errors={this.state.errors}>
                            <p>As this is the first time you have used this service, we need to get some details from
                                you.</p>
                            <Field ref="org" name="org" labelText="Your organisation name" errors={this.state.errors}/>
                            <Field ref="mission" name="mission" labelText="Your mission statement"
                                   errors={this.state.errors} labelHint="To boldy go, where no man has gone before"/>
                            <a href="#" className="button" onClick={(e) => this.enrollUser(e)}>Enrol for Spacegov</a>
                        </Question>
                        <hr/>
                        <BehindTheScenes/>
                    </Govuk>
                );
            }

        }

    }
)