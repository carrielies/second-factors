import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage {

        render() {
            let service = this.props.service;
            let resp = this.props.session.gg3.response;
            return (
                    <Govuk title="Spacegov helpdesk" hidePhaseBanner={true} header="SPACE.GOV">
                        <div className="spacegov"></div>
                        <Content title={`Welcome ${resp.name}`}>
                            <p>
                                Sorry, but you don't have access to Spacegov Helpdesk
                            </p>
                        </Content>
                    </Govuk>
            );

        }

    }
)