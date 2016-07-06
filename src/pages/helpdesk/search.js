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


        search(e) {
            e.preventDefault();
            browserHistory.push("/helpdesk/search_results")
        }

        render() {

            let service = this.props.service;
            let resp = service.response_from_gw;

            return(
                <Govuk title="Helpdesk">

                    <Question title="Search for a user" para="" errors={this.state.errors}>
                        <Field ref="email" name="email" errors={this.state.errors} labelText="Email" labelHint=""/>
                        <Field ref="name" name="name" errors={this.state.errors} labelText="Name" labelHint=""/>
                        <Field ref="dob" name="dob" errors={this.state.errors} labelText="Date of birth" labelHint="e.g. 25/02/1977"/>
                    </Question>
                    <Question title="Swivel chair" para="Try and identify the user on your own systems, via known facts, and key in their gateway id" errors={this.state.errors}>
                        <Field ref="gatewayId" name="gatewayId" errors={this.state.errors} labelText="Gateway Id" labelHint=""/>
                    </Question>
                    <br/>
                    <a href="#/help_desk_v2/search_results" className="button" onClick={(e) => this.search(e)}>Search</a>


                </Govuk>
            )
        }
    }
)