import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {findAccount, updateAccount, saveAccountInteraction} from '../../utils/database'
import {saveOrgSession} from '../../reducers/helpers'


import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage {

        componentDidMount() {
           let response = this.props.session.gg3.response;
           findAccount(response.gg_id)
           .then((account) => {
               saveOrgSession( this.props.dispatch, {account});
               browserHistory.push("/credential/manage_account");
           })
        }

        render() {
            return null;
        }
    }
)