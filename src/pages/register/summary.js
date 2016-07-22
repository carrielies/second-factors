import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import StoreHelper from '../../utils/store_helper'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory,Link } from 'react-router'
import {saveAccount, findAccount, saveInteraction} from '../../utils/database'
import {saveGG3Session} from '../../reducers/store_helpers'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {

        createAccount() {
            let session = this.props.session.registration;

            let factors = {
                password: {
                    secret: session.password
                }
            };

            if( session.google_authenticator ) {
                factors.google_authenticator = {
                    secret: session.google_authenticator.secret
                }
            }

            if( session.device_fingerprint ) {
                factors.device_fingerprint = {
                    devices: [
                        {
                            device: session.device_fingerprint.device,
                            fingerprint: session.device_fingerprint.fingerprint
                        }

                    ]
                }
            }

            let account = {
                email: session.email,
                name: session.name,
                trust_id: this.trust_id(),
                factors: factors,
                interactions: []
            };
            return account;
        }
        
        onNext(e) {
            e.preventDefault();
            let account = this.createAccount();
            let session = this.props.session.registration;
            saveAccount(account).then( () => {
                return saveInteraction( account.email, "registration", `Account created with factors: ${this.authFactors()}` );
            }).then( () => {
                return findAccount(account.email)
            }).then( (a) => {
                saveGG3Session(this.props.dispatch, {account: a, signed_in: true, level: session.level });
                browserHistory.push( "/logged_in")
            });

        }

        authFactors() {

            let factors = ["Password"];
            let session = this.props.session.registration;

            if( session.google_authenticator ) factors.push( "Google authenticator");
            if( session.device_fingerprint ) factors.push( "Device fingerprint");
            return factors.join(", ");
        }

        render() {

            let session = this.props.session.registration;

            return (
                <Govuk phaseBanner="true">

                    <Breadcrumb text={`Register for ${this.props.service.request.name}`}/>
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
                            <td>{session.email}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{session.name}</td>
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

