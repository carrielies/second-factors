import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import React from 'react'
import { browserHistory } from 'react-router'

import {connect} from 'react-redux'
import {saveRegistrationSession} from '../../reducers/helpers'
import {deleteAccount, applyInteraction} from '../../utils/database'

export default connect((state) => state) (

    class extends QuestionPage {

        constructor(props) {
            super(props);
        }

        render() {
            let gg3 = this.props.session.gg3;
            let session = this.props.session.org;
            let account = session.account;

            return(
                <Govuk title="Credential Management">
                    <Question title="Account has been deleted">
                    </Question>
                </Govuk>
            )
        }
    }
)
