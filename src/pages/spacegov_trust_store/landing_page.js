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
import {findEnrolment} from '../../utils/spacegov_db'
import {saveGG3Session, saveSpacegovSession} from '../../reducers/helpers'


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
                else if ( enrolment.trust_id != resp.trust_id ) {
                    browserHistory.push("/service/we_dont_trust_you");
                    return;
                }

                saveSpacegovSession(this.props.dispatch, {enrolment});
            })
        }


        gotoAsteroidgov(e) {
            e.preventDefault();
            let request = {
                name: "Asteroid Gov",
                auth_level_required: "1",
                auth_level_desired: "2",
                redirect_url: "/service/asteroid_gov_landing_page"
            };
            saveGG3Session(this.props.dispatch, {request});
            browserHistory.push("/service_redirect");
        }

        applyForCleaningGrant(e) {
            e.preventDefault();
            let gg3 = this.props.session.gg3;
            let resp = gg3.response;
            let request = {
                name: "Spacegov",
                auth_level_required: "1",
                auth_level_desired: "2",
                redirect_url: "/service/apply_for_cleaning_grant"
            };
            saveGG3Session(this.props.dispatch, {request});
            if ( resp.level != "2") {
                browserHistory.push("/service_redirect");
            }
            else {
                browserHistory.push("/service/apply_for_cleaning_grant");
            }
        }


        applyForStationGrant(e) {
            e.preventDefault();
            let gg3 = this.props.session.gg3;
            let resp = gg3.response;
            if ( resp.level == "2") {
                browserHistory.push("/service/apply_for_station_grant");
                return;
            }
            let request = {
                name: "Spacegov",
                auth_level_required: "2",
                auth_level_desired: "2",
                redirect_url: "/service/apply_for_station_grant"
            };
            saveGG3Session(this.props.dispatch, {request});
            browserHistory.push("/service_redirect");
        }


        render() {
            let session = this.props.session.spacegov;
            let gg3 = this.props.session.gg3;
            let request = gg3.request;
            let resp = gg3.response;

            let enrolment = session.enrolment;
            if ( !enrolment ) {
                return null;
            }

            return(
                    <Govuk title="Spacegov" hidePhaseBanner={true} header="SPACE.GOV">
                        <div className="spacegov"></div>
                        <Breadcrumb text={`${resp.name} (${enrolment.org_name})`} hide_back="true"/>

                        <div className="grid-row">
                            <div className="column-one-half">
                                <h1 className="heading-medium">What would you like to do?</h1>
                                <Link to="/service/my_details" className="button">View my details</Link>
                                <br/>
                                <br/>
                                <a href="#" className="button" onClick={(e) => this.applyForCleaningGrant(e)}>Apply for a grant to clean your station</a>
                                <br/>
                                <br/>
                                <a href="#" className="button" onClick={(e) => this.applyForStationGrant(e)}>Apply for a grant to create a new station</a>
                                <br/>
                                <br/>
                                <a href="#" className="button" onClick={(e) => this.gotoAsteroidgov(e)}>Goto asteroid gov</a>

                            </div>
                            <div className="column-one-half">
                                <div className="info">Service trusts you to level {resp.level}
                                    <br/>
                                    <br/>
                                    <ul className="list-bullet">
                                        <li>View my details: <br/>Requires that you are logged in</li>
                                        <br/>
                                        <li>Station, cleaning grant: <br/>Would ideally like you to be at trust level 2, but will accept level 1</li>
                                        <br/>
                                        <li>New Station grant: <br/>Requires you to be at trust level 2</li>

                                    </ul>

                                </div>
                            </div>
                        </div>

                        <hr/>
                        <BehindTheScenes/>

                    </Govuk>
            );


        }
        
    }
)