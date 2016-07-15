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

        componentWillMount() {

            console.dir(this.props.cookie);
            console.dir(this.props.service);
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
            else if ( (request.auth_level_desired == "2" && resp.level == "1") && !cookie.service_trust_to_level_2  ) {
                browserHistory.push("/service/we_kind_of_trust_you")
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
                        <Content title={`Hello ${resp.name}`}>
                        </Content>

                        <table>
                            <thead>
                            <tr>
                                <th scope="col">License number</th>
                                <th scope="col">Organisation</th>
                                <th scope="col">Mission Statement</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{enrolment.space_trading_license_number}</td>
                                <td >{enrolment.org_name}</td>
                                <td >{enrolment.mission}</td>
                            </tr>
                            </tbody>
                        </table>
                        <Content>

                            <h1 className="heading-small">We trust you to level {trust_level}</h1>
                            <br/>
                            {content}

                        </Content>
                        <hr/>
                        <BehindTheScenes/>

                    </Govuk>
            );


            // return (
            //     <Govuk title={service.request.name} hidePhaseBanner={true} header="SPACE.GOV">
            //         <div className="spacegov"></div>
            //         {content}
            //         <hr/>
            //
            //         <a href="#" onClick={(e) => this.upliftToLevel2(e)}>Uplift to level 2</a>
            //         <br/>
            //         <br/>
            //         <a href="#" onClick={(e) => this.upliftToLevel1Desired2(e)}>Uplift if possible</a>
            //         <br/>
            //         <br/>
            //         <a href="#" onClick={(e) => this.gotoHmrc(e)}>Goto HMRC</a>
            //
            //         <hr/>
            //
            //         <details>
            //
            //             <summary><span class="summary">Behind the scenes stuff...</span></summary>
            //
            //             <div class="panel panel-border-narrow">
            //
            //                 <h1 className="heading-small">OpenId/SAML Request issued by service</h1>
            //                 <div className="grid-row">
            //                     <div className="column-two-thirds">
            //                         <textarea ref="request" cols="70" rows="6" value={JSON.stringify(request, null, 2)}/>
            //                     </div>
            //                     <div className="column-one-third">
            //                     </div>
            //
            //                 </div>
            //                 <h1 className="heading-small">Gateway Response</h1>
            //                 <div className="grid-row">
            //                     <div className="column-two-thirds">
            //                         <textarea ref="request" cols="70" rows="6" value={JSON.stringify(resp, null, 2)}/>
            //                     </div>
            //                     <div className="column-one-third">
            //                     </div>
            //                 </div>
            //                 <h1 className="heading-small">Service enrolments</h1>
            //                 <div className="grid-row">
            //                     <div className="column-two-thirds">
            //                         <textarea ref="request" cols="70" rows="6" value={JSON.stringify(service.enrolled_users, null, 2)}/>
            //                     </div>
            //                     <div className="column-one-third">
            //                     </div>
            //                 </div>
            //
            //             </div>
            //
            //         </details>
            //     </Govuk>
            // );

        }
        
    }
)