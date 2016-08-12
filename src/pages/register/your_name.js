import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'
import {saveRegistrationSession} from '../../reducers/helpers'
import {saveAccount} from '../../utils/database'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            this.validate(e, {
                name: {msg: "Enter your full name", summary: "You need to enter your full name", regEx: /\w+/},
            }, (props) => {

                let account = {
                    name: props.name,
                    gg_id: this.cred_id(),
                    trust_id: this.trust_id(),
                    trust_id_level_2: this.trust_id(),
                    group_id: this.group_id(),
                    type: "individual",
                    factors: {
                        password: {
                        }
                    },
                    interactions: []
                };
                saveRegistrationSession(this.props.dispatch, {gg_id: account.gg_id} );

                saveAccount(account).then( () =>{
                    browserHistory.push("/register/your_email")
                })

            })
        }

        render() {
            let session = this.props.session.registration;
            let request = this.props.session.gg3.request;

            return (
                <Govuk phaseBanner="true">
                    <Breadcrumb text={`Register for ${request.name}`}/>

                    <Question title="What's your name ?" para="Enter all your names in full" errors={this.state.errors}>
                        <Field ref="name" name="name" errors={this.state.errors} labelText="Name"/>
                    </Question>

                    <br/>
                    <a href="#next" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    <br/>
                    <br/>

                </Govuk>
            )
        }
    }
)

