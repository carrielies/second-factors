import Govuk from '../components/govuk'
import QuestionPage from '../utils/question_page'
import Question from '../components/question'
import Field from '../components/field'
import React from 'react'
import Fingerprint from '../components/fingerprint'
import { browserHistory } from 'react-router'


export default class extends QuestionPage {

    constructor(props) {
        super(props);
        this.state = {errors: {}};
    }

    onNext(e) {
        this.validate(e,{
            email: {msg: "Enter your email", summary: "You need to enter your username", regEx: /\w+/},
            password: {msg: "Enter your password", summary: "You need to enter your password", regEx: /\w+/}
        }, (props) => {
            browserHistory.push("/ga");
        })
    }

    render() {

        let errors = this.state.errors;

        return (

            <Govuk phaseBanner="true">

                {this.props.breadcrumb}
                <Fingerprint/>
                <Question title="Sign in to government gateway" button="Sign in" errors={errors}>
                    <Field ref="email" name="email" labelText="Email" errors={errors}/>
                    <Field ref="password" name="password"  labelText="Password" errors={errors}/>
                </Question>

                <a href="#" className="button" onClick={(e) => this.onNext(e)}>Continue</a>

                <div className="grid-row">
                    <div className="column-two-thirds">
                        <h1 className="heading-medium">Problems signing into the government gateway?</h1>
                    </div>
                </div>

                <details>
                    <summary><span className="summary">Forgotten your password?</span></summary>
                    <div className="panel panel-border-narrow">
                        <p>
                            <a href="#" onClick={(e) => this.next(e)}>Recover your user password online or by post</a>
                        </p>
                    </div>
                </details>
            </Govuk>
        )
    }
}