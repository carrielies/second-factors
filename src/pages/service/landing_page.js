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

        componentWillMount() {

            console.dir(this.props.cookie);
            console.dir(this.props.service);
            console.dir(this.props.account);
            let service = this.props.service;
            let cookie = this.props.cookie;
            let resp = service.response_from_gw;
            let request = service.request;

            let enrolment = service.enrolled_users[resp.email];
            if ( !enrolment ) {
                browserHistory.push("/service/enrol")
            }
            else if ( enrolment.trust_id != resp.trust_id ) {
                browserHistory.push("/service/we_dont_trust_you")
            }
        }

        gotoHmrc(e) {
            e.preventDefault();
            let store = new StoreHelper(this.props);
            store.saveCookie( {service_trust_to_level_2: false} );
            this.props.dispatch( {type: 'SAVE_SERVICE', data: {
                request: {
                    name: "Asteroid Gov",
                    auth_level_required: "1",
                    auth_level_desired: "1",
                    redirect_url: "/service/asteroid_gov_landing_page"
                }
            }});

            browserHistory.push("/service_redirect");
        }

        applyForCleaningGrant(e) {
            e.preventDefault();
            let service = this.props.service;
            let resp = service.response_from_gw;
            if ( resp.level == "2") {
                browserHistory.push("/service/apply_for_cleaning_grant");
                return;
            }


            this.props.dispatch( {type: 'SAVE_SERVICE', data: {
                request: {
                    name: "Spacegov",
                    auth_level_required: "1",
                    auth_level_desired: "2",
                    redirect_url: "/service/apply_for_cleaning_grant"
                }
            }});
            browserHistory.push("/service_redirect");

        }


        applyForStationGrant(e) {
            e.preventDefault();
            let service = this.props.service;
            let resp = service.response_from_gw;
            if ( resp.level == "2") {
                browserHistory.push("/service/apply_for_station_grant");
                return;
            }


            this.props.dispatch( {type: 'SAVE_SERVICE', data: {
                request: {
                    name: "Spacegov",
                    auth_level_required: "2",
                    auth_level_desired: "2",
                    redirect_url: "/service/apply_for_station_grant"
                }
            }});
            browserHistory.push("/service_redirect");
        }



        upliftToLevel2(e) {
            e.preventDefault();
            let store = new StoreHelper(this.props);
            store.saveCookie( {service_trust_to_level_2: false} );
            this.props.dispatch( {type: 'SAVE_SERVICE', data: {
                request: {
                    name: "Spacegov",
                    auth_level_required: "2",
                    auth_level_desired: "2",
                    redirect_url: "/service/landing_page"
                }
            }});

            browserHistory.push("/service_redirect");
        }

        upliftToLevel1Desired2(e) {
            e.preventDefault();
            let store = new StoreHelper(this.props);
            store.saveCookie( {service_trust_to_level_2: false} );
            this.props.dispatch( {type: 'SAVE_SERVICE', data: {
                request: {
                    name: "Spacegov",
                    auth_level_required: "1",
                    auth_level_desired: "2",
                    redirect_url: "/service/landing_page"
                }
            }});

            browserHistory.push("/service_redirect");
        }


        render() {
            console.dir(this.props.cookie);
            console.dir(this.props.service);
            let service = this.props.service;
            let resp = service.response_from_gw;
            let request = service.request;
            let cookie = this.props.cookie;
            let account = this.props.account;

            let trust_level = resp.level;

            if ( cookie.service_trust_to_level_2 ) trust_level = "1 (+known fact based uplift)";

            let enrolment = service.enrolled_users[resp.email];
            if ( !enrolment ) {
                return null;
            }


            let level1_content =
                <div>
                    <p>What would you like to do?</p>
                    <a className="button-secondary" href="#" onClick={(e) => this.gotoHmrc(e)}>Apply for a asteroid mining license with asteroid.gov</a><br/><br/>
                    <Link to="/service/my_details" className="button-secondary">View my details</Link>
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.upliftToLevel1Desired2(e)}>Uplift my trust to level 2</a>
                </div>;

            let level1_with_service_uplift_content =
                <div>
                    <p>What would you like to do?</p>
                    <a className="button-secondary" href="#" onClick={(e) => this.gotoHmrc(e)}>Apply for a asteroid mining license with asteroid.gov</a><br/><br/>
                    <button className="button-secondary">Apply for a grant to clean up your launch pad</button><br/><br/>
                    <a href="#" className="button" onClick={(e) => this.upliftToLevel2(e)}>Uplift my trust to level 2</a>
                </div>;

            let level2_content =
                <div>
                    <p>What would you like to do?</p>
                    <a className="button-secondary" href="#" onClick={(e) => this.gotoHmrc(e)}>Apply for a asteroid mining license with asteroid.gov</a><br/><br/>
                    <button className="button-secondary">Apply for grant to clean up your launch pad</button><br/><br/>
                    <button className="button-secondary">Apply for a spaceship</button><br/><br/>
                    <button className="button-secondary">Launch a spaceship</button><br/><br/>
                    <button className="button-secondary">Buy a 200KW mining laser</button>
                </div>;

            let content = null;

            if ( trust_level == "1") {
                content = level1_content;
            }

            if ( trust_level == "1 (+known fact based uplift)") {
                content = level1_with_service_uplift_content;
            }

            if ( trust_level == "2" ) {
                content = level2_content
            }


            return(
                    <Govuk title={service.request.name} hidePhaseBanner={true} header="SPACE.GOV">
                        <div className="spacegov"></div>
                        <Breadcrumb text={`${account.name} (${enrolment.org_name})`} hide_back="true"/>

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
                            </div>
                            <div className="column-one-half">
                                <div className="info">Service trusts you to level {trust_level}
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