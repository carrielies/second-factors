import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import Content from '../../components/content'
import { browserHistory } from 'react-router'
import Notice from '../../components/notice'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {

        onNext(e) {
            e.preventDefault();
            if( this.refs.ga && this.refs.ga.checked ) {
                browserHistory.push("/register/ga")
            }
            if( this.refs.df && this.refs.df.checked ) {
                browserHistory.push("/register/device")
            }
            if( this.refs.u2f && this.refs.u2f.checked ) {
                browserHistory.push("/register/u2f")
            }
            if( this.refs.cryptophoto && this.refs.cryptophoto.checked ) {
                browserHistory.push("/register/cryptophoto")
            }

            if( this.refs.none.checked ) {
                browserHistory.push("/register/summary")
            }

        }

        availableFactors() {

            let session = this.props.session.registration;

            let res = [];

            if ( session.google_authenticator ) {
                res.push(<div><span className="second_factor_already_setup">Google authenticator - setup</span><br/></div>)
            }

            if ( session.device_fingerprint ) {
                res.push(<div><span className="second_factor_already_setup">Device fingerprint - setup</span><br/></div>)
            }

            if ( session.u2f_key ) {
                res.push(<div><span className="second_factor_already_setup">U2F key - setup</span><br/></div>)
            }

            if ( session.cryptophoto ) {
                res.push(<div><span className="second_factor_already_setup">Cryptophoto - setup</span><br/></div>)
            }


            if ( !session.google_authenticator ) {
                res.push(
                    <label className="block-label" htmlFor="radio-1" key="radio-1">
                        <input ref="ga" id="radio-1" type="radio" name="radio-group"/>Google authenticator
                    </label>
                )
            }

            if ( !session.device_fingerprint ) {
                res.push(
                    <label className="block-label" htmlFor="radio-2" key="radio-2">
                        <input ref="df" id="radio-2" type="radio" name="radio-group"/>Device fingerprint
                    </label>
                )
            }

            if ( !session.u2f_key ) {
                res.push(
                    <label className="block-label" htmlFor="radio-3" key="radio-3">
                        <input ref="u2f" id="radio-3" type="radio" name="radio-group"/>U2F Key
                    </label>
                )
            }

            if ( !session.cryptophoto ) {
                res.push(
                    <label className="block-label" htmlFor="radio-4" key="radio-4">
                        <input ref="cryptophoto" id="radio-4" type="radio" name="radio-group"/>Cryptophoto
                    </label>
                )
            }

            return res;

        }

        render() {

            let session = this.props.session.registration;
            let request = this.props.session.gg3.request;
            console.log(session);

            return (
                <Govuk>
                    <Breadcrumb text={`Register for ${request.name}`}/>

                    <Question title="Setup two step verification?" para="Adding additional authentication methods helps to protect you online. Choose how you would like us to athenticate you from the list below:">
                        {this.availableFactors()}

                        <label className="block-label" htmlFor="radio-400">
                            <input ref="none" id="radio-400" type="radio" name="radio-group"/>I'm done
                        </label>
                        
                    </Question>

                    <Content>
                        <Notice priority="information">If you don't use two step verification, you may be asked to complete additional steps</Notice>
                    </Content>

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

