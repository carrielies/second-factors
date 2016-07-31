import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import Notice from '../../components/notice'
import {saveGG3Session, saveSpacegovSession} from '../../reducers/helpers'
import {findAccountByEmailAndPassword, findAccount} from '../../utils/database'


import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {

        componentDidMount() {
            let session = this.props.session.gg3;
            let account = session.account;
            let request = session.request;
            if( request.auth_level_required === "1" && request.auth_level_desired === "1" && account.always_use_2fa != true) {
                browserHistory.push("/logged_in")
            }

            findAccount(session.account.gg_id).then( (account) => {
                saveGG3Session(this.props.dispatch, {account});
            })

        }

        onNext(e) {
            e.preventDefault();
            if( this.refs.ga && this.refs.ga.checked ) {
                browserHistory.push("/ga")
            }

            if( this.refs.df && this.refs.df.checked ) {
                browserHistory.push("/check_device")
            }

            if( this.refs.u2f && this.refs.u2f.checked ) {
                browserHistory.push("/u2f")
            }

            if( this.refs.cryptophoto && this.refs.cryptophoto.checked ) {
                browserHistory.push("/cryptophoto")
            }

            if( this.refs.none && this.refs.none.checked ) {
                browserHistory.push("/logged_in")
            }

        }



        authFactors() {

            let handlers = {
                google_authenticator: () => {
                    return(
                        <label className="block-label" htmlFor="radio-1" key="radio-1">
                            <input ref="ga" id="radio-1" type="radio" name="radio-group"/>Google authenticator
                        </label>
                    )
                },
                password: () => {
                    return(
                        null
                    )
                },
                device_fingerprint: () => {
                    return(
                        <label className="block-label" htmlFor="radio-2" key="radio-2">
                            <input ref="df" id="radio-2" type="radio" name="radio-group"/>Device fingerprint
                        </label>
                    )
                },
                u2f_key: () => {
                    return(
                        <label className="block-label" htmlFor="radio-3" key="radio-3">
                            <input ref="u2f" id="radio-3" type="radio" name="radio-group"/>U2F key
                        </label>
                    )
                },
                cryptophoto: () => {
                    return(
                        <label className="block-label" htmlFor="radio-4" key="radio-4">
                            <input ref="cryptophoto" id="radio-4" type="radio" name="radio-group"/>Cryptophoto
                        </label>
                    )
                }

            };

            let session = this.props.session.gg3;
            let list = [];

            Object.keys(session.account.factors).forEach( (k) => {
                let entry = handlers[k]();
                if (entry) list.push(entry)
            });

            return list;
        }


        manageAccount(e) {
            e.preventDefault();

            // let request = this.props.session.gg3.request;

            let request = {
                name: "Credential Management",
                auth_level_required: "1",
                auth_level_desired: "1",
                redirect_url: "/credential/landing_page",
                calling_service_request: this.props.session.gg3.request
            };
            saveGG3Session(this.props.dispatch, {request});
            browserHistory.push("/service_redirect");
        }


        render() {

            let session = this.props.session.gg3;
            let account = session.account;
            let factors = this.authFactors();
            let request = session.request;
            let factors_not_setup = null;
            let has_factors = factors.length != 0;

            if ( !has_factors ) {
                factors_not_setup =
                    <div>
                        <h1 className="heading-small">You don't have a second factor set up</h1>
                        <a href="#" onClick={(e) => this.manageAccount(e) }>Setup a second factor</a>
                    </div>

            }




            if ( account.always_use_2fa ) {
                return (
                    <Govuk>
                        <Breadcrumb text={`Sign in to ${request.name} using your Government Gateway account`}/>

                        <Question title="Two step verification?" para={`You have previously indicated that you always want to use a second factor when authenticating.`}>
                            {this.authFactors()}
                        </Question>
                        <Content>
                            <Notice priority="information">You must use a second factor to authenticate. </Notice>
                        </Content>
                        {factors_not_setup}

                        <br/>
                        <br/>
                        {has_factors ? <a href="#next" className="button" onClick={(e) => this.onNext(e)}>Continue</a> : null }
                        <br/>
                        <br/>
                        <details>
                            <summary><span className="summary">Having problems ?</span></summary>
                            <div className="panel panel-border-narrow">
                                <p>
                                    <a href="#" onClick={(e) => this.manageAccount(e) }>Setup a second factor</a>
                                    <br/>
                                    <br/>
                                    <Link to="/register">Cancel</Link>
                                </p>
                            </div>
                        </details>

                        <br/>
                        <br/>

                    </Govuk>
                )
            }

            if ( request.auth_level_required === "1" && request.auth_level_desired === "1" && account.always_use_2fa != true) {
                return (
                    <Govuk>
                        <Breadcrumb text={`Sign in to ${request.name} using your Government Gateway account`}/>
                        <Content title="Two step verification?">
                            <p>
                                {request.name} does not require a second authentication factor
                            </p>
                            <Link className="button" to="/logged_in">Continue</Link>

                        </Content>
                    </Govuk>
                )
            }
            else if ( request.auth_level_required === "1"  && request.auth_level_desired === "2" ) {
                factors.push(
                    <label className="block-label" htmlFor="radio-200">
                        <input ref="none" id="radio-200" type="radio" name="radio-group"/>Don't use two step verification
                    </label>
                );


                return(
                    <Govuk>
                        <Breadcrumb text={`Sign in to ${request.name} using your Government Gateway account`}/>

                        <Question title="Two step verification?" para={`${request.name} would like you to use a second authentication factor`}>
                            {factors}
                        </Question>
                        <Content>
                            <Notice priority="information">If you don't use two step verification, you may be asked to complete additional steps</Notice>
                        </Content>
                        {factors_not_setup}

                        <br/>
                        <br/>
                        <a href="#next" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                        <br/>
                        <br/>
                        <details>
                            <summary><span className="summary">Having problems ?</span></summary>
                            <div className="panel panel-border-narrow">
                                <p>
                                    <a href="#" onClick={(e) => this.manageAccount(e) }>Setup a second factor</a>
                                    <br/>
                                    <br/>
                                    <Link to="/register">Cancel</Link>
                                </p>
                            </div>
                        </details>


                    </Govuk>
                )
            }
            else {
                return(
                    <Govuk>
                        <Breadcrumb text={`Sign in to ${request.name} using your Government Gateway account`}/>

                        <Question title="Two step verification?" para={`${request.name} would like you to use a second authentication factor`}>
                            {this.authFactors()}
                            {factors_not_setup}
                        </Question>
                        <Content>
                            <Notice priority="information">You must use a second factor to authenticate. </Notice>
                        </Content>

                        <br/>
                        <br/>
                        {has_factors ? <a href="#next" className="button" onClick={(e) => this.onNext(e)}>Continue</a> : null }
                        <br/>
                        <br/>
                        <details>
                            <summary><span className="summary">Having problems ?</span></summary>
                            <div className="panel panel-border-narrow">
                                <p>
                                    <a href="#" onClick={(e) => this.manageAccount(e) }>Setup a second factor</a>
                                    <br/>
                                    <br/>
                                    <Link to="/register">Cancel</Link>
                                </p>
                            </div>
                        </details>

                        <br/>
                        <br/>

                    </Govuk>
                )
            }
        }
    }
)

