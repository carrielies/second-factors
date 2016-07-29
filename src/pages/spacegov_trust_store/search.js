import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import {searchTrustStore} from '../../utils/spacegov_db'
import {saveTrustStoreSession} from '../../reducers/helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{


        search(e) {
            e.preventDefault();
            searchTrustStore(this.refs.email.value() || "", this.refs.name.value() ||  this.refs.license.value() ).then( (accounts) => {
                saveTrustStoreSession(this.props.dispatch, {search_results: accounts} );
                browserHistory.push("/spacegov/trust_store/search_results")
            });

        }

        render() {

            return(
                <Govuk title="Spacegov Trust Store">

                    <Question title="Search for a user" para="" errors={this.state.errors}>
                        <Field ref="email" name="email" errors={this.state.errors} labelText="Email" labelHint=""/>
                        <Field ref="name" name="name" errors={this.state.errors} labelText="Name" labelHint=""/>
                        <Field ref="license" name="license" errors={this.state.errors} labelText="License" labelHint=""/>
                    </Question>
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.search(e)}>Search</a>

                </Govuk>
            )
        }
    }
)