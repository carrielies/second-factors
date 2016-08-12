import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import {searchTrustStore} from '../../utils/spacegov_helpdesk_db'
import {saveTrustStoreSession, saveGG3Session} from '../../reducers/helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        onCredentialManagement(e) {
            e.preventDefault();

            let request = {
                name: "Credential Management",
                auth_level_required: "1",
                auth_level_desired: "1",
                redirect_url: "/credential/landing_page",
                calling_service_request: {
                    name: "Spacegov Helpdesk",
                    auth_level_required: "1",
                    auth_level_desired: "1",
                    redirect_url: "/spacegov/trust_store/search",
                },
                accept_trust_request: {
                    name: "Spacegov Helpdesk",
                    auth_level_required: "1",
                    auth_level_desired: "1",
                    redirect_url: "/spacegov/trust_store/external_accept_trust?gg_id=" + gg_id
                }
            };
            saveGG3Session(this.props.dispatch, {request});
            browserHistory.push("/service_redirect");

        }

        searchGG(e) {
            e.preventDefault();

            let request = {
                name: "Helpdesk",
                auth_level_required: "1",
                auth_level_desired: "1",
                redirect_url: "/helpdesk/search",
                calling_service_request: {
                    name: "Spacegov Helpdesk",
                    auth_level_required: "1",
                    auth_level_desired: "1",
                    redirect_url: "/spacegov/trust_store/search"
                }
            };
            saveGG3Session(this.props.dispatch, {request});
            browserHistory.push("/service_redirect");

        }

        search(e) {
            e.preventDefault();
            searchTrustStore("", "",  this.refs.license.value() || "" ).then( (accounts) => {
                saveTrustStoreSession(this.props.dispatch, {search_results: accounts} );
                browserHistory.push("/spacegov/trust_store/search_results")
            });

        }

        render() {

            return(
                <Govuk title="Spacegov Helpdesk" hidePhaseBanner={true}>
                    <div className="spacegov"></div>
                    <Question title="Search Spacegov for account" para="" errors={this.state.errors}>
                        <Field ref="license" name="license" errors={this.state.errors} labelText="Space trading license" labelHint=""/>
                    </Question>
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.search(e)}>Search for license</a>
                    <br/>
                    <br/>
                    <a href="#" className="" onClick={(e) => this.searchGG(e)}>Search by email and name</a>
                    <br/>

                    <br/>

                    <details>
                        <summary><span className="summary">Manage my account?</span></summary>
                        <div className="panel panel-border-narrow">
                            <p>
                                <a href="#" onClick={(e) => this.onCredentialManagement(e)}>Manage my account</a>
                            </p>
                        </div>
                    </details>


                </Govuk>
            )
        }
    }
)