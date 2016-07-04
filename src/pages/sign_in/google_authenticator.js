import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Ga from '../../components/ga'
import React from 'react'
import speakeasy from 'speakeasy';
import {connect} from 'react-redux'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory, Link } from 'react-router'

export default connect((state) => state) (
    class extends QuestionPage {


        constructor(props) {
            super(props);
            this.state = {token: ""}
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
            }
            browserHistory.push("/logged_in")
        }

        render() {

            let errors = this.state.errors;
            let hint = this.state.token;

            return (

                <Govuk >

                    <Breadcrumb text="Sign in to Government Gateway"/>
                    <Ga ref="ga" secret={this.props.account.factors.google_authenticator.secret} onTokenChange={(token) => this.onTokenChange(token)}/>

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