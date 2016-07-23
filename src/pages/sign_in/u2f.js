import Govuk from '../../components/govuk'
import Content from '../../components/content'
import React from 'react'
import Fingerprint from '../../components/fingerprint'
import {connect} from 'react-redux'
import QuestionPage from '../../utils/question_page'
import QRCode from 'qrcode.react';
import Breadcrumb from '../../components/breadcrumb'
import Notice from '../../components/notice'
import { browserHistory, Link } from 'react-router'
import {saveGG3Session} from '../../reducers/helpers'
import u2f from 'u2f-api'
import 'whatwg-fetch';


export default connect((state) => state) (
    class extends QuestionPage {

        componentDidMount() {
            let session = this.props.session.gg3;
            let account = session.account;

            let keyHandle = account.factors.u2f_key.keyHandle;
            let publicKey = account.factors.u2f_key.publicKey;

            fetch("/svr/u2f/challenge", {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({keyHandle, publicKey})
            }).then((resp) => resp.json())
                .then((req) => u2f.sign(req))
                .then((res) => {
                    return fetch("/svr/u2f/challenge_response", {
                        method: 'POST',
                        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                        body: JSON.stringify(res)
                    })
                }).then((resp) => resp.json())
                .then((res) => {
                    if ( res.successful ) {
                        saveGG3Session( this.props.dispatch, {level: "2"});
                        browserHistory.push("/logged_in")
                    }
                    else {
                        this.setState({error: true})
                    }
                })
                .catch( (err) => {
                    this.setState({error: true})
                })

        }

        render() {
            let session = this.props.session.gg3;
            let request = session.request;
            let account = session.account;
            let error = this.state.error

            if( error) {
                return (
                    <Govuk>
                        <Breadcrumb text={`Sign in to ${request.name} using your Government Gateway account`}/>
                        <Content title="Press the button on your U2F Device">
                            <p>Unable to authenticate you against your U2F device</p>
                            <Link to="/your_auth_factors" className="button">Try a different authentication factor</Link>
                        </Content>

                    </Govuk>
                )
            }

            return (
                <Govuk>
                    <Breadcrumb text={`Sign in to ${request.name} using your Government Gateway account`}/>
                    <Content title="Press the button on your U2F Device">
                        <img src="/public/images/security_key.jpg"/>
                    </Content>
                </Govuk>
            )
        }
    }
)