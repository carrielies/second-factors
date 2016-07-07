import Govuk from '../../components/govuk'
import Content from '../../components/content'
import React from 'react'
import Fingerprint from '../../components/fingerprint'
import {connect} from 'react-redux'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import QRCode from 'qrcode.react';
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory, Link } from 'react-router'

export default connect((state) => state) (
    class extends QuestionPage {

        onClick(e) {
            e.preventDefault();
            this.props.dispatch( {type: 'SAVE_SERVICE', data: {
                request: {
                    name: "Help desk",
                    auth_level_required: "1",
                    auth_level_desired: "1",
                    redirect_url: "/helpdesk/landing_page",
                }
            }});
            browserHistory.push("/service_redirect")
        }

        render() {
            return(
                <Govuk title="Helpdesk">
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.onClick(e)}>Sign into Helpdesk</a>
                </Govuk>
            )
        }


    }
)