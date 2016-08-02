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




        render() {

            let gg3 = this.props.session.gg3;
            let response = gg3.response;

            return (
                <Govuk phaseBanner="true" title={response.org_name}>

                    <Breadcrumb text={`${response.name}`} hide_back={true}/>
                    <Question title="Resgistration complete" para="You have completed the registration process">
                    </Question>

                    <Link to="/credential/manage_account" className="button">Credential Management</Link>
                    <br/>

                    <br/>

                </Govuk>
            )
        }
    }
)

