import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import Question from '../../components/question'
import QuestionPage from '../../utils/question_page'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import JSONTree from 'react-json-tree'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import {findGroupEnrolment} from '../../utils/spacegov_helpdesk_db'
import {saveGG3Session, saveSpacegovSession} from '../../reducers/helpers'


export default connect((state) => state) (
    class extends QuestionPage {
        constructor(props) {
            super(props);
            let resp = props.session.gg3.response;

            findGroupEnrolment(resp.group_id).then( (groupEnrolment) =>{
                if ( !groupEnrolment ) {
                    browserHistory.push("/spacegov/trust_store/enrol");
                    return;
                }
                else {
                    browserHistory.push("/spacegov/trust_store/search");
                    return;
                }
            })
        }
        render() {
            return null;
        }
    }
)