import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import {searchForAcounts} from '../../utils/helpdesk_db'
import {saveHelpdeskSession} from '../../reducers/helpers'
import Breadcrumb from '../../components/breadcrumb'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        componentDidMount() {
            let session = this.props.session.helpdesk;

            let gg3 = this.props.session.gg3;
            let title = "Helpdesk";
            let back_to_service_url = "";

            if (gg3 && gg3.request && gg3.request.calling_service_request){
                title = gg3.request.calling_service_request.name;
                back_to_service_url = gg3.request.calling_service_request.redirect_url
            }
            saveHelpdeskSession(this.props.dispatch, {title, back_to_service_url});
        }


        search(e) {
            e.preventDefault();
            searchForAcounts(this.refs.email.value() || "", this.refs.name.value() || "", this.refs.gatewayId.value() || "" ).then( (accounts) => {
                saveHelpdeskSession(this.props.dispatch, {search_results: accounts} );
                browserHistory.push("/helpdesk/search_results")
            });

        }

        render() {
            let session = this.props.session.helpdesk;
            return(
                <Govuk title={session.title}>
                    <Breadcrumb text="" back={session.back_to_service_url} hide_back={session.back_to_service_url}/>

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