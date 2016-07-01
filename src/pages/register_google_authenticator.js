import Govuk from '../components/govuk'
import QuestionPage from '../utils/question_page'
import Question from '../components/question'
import Field from '../components/field'
import Content from '../components/content'
import React from 'react'
import speakeasy from 'speakeasy';
import QRCode from 'qrcode.react';
import { browserHistory } from 'react-router'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage {
    
        constructor(props) {
            super(props);
            this.state = { errors: {}, secret: speakeasy.generateSecret({length: 20})};
    
            setInterval( () => {
                var token = speakeasy.totp({
                    secret: this.state.secret.base32,
                    encoding: 'base32'
                });
                this.props.dispatch( {type: "GA_TOKEN", data: token})
            }, 1000)
    
        }
    
        verifyCode(token, secret) {
            return speakeasy.totp.verify({
                secret: secret.base32,
                encoding: 'base32',
                token: token
            });
        }
    
        onNext(e) {
            let props = this.validate(e,{
                code: {msg: "Enter your code", summary: "You need to enter your code", regEx: /\w+/}
            });
    
            if( !props ) return;
    
            if (!this.verifyCode(props.code, this.state.secret)) {
                let errors = {};
                errors["code"] = {msg: "Wrong code entered", summary: "You entered the wrong code"};
                this.setState( {errors: errors});
                e.preventDefault();
            }

            this.props.dispatch( {type: 'GA_SECRET', data: this.state.secret.base32 })
            browserHistory.push("/ga")
        }
    
        render() {
    
            let errors = this.state.errors;
            let hint = this.props.account.ga_token;
    
            return (
    
                <Govuk phaseBanner="true">
    
                    {this.props.breadcrumb}
                    
                    <Content title="Your google authenticator code">
                        <QRCode value={this.state.secret.otpauth_url} />
                        <p>Scan this to your phone using google authenticator</p>
                    </Content>
    
                    <Question title="What code is displayed?" errors={errors}>
                        <Field ref="code" name="code" labelText="Code" errors={errors} labelHint={hint}/>
                    </Question>
    
                    <a href="#" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    <br/>
                </Govuk>
            )
        }
    }
)