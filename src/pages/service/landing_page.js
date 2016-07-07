import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'

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


        render() {
            console.dir(this.props.cookie);
            console.dir(this.props.service);
            let service = this.props.service;
            let resp = service.response_from_gw;

            if( service.trusted_hashes.indexOf(resp.trust_id) != -1 ) {
                return(
                    <Govuk title={service.request.name}>
                        <Content title={`Welcome back ${resp.name}`}>
                            <p>
                                You last logged into {service.name} on {resp.last_logged_in}
                            </p>

                            { service.request.auth_level_desired == "2" && resp.level == "1" ?
                                <p>We kind of trust you, but we need to double check your identity</p> :
                                <p>We trust you!</p>
                            }
                            <br/>
                            <br/>
                            <a href="#" className="button" onClick={(e) => this.upliftToLevel2(e)}>Uplift to level 2</a>
                            <br/>
                            <br/>
                            <a href="#" className="button" onClick={(e) => this.upliftToLevel1Desired2(e)}>Uplift if possible</a>
                            <br/>
                            <br/>
                            <a href="#" className="button" onClick={(e) => this.gotoHmrc(e)}>Go to HMRC</a>

                        </Content>
                    </Govuk>
                )
            }
            else {
                return(
                    <Govuk title={service.request.name}>
                        <Content title={`Welcome back ${resp.name}`}>
                            <p>
                                You last logged into {service.name} on {resp.last_logged_in}
                            </p>

                            <p>We need to re-trust you </p>

                            <br/>
                            <br/>
                            <a href="#" onClick={(e) => upliftToLevel2(e)}>Uplift to level 2</a>
                            <br/>
                            <br/>
                            <a href="#" className="button" onClick={(e) => this.upliftToLevel1Desired2(e)}>Uplift if possible</a>
                            <br/>
                            <br/>
                            <a href="#" className="button" onClick={(e) => this.goToHmrc(e)}>Uplift if possible</a>


                        </Content>
                    </Govuk>
                )

            }



        }
        
    }
)