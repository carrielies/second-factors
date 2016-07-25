import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Breadcrumb from '../../components/breadcrumb'
import {findAccount, updateAccount, saveAccountInteraction} from '../../utils/database'
import {saveCredentialSession} from '../../reducers/helpers'
import { browserHistory } from 'react-router'


import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage {

        componentDidMount() {
           let request = this.props.session.gg3.request;

           findAccount(request.gg_id)
           .then((account) =>{
               saveCredentialSession( {account});
               browserHistory.push("/credential/manage_account");
           })
        }

        render() {
            return null;
        }
    }
)