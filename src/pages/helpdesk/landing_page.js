import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import {findGroupEnrolment} from '../../utils/spacegov_helpdesk_db'
import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage{

        constructor(props) {
            super(props);
            let resp = props.session.gg3.response;

            findGroupEnrolment(resp.group_id).then( (groupEnrolment) =>{
                if ( !groupEnrolment ) {
                    browserHistory.push("/helpdesk/enrol");
                    return;
                }
            })
        }


        render() {

            let service = this.props.service;
            let resp = this.props.session.gg3.response;

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