import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import {searchForAcounts} from '../../utils/helpdesk_db'
import {saveHelpdeskSession} from '../../reducers/store_helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{


        search(e) {
            e.preventDefault();
            searchForAcounts(this.refs.email.value() || "", this.refs.name.value() || "" ).then( (accounts) => {
                saveHelpdeskSession(this.props.dispatch, {search_results: accounts} );
                browserHistory.push("/helpdesk/search_results")
            });

        }

        render() {

            return(
                <Govuk title="Helpdesk">

                    <Question title="Search for a user" para="" errors={this.state.errors}>
                        <Field ref="email" name="email" errors={this.state.errors} labelText="Email" labelHint=""/>
                        <Field ref="name" name="name" errors={this.state.errors} labelText="Name" labelHint=""/>
                    </Question>
                    <Question title="Swivel chair" para="Try and identify the user on your own systems, via known facts, and key in their gateway id" errors={this.state.errors}>
                        <Field ref="gatewayId" name="gatewayId" errors={this.state.errors} labelText="Gateway Id" labelHint=""/>
                    </Question>
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.search(e)}>Search</a>


                </Govuk>
            )
        }
    }
)