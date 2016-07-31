import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import Content from '../../components/content'
import { browserHistory } from 'react-router'
import Notice from '../../components/notice'
import {saveCredentialSession} from '../../reducers/helpers'

import {findAccount, updateAccount, saveAccountInteraction} from '../../utils/database'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {

        constructor(props) {
            super(props);
        }

        componentDidMount() {
            let response = this.props.session.gg3.response;

            findAccount(response.gg_id)
            .then((account) => {
                saveCredentialSession( this.props.dispatch, {account});
            })
        }

        onNext(e) {
            e.preventDefault();
            if( this.refs.ga && this.refs.ga.checked ) {
                browserHistory.push("/credential/ga")
            }
            else if( this.refs.df && this.refs.df.checked ) {
                browserHistory.push("/credential/device")
            }
            else if( this.refs.u2f && this.refs.u2f.checked ) {
                browserHistory.push("/credential/u2f")
            }
            else if( this.refs.cryptophoto && this.refs.cryptophoto.checked ) {
                browserHistory.push("/credential/cryptophoto")
            }
            else {
                browserHistory.push("/credential/manage_account")
            }

        }

        availableFactors() {

            let session = this.props.session.credential;
            let account = session.account;
            let factors = account.factors;

            let res = [];

            if ( factors.google_authenticator ) {
                res.push(<div><span className="second_factor_already_setup">Google authenticator - setup</span><br/></div>)
            }

            if ( factors.device_fingerprint ) {
                res.push(<div><span className="second_factor_already_setup">Device fingerprint - setup</span><br/></div>)
            }

            if ( factors.u2f_key ) {
                res.push(<div><span className="second_factor_already_setup">U2F key - setup</span><br/></div>)
            }

            if ( factors.cryptophoto ) {
                res.push(<div><span className="second_factor_already_setup">Cryptophoto - setup</span><br/></div>)
            }


            if ( !factors.google_authenticator ) {
                res.push(
                    <label className="block-label" htmlFor="radio-1" key="radio-1">
                        <input ref="ga" id="radio-1" type="radio" name="radio-group"/>Google authenticator
                    </label>
                )
            }

            if ( !factors.device_fingerprint ) {
                res.push(
                    <label className="block-label" htmlFor="radio-2" key="radio-2">
                        <input ref="df" id="radio-2" type="radio" name="radio-group"/>Device fingerprint
                    </label>
                )
            }

            if ( !factors.u2f_key ) {
                res.push(
                    <label className="block-label" htmlFor="radio-3" key="radio-3">
                        <input ref="u2f" id="radio-3" type="radio" name="radio-group"/>U2F Key
                    </label>
                )
            }

            if ( !factors.cryptophoto ) {
                res.push(
                    <label className="block-label" htmlFor="radio-4" key="radio-4">
                        <input ref="cryptophoto" id="radio-4" type="radio" name="radio-group"/>Cryptophoto
                    </label>
                )
            }

            return res;

        }

        render() {

            let session = this.props.session.credential;
            let request = this.props.session.gg3.request;
            let account = session.account;
            console.log(session);

            return (
                <Govuk>
                    <Breadcrumb text={`${account.name}`}/>

                    <Question title="Add additionional second factors?" para="Adding additional authentication methods helps to protect you online. Choose how you would like us to athenticate you from the list below:">
                        {this.availableFactors()}

                        <label className="block-label" htmlFor="radio-400">
                            <input ref="none" id="radio-400" type="radio" name="radio-group"/>I'm done
                        </label>

                    </Question>

                    <br/>
                    <br/>
                    <a href="#next" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    <br/>
                    <br/>

                </Govuk>
            )
        }
    }
)

