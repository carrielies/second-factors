import Govuk from '../components/govuk'
import QuestionPage from '../utils/question_page'
import Question from '../components/question'
import Field from '../components/field'
import React from 'react'
import speakeasy from 'speakeasy';
import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage {


        constructor(props) {
            super(props)
        }


        verifyCode(token, secret) {

            return speakeasy.totp.verify({
                secret: secret,
                encoding: 'base32',
                token: token
            });
        }

        onNext(e) {
            let props = this.validate(e,{
                code: {msg: "Enter your code", summary: "You need to enter your code", regEx: /\w+/}
            });

            if( !props ) return;

            if (!this.verifyCode(props.code, this.props.account.ga_secret)) {
                let errors = {};
                errors["code"] = {msg: "Wrong code entered", summary: "You entered the wrong code"};
                this.setState( {errors: errors});
                e.preventDefault();
            }
        }

        render() {

            let errors = this.state.errors;
            let hint = this.props.account.ga_token;

            return (

                <Govuk phaseBanner="true">

                    {this.props.breadcrumb}

                    <Question title="What's your 6 digit google authenticator code?" errors={errors}>
                        <Field ref="code" name="code" labelText="Code" errors={errors} labelHint={hint}/>
                    </Question>

                    <a href="#" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    <br/>
                    <br/>
                    <details>
                        <summary><span className="summary">Having problems?</span></summary>
                        <div className="panel panel-border-narrow">
                            <p>
                                <a href="#next" onClick={(e) => this.next(e)}>Recover your user password online or by post</a>
                            </p>
                        </div>
                    </details>
                </Govuk>
            )
        }
    }
)