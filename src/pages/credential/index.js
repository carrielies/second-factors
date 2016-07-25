import Govuk from '../../components/govuk'
import Content from '../../components/content'
import React from 'react'
import {connect} from 'react-redux'
import QuestionPage from '../../utils/question_page'
import { browserHistory, Link } from 'react-router'
import {saveHelpdeskSession, saveGG3Session} from '../../reducers/helpers'


export default connect((state) => state) (
    class extends QuestionPage {

        onClick(e) {
            e.preventDefault();
            let request = {
                name: "Credential Management",
                auth_level_required: "1",
                auth_level_desired: "2",
                redirect_url: "/credential/landing_page"
            };
            saveGG3Session( this.props.dispatch, {request} )
            browserHistory.push("/service_redirect")
        }

        render() {
            return(
                <Govuk title="Helpdesk">
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.onClick(e)}>Sign into Credential Management</a>
                </Govuk>
            )
        }


    }
)