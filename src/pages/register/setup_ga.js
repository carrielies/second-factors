import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Content from '../../components/content'
import Ga from '../../components/ga'
import React from 'react'
import speakeasy from 'speakeasy';
import QRCode from 'qrcode.react';
import Breadcrumb from '../../components/breadcrumb'

import { browserHistory } from 'react-router'

import {connect} from 'react-redux'





export default connect((state) => state) (
    class extends QuestionPage {

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

            let factors = { ...this.props.account.factors,
                    google_authenticator: {
                        secret: this.refs.ga.secret()
                    }
            };

            this.props.dispatch( {type: 'SAVE_ACCOUNT', data: {factors: factors, two_fa_passed: true} })
            browserHistory.push("/register/your_auth_factors")
        }
    
        render() {
    
            let errors = this.state.errors;
            let hint = this.state.token;
    
            return (
    
                <Govuk phaseBanner="true">

                    <Breadcrumb text={`Register for ${this.props.service.request.name}`}/>

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