import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {findAccount, findEnrolment, updateEnrolment} from '../../utils/spacegov_helpdesk_db'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        constructor(props) {
            super(props)
            var gg_id = this.getQueryParameter("gg_id")
            findAccount(gg_id).then( (account) => {
                findEnrolment(gg_id).then( (enrolment) => {
                    enrolment.trust_id = account.trust_id;
                    enrolment.trust_id_level_2 = account.trust_id_level_2;
                    return updateEnrolment(enrolment)
                }).then( () => {
                    browserHistory.push("/spacegov/trust_store/search")
                });
            });
        }

        render() {
            return(
                null
            )
        }
    }
)