import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {} from '../../utils/helpdesk_db'
import {saveHelpdeskSession} from '../../reducers/helpers'
import {findAccount} from '../../utils/helpdesk_db'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        constructor(props) {
            super(props)
            var gg_id = this.getQueryParameter("gg_id")
            findAccount(gg_id).then( (account) => {
                saveHelpdeskSession(this.props.dispatch, {account, account_changed: false, id_proven: false, id_proof: null, actions: []} );
                browserHistory.push("/helpdesk/prove_identity")
            });
        }

        render() {
            return(
                null
            )
        }
    }
)