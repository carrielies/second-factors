import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory,Link } from 'react-router'
import {saveAccount, findAccount, saveInteraction} from '../../utils/database'
import {saveGG3Session} from '../../reducers/helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {


        onNext(e) {
            e.preventDefault();
            let session = this.props.session.org;
            let account = session.account;
            let request = this.props.session.gg3.request;

            browserHistory.push( `/register/resume_registration?gg_id=${account.gg_id}`)
        }

        render() {

            let session = this.props.session.org;
            let account = session.account;
            let request = this.props.session.gg3.request;

            return (
                <Govuk phaseBanner="true" title="Organisation Management">

                    <Breadcrumb text={`Register new user for ${account.org_name}`}/>
                    <Question title="Your government gateway account has been created">
                    </Question>

                    <table>
                        <thead>
                        <tr>
                            <th colSpan="2">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{account.email}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{account.name}</td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <br/>
                    <Link to="/org/manage_org" className="button">Finish</Link>
                    <br/>
                    <br/>

                    <div className="email">
                        <div className="banner"></div>
                        <p>
                            Hello {account.name},<br/><br/>

                            Please complete the registration for {account.org_name} by clicking the link below
                            <br/><br/>
                            <Link to={`/register/resume_registration?gg_id=${account.gg_id}`}>https://gg3.gov.uk/register/resume_registration</Link>
                            <br/>
                            <br/>
                        </p>
                    </div>


                    <br/>

                </Govuk>
            )
        }
    }
)

