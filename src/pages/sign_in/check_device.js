import Govuk from '../../components/govuk'
import Content from '../../components/content'
import React from 'react'
import Fingerprint from '../../components/fingerprint'
import {connect} from 'react-redux'
import QuestionPage from '../../utils/question_page'
import QRCode from 'qrcode.react';
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory, Link } from 'react-router'
import {saveGG3Session} from '../../reducers/helpers'

export default connect((state) => state) (
    class extends QuestionPage {

        onNext(e) {
            e.preventDefault();
            saveGG3Session( this.props.dispatch, {level: "2"});
            browserHistory.push("/logged_in")
        }

        onFingerprint(res) {
            let session = this.props.session.gg3;
            let account = session.account;

            let matched = false;
            let results = account.factors.device_fingerprint.devices.forEach( (d) => {
                if ( d.fingerprint == res ) {
                    matched = true;
                }
            });

            this.setState({current_fingerprint: res, matched: matched});
            console.log(matched)
        }

        render() {
            let session = this.props.session.gg3;
            let account = session.account;
            let request = session.request;
            let results = account.factors.device_fingerprint.devices.map( (d) => {

                return(
                    <tr>
                        <td>{d.device}</td>
                        <td><QRCode value={d.fingerprint} size={128}/></td>
                        <td>{d.fingerprint == this.state.current_fingerprint ? "Match" : ""}</td>
                    </tr>

                )
            });

            return (
                <Govuk>
                    <Breadcrumb text={`Sign in to ${request.name}  using your Government Gateway account`}/>
                    <Fingerprint onFingerprint={(res) => this.onFingerprint(res)}/>
                    <Content title="Checking your device fingerprint">
                        { this.state.current_fingerprint ? <QRCode value={this.state.current_fingerprint} size={128}/> : null }
                        <p>We need to match your current devices fingerprint to one you have saved</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Device</th>
                                    <th colSpan="2">Fingerprint</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results}
                            </tbody>
                        </table>
                    </Content>
                    <br/>
                    {this.state.matched ?

                        <a href="#" className="button" onClick={(e) => this.onNext(e)}>Device Matched</a> :
                        <Link to="/your_auth_factors" className="button">Device not Matched</Link>
                    }

                </Govuk>
            )
        }
    }
)