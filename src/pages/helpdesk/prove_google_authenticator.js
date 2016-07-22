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
import {saveHelpdeskSession} from '../../reducers/helpers'

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
                return;
            }

            saveHelpdeskSession(this.props.dispatch, {id_proof: "Google Authenticator", id_proven: true});
            browserHistory.push("/helpdesk/prove_identity")
        }

        render() {

            let errors = this.state.errors;
            let hint = this.state.token;
            let account = this.props.session.helpdesk.account;
            return (

                <Govuk title="Helpdesk">

                    <Breadcrumb text={`${account.name}`}/>
                    <Ga ref="ga" secret={account.factors.google_authenticator.secret} onTokenChange={(token) => this.onTokenChange(token)}/>

                    <Question title="What's their 6 digit google authenticator code?" errors={errors}>
                        <Field ref="code" name="code" labelText="Code" errors={errors} labelHint={hint}/>
                    </Question>

                    <a href="#" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    <br/>
                    <br/>
                    <Link to="/helpdesk/prove_identity">They don't know the answer</Link>
                </Govuk>
            )
        }
    }
)