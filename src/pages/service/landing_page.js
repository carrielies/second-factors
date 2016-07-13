import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import StoreHelper from '../../utils/store_helper'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import JSONTree from 'react-json-tree'

export default connect((state) => state) (
    class extends React.Component {

        gotoHmrc(e) {
            e.preventDefault();
            this.props.dispatch( {type: 'SAVE_SERVICE', data: {
                request: {
                    name: "Hmrc",
                    auth_level_required: "1",
                    auth_level_desired: "2",
                    redirect_url: "/service/landing_page"
                }
            }});

            browserHistory.push("/service_redirect");
        }

        upliftToLevel2(e) {
            e.preventDefault();
            this.props.dispatch( {type: 'SAVE_SERVICE', data: {
                request: {
                    name: "Child Maintenance",
                    auth_level_required: "2",
                    auth_level_desired: "2",
                    redirect_url: "/service/landing_page"
                }
            }});

            browserHistory.push("/service_redirect");
        }

        upliftToLevel1Desired2(e) {
            e.preventDefault();
            this.props.dispatch( {type: 'SAVE_SERVICE', data: {
                request: {
                    name: "Child Maintenance",
                    auth_level_required: "1",
                    auth_level_desired: "2",
                    redirect_url: "/service/landing_page"
                }
            }});

            browserHistory.push("/service_redirect");
        }

        enrollUser(e) {
            e.preventDefault();
            let store = new StoreHelper(this.props);
            let service = store.service;
            let resp = service.response_from_gw;
            service.enrolled_users[resp.email] = resp.trust_id;
            store.saveService( service );
        }

        enrollment() {
            let service = this.props.service;
            let resp = service.response_from_gw;

            return(
                <Content>
                    <h1 className="heading-medium">This is the first time you have visited {service.name}</h1>
                    <p>Typically the service would ask for some known facts, to prove their identity</p>
                    <a href="#" className="button" onClick={(e) => this.enrollUser(e)}>Enroll {resp.name}</a>
                </Content>
            )
        }

        weTrustYou() {
            let service = this.props.service;
            let resp = service.response_from_gw;

            return(
                    <Content>
                        <p>
                            You last logged into {service.request.name} on {resp.last_logged_in}
                        </p>
                        <p>We trust you</p>
                    </Content>
            )
        }

        weKindOfTrustYou() {
            let service = this.props.service;
            let resp = service.response_from_gw;

            return(
                    <Content>
                        <p>
                            You last logged into {service.request.name} on {resp.last_logged_in}
                        </p>
                        <p>We kind of trust you, but we need to ask some questions as you were unable complete second factor
                        authentication</p>
                    </Content>
            )
        }

        weDontTrustYou() {
            let service = this.props.service;
            let resp = service.response_from_gw;

            return(
                <Content>
                    <p>
                        You last logged into {service.request.name} on {resp.last_logged_in}
                    </p>
                    <p>We don't trust you as your trust_id has changed.  We need to ask you some questions to reestablish trust.</p>
                    <a href="#" className="button" onClick={(e) => this.enrollUser(e)}>Trust {resp.name}</a>
                </Content>
            )
        }

        render() {
            console.dir(this.props.cookie);
            console.dir(this.props.service);
            let service = this.props.service;
            let resp = service.response_from_gw;
            let request = service.request;

            let trust = service.enrolled_users[resp.email];

            let content = null;
            if ( ! trust ) content = this.enrollment();

            else if ( trust == resp.trust_id ) {

                if ( service.request.auth_level_desired == "2" && resp.level == "1" ) {
                    content = this.weKindOfTrustYou();
                }
                else {
                    content = this.weTrustYou();
                }

            }
            else {
                content = this.weDontTrustYou();
            }

            return (
                <Govuk title={service.request.name}>
                    {content}
                    <hr/>

                    <a href="#" onClick={(e) => this.upliftToLevel2(e)}>Uplift to level 2</a>
                    <br/>
                    <br/>
                    <a href="#" onClick={(e) => this.upliftToLevel1Desired2(e)}>Uplift if possible</a>
                    <br/>
                    <br/>
                    <a href="#" onClick={(e) => this.gotoHmrc(e)}>Goto HMRC</a>

                    <hr/>

                    <details>

                        <summary><span class="summary">Behind the scenes stuff...</span></summary>

                        <div class="panel panel-border-narrow">

                            <h1 className="heading-small">OpenId/SAML Request issued by service</h1>
                            <div className="grid-row">
                                <div className="column-two-thirds">
                                    <textarea ref="request" cols="70" rows="6" value={JSON.stringify(request, null, 2)}/>
                                </div>
                                <div className="column-one-third">
                                </div>

                            </div>
                            <h1 className="heading-small">Gateway Response</h1>
                            <div className="grid-row">
                                <div className="column-two-thirds">
                                    <textarea ref="request" cols="70" rows="6" value={JSON.stringify(resp, null, 2)}/>
                                </div>
                                <div className="column-one-third">
                                </div>
                            </div>
                            <h1 className="heading-small">Service enrolments</h1>
                            <div className="grid-row">
                                <div className="column-two-thirds">
                                    <textarea ref="request" cols="70" rows="6" value={JSON.stringify(service.enrolled_users, null, 2)}/>
                                </div>
                                <div className="column-one-third">
                                </div>
                            </div>

                        </div>

                    </details>
                </Govuk>
            );

        }
        
    }
)