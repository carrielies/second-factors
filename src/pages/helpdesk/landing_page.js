import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{
        render() {

            let service = this.props.service;
            let resp = service.response_from_gw;

            return(
                <Govuk title="Helpdesk">
                    <Content title={`Welcome back ${resp.name}`}>
                        <p>
                            You last logged into Help desk on {resp.last_logged_in}
                        </p>
                    </Content>

                    <br/>
                    <Link to="/helpdesk/search" className="button">Search</Link>

                </Govuk>
            )
        }
    }
)