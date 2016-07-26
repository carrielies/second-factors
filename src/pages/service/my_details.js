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


export default connect((state) => state) (
    class extends QuestionPage {

        render() {

            let enrolment = this.props.session.spacegov.enrolment;

            return(

                <Govuk title="Spacegov" hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>

                    <Breadcrumb text={`${enrolment.name} (${enrolment.org_name})`}/>

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