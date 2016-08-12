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
import {saveEnrolment} from '../../utils/asteroidgov_db'

export default connect((state) => state) (
    class extends QuestionPage {

        license() {
            return 'ASTROxxxxxxxx'.replace(/[xy]/g, function(c) {
                let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16).toUpperCase();
            });

        }

        enrollUser(e) {

            this.validate(e, {
                org: {msg: "Enter your organisation name", summary: "You need to enter your organisation name", regEx: /\w+/},
            }, (props) => {

                let resp = this.props.session.gg3.response;
                let licenseNumber = this.license();

                let enrolment = {
                    email: resp.email,
                    name: resp.name,
                    gg_id: resp.gg_id,
                    trust_id: resp.trust_id,
                    trust_id_level_2: resp.trust_id_level_2,
                    asteriod_mining_license_number: licenseNumber,
                    org_name: props.org
                };

                saveEnrolment(enrolment);
                this.setState( {licenseNumber: licenseNumber} );
            })
        }

        yourLicenseNumber() {
            let gg3 = this.props.session.gg3;
            let request = gg3.request;
            return(
                <Govuk title="Asteroidgov" hidePhaseBanner={true} header="ASTEROID.GOV">
                    <div className="asteroidgov"></div>
                    <h1 className="heading-medium">Your asteroid mining license number</h1>
                    <div className="password_box">{this.state.licenseNumber}</div>
                    <br/>
                    <p>You will need to make a not of this number, as you may need it in the future</p>
                    <br/>
                    <Link className="button" to="/asteroid_gov/landing_page">Continue</Link>
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
                    <Govuk title="Asteroidgov" hidePhaseBanner={true} header="ASTEROID.GOV">
                        <div className="asteroidgov"></div>
                        <Question title={`Hello ${resp.name}`} errors={this.state.errors}>
                            <p>As this is the first time you have used this service, we need to get some details from
                                you.</p>
                            <Field ref="org" name="org" labelText="Your mining organisation name" errors={this.state.errors}/>
                            <a href="#" className="button" onClick={(e) => this.enrollUser(e)}>Enrol for Asteroidgov</a>
                        </Question>
                        <hr/>
                        <BehindTheScenes/>
                    </Govuk>
                );
            }

        }

    }
)