import Govuk from '../../components/govuk'
import Content from '../../components/content'
import React from 'react'
import Fingerprint from '../../components/fingerprint'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'
import {saveRegistrationSession} from '../../reducers/helpers'
import u2f from 'u2f-api'
import 'whatwg-fetch';


import {connect} from 'react-redux'
export default connect((state) => state) (
    class extends QuestionPage {

        constructor(props) {
            super(props);
            this.state = { errors: {} }
        }

        register(e) {
            e.preventDefault();

            fetch("/svr/u2f/register").then((resp) => resp.json())
                .then((reg) => u2f.register( reg ))
                .then((resp) => {
                    this.setState({resp: resp});
                    return fetch('/svr/u2f/register', {
                        method: 'POST',
                        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
                        body: JSON.stringify(resp)
                    });
                })
                .then((resp) => resp.json())
                .then((res) => {
                    saveRegistrationSession(this.props.dispatch, {
                        u2f_key: {
                            keyHandle: res.keyHandle,
                            publicKey: res.publicKey
                        },
                        level: "2"
                    });
                });
        }


        onNext(e) {
            e.preventDefault();
            browserHistory.push("/register/your_auth_factors");
        }

        registerPage() {
            let session = this.props.session.registration;
            let request = this.props.session.gg3.request;
            return (

                <Govuk>

                    <Breadcrumb text={`Register for ${request.name}`}/>

                    <Question title="Register a U2F device?" para="" errors={this.state.errors}>
                        <Content>
                            <p>Press button on U2F device
                            </p>
                        </Content>
                    </Question>

                    <br/>
                    <a href="#" className="button" onClick={(e) => this.register(e)}>Register U2F device</a>
                    <br/>
                    <br/>
                </Govuk>
            )
        }

        successPage() {
            let session = this.props.session.registration;
            let request = this.props.session.gg3.request;
            return (

                <Govuk>

                    <Breadcrumb text={`Register for ${request.name}`}/>

                    <Question title="Register a U2F device?" para="" errors={this.state.errors}>
                        <Content>
                            <p>U2F device registered.
                            </p>
                        </Content>
                    </Question>

                    <br/>
                    <a href="#" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    <br/>
                    <br/>
                </Govuk>
            )
        }


        render() {
            let session = this.props.session.registration;
            if( session.u2f_key) {
                return this.successPage();
            }
            else {
                return this.registerPage();
            }
        }
    }
)