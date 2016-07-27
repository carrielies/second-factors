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

        onNext(e) {
            e.preventDefault();

            let request = {
                name: "Credential Management",
                auth_level_required: "1",
                auth_level_desired: "1",
                redirect_url: "/credential/landing_page",
                calling_service_request: {
                    name: "Spacegov",
                    auth_level_required: "1",
                    auth_level_desired: "1",
                    redirect_url: "/service/landing_page",
                }
            };
            saveGG3Session(this.props.dispatch, {request});
            browserHistory.push("/service_redirect");

        }

        render() {

            let enrolment = this.props.session.spacegov.enrolment;
            let session = this.props.session.spacegov;
            let gg3 = this.props.session.gg3;
            let request = gg3.request;
            let resp = gg3.response;


            return(

                <Govuk title="Spacegov" hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>

                    <Breadcrumb text={`${resp.name} (${enrolment.org_name})`}/>

                    <Content title="Your details">

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
                    </Content>
                    <br/>
                    <Link to="/service/landing_page" className="button">Continue</Link>
                    <br/>
                    <br/>

                    <details>
                        <summary><span className="summary">Manage my account?</span></summary>
                        <div className="panel panel-border-narrow">
                            <a href="#" className="button-secondary" onClick={(e) => this.onNext(e)}>Manage my account</a>
                        </div>
                    </details>


                </Govuk>
            )

        }


    }
)