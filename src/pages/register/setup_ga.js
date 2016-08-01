import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Content from '../../components/content'
import Ga from '../../components/ga'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'

import { browserHistory } from 'react-router'

import {connect} from 'react-redux'
import {saveRegistrationSession} from '../../reducers/helpers'
import {updateAccount, findAccount} from '../../utils/database'



export default connect((state) => state) (
    class extends QuestionPage {

        componentDidMount() {
            let session = this.props.session.registration;
            findAccount(session.gg_id).then( (account) => {
                saveRegistrationSession(this.props.dispatch, {account})
            });
        }

        onTokenChange(token) {
            this.setState({token})
        }

        onNext(e) {
            e.preventDefault();
            let ga = this.refs.ga;

            let props = this.validate(e,{
                code: {msg: "Enter your code", summary: "You need to enter your code", regEx: /\w+/}
            });

            if( !props ) return;


            if (!ga.verifyToken(props.code)) {
                let errors = {};
                errors["code"] = {msg: "Wrong code entered", summary: "You entered the wrong code"};
                this.setState( {errors: errors});
                return;
            }

            let session = this.props.session.registration;
            let account = session.account;
            account.factors.google_authenticator = {
                secret: this.refs.ga.secret()
            };

            updateAccount( account ).then( () => {
                browserHistory.push("/register/your_auth_factors")
            });

            saveRegistrationSession(this.props.dispatch, { level: "2"});
        }
    
        render() {
    
            let errors = this.state.errors;
            let hint = this.state.token;
            let session = this.props.session.registration;
            let request = this.props.session.gg3.request;

            return (
    
                <Govuk phaseBanner="true">

                    <Breadcrumb text={`Register for ${request.name}`}/>

                    <Content title="Setup google authenticator">
                        <div className="grid-row">
                            <div className="column-one-third">
                                <Ga ref="ga" onTokenChange={(token) => this.onTokenChange(token)} qrcodeSize="128"/>
                            </div>
                            <div className="column-two-thirds">
                                <p>Scan this to your phone using your google authenticator app.</p>
                            </div>
                        </div>
                    </Content>
    
                    <Question title="" errors={errors}>
                        <Field ref="code" name="code" labelText="What code is displayed?" errors={errors} labelHint={hint}/>
                    </Question>
    
                    <a href="#" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    <br/>
                </Govuk>
            )
        }
    }
)