import Govuk from '../../components/govuk'
import Content from '../../components/content'
import React from 'react'
import Fingerprint from '../../components/fingerprint'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory, Link } from 'react-router'
import {saveRegistrationSession} from '../../reducers/helpers'
import {findAccount, updateAccount, saveAccountInteraction} from '../../utils/database'
import u2f from 'u2f-api'
import 'whatwg-fetch';


import {connect} from 'react-redux'
export default connect((state) => state) (
    class extends QuestionPage {

        constructor(props) {
            super(props);
            this.state = { errors: {}, success: false }
        }

        componentDidMount() {

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
                    if( res.successful ) {

                        let session = this.props.session.registration;
                        let account = session.account;

                        account.factors.u2f_key = {
                            keyHandle: res.keyHandle,
                            publicKey: res.publicKey
                        };

                        updateAccount(account).then( () => {
                            this.setState( {success: true});
                            saveRegistrationSession(this.props.dispatch, { level: "2"});

                        });

                    }
                    else {
                        this.setState({error: true})
                    }
                })
                .catch((err) => {
                    this.setState({error: true})
                })
        }

        registerPage() {
            let session = this.props.session.registration;
            let account = session.account;
            let request = this.props.session.gg3.request;
            return (

                <Govuk>

                    <Breadcrumb text={`Register for ${request.name}`}/>

                    <Content title="Press the button on your U2F device">
                        <img src="/public/images/security_key.jpg"/>
                    </Content>
                </Govuk>
            )
        }

        successPage() {
            let session = this.props.session.registration;
            let account = session.account;
            let request = this.props.session.gg3.request;
            return (

                <Govuk>

                    <Breadcrumb text={`Register for ${request.name}`}/>

                    <Content title="U2F device registered">
                    </Content>

                    <br/>
                    <Link to="/register/your_auth_factors" className="button">Continue</Link>
                    <br/>
                    <br/>
                </Govuk>
            )
        }


        render() {
            let session = this.props.session.registration;
            let account = session.account;
            let request = this.props.session.gg3.request;

            if( this.state.error ) {
                return(
                    <Govuk>

                        <Breadcrumb text={`Register for ${request.name}`}/>

                        <Content title="Unable to register your U2F device">
                        </Content>

                        <br/>
                        <Link to="/register/your_auth_factors" className="button">Continue</Link>
                        <br/>
                        <br/>
                    </Govuk>

                )
            }

            if( this.state.success ) {
                return this.successPage();
            }
            else {
                return this.registerPage();
            }
        }
    }
)