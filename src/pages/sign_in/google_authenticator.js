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
import {saveGG3Session} from '../../reducers/helpers'

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

            saveGG3Session( this.props.dispatch, {level: "2"});
            browserHistory.push("/logged_in")
        }

        render() {

            let errors = this.state.errors;
            let hint = this.state.token;
            let session = this.props.session.gg3;
            let request = session.request;
            let account = session.account;

            return (

                <Govuk >

                    <Breadcrumb text={`Sign in to ${request.name} using your Government Gateway account`}/>
                    <Ga ref="ga" secret={account.factors.google_authenticator.secret} onTokenChange={(token) => this.onTokenChange(token)}/>

                    <Question title="What's your 6 digit google authenticator code?" errors={errors}>
                        <Field ref="code" name="code" labelText="Code" errors={errors}/>
                    </Question>

                    <a href="#" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    <br/>
                    <br/>
                    <strong className="ga_code_hidden">{hint}</strong>
                    <br/>
                    <details>
                        <summary><span className="summary">Having problems?</span></summary>
                        <div className="panel panel-border-narrow">
                            <p>
                                <Link to="/your_auth_factors">Try a different authentication factor</Link>
                            </p>
                        </div>
                    </details>
                </Govuk>
            )
        }
    }
)