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

        render() {
            let account = this.props.account;
            let service = this.props.service;
            let resp = service.response_from_gw;
            let request = service.request;
            let cookie = this.props.cookie;
            let trust_level = resp.level;
            let enrolment = service.enrolled_users[resp.email];

            return(

                <Govuk title={service.request.name} hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>

                    <Breadcrumb text={`${account.name} (${enrolment.org_name})`}/>

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

                </Govuk>
            )

        }


    }
)