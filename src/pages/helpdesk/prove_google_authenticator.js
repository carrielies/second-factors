import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Ga from '../../components/ga'
import React from 'react'
import StoreHelper from '../../utils/store_helper'
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
                return;
            }

            let store = new StoreHelper(this.props);
            let account = store.serverAccount(store.helpdesk.selected_account);
            store.saveInteraction( "help_desk", `Proved identity with google authenticator`, account);

            browserHistory.push("/helpdesk/manage_account")
        }

        render() {

            let errors = this.state.errors;
            let hint = this.state.token;
            let store = new StoreHelper(this.props);
            let account = store.serverAccount(store.helpdesk.selected_account);
            return (

                <Govuk title="Helpdesk">

                    <Breadcrumb text={`${account.firstnames} ${account.lastname}`}/>
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