import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory,Link } from 'react-router'
import {updateAccount, findAccount, saveInteraction} from '../../utils/database'
import {saveGG3Session} from '../../reducers/helpers'
import {saveRegistrationSession} from '../../reducers/helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {


        componentDidMount() {
            let session = this.props.session.registration;
            findAccount(session.gg_id).then( (account) => {
                saveRegistrationSession(this.props.dispatch, {account})
            });
        }

        
        onNext(e) {
            e.preventDefault();
            let session = this.props.session.registration;
            let account = session.account;

            updateAccount(account).then( () => {
                return saveInteraction( account.gg_id, "registration", `Account created with factors: ${this.authFactors()}` );
            }).then( () => {
                return findAccount(account.gg_id)
            }).then( (a) => {
                saveGG3Session(this.props.dispatch, {account: a, signed_in: true, level: session.level });
                browserHistory.push( "/logged_in")
            });

        }

        authFactors() {

            let factors = ["Password"];
            let session = this.props.session.registration;
            let account = session.account;

            if( account.factors.google_authenticator ) factors.push( "Google authenticator");
            if( account.factors.device_fingerprint ) factors.push( "Device fingerprint");
            if( account.factors.u2f_key ) factors.push( "U2F Key");
            if( account.factors.cryptophoto ) factors.push( "Cryptophoto");
            return factors.join(", ");
        }

        render() {

            let session = this.props.session.registration;
            let account = session.account;
            let request = this.props.session.gg3.request;

            return (
                <Govuk phaseBanner="true">

                    <Breadcrumb text={`Register for ${request.name}`}/>
                    <Question title="Your government gateway account has been created">
                    </Question>

                    <table>
                        <thead>
                        <tr>
                            <th colSpan="2">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{account.email}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{account.name}</td>
                        </tr>
                        <tr>
                            <td>Authentication Factors</td>
                            <td>{this.authFactors()}</td>
                        </tr>

                        </tbody>
                    </table>
                    <br/>
                    <br/>
                    <a href="/signin" onClick={(e) => this.onNext(e)} className="button">Save and Sign in</a>
                    <br/>
                    <br/>

                </Govuk>
            )
        }
    }
)

