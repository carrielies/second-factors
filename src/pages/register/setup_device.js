import Govuk from '../../components/govuk'
import Content from '../../components/content'
import React from 'react'
import Fingerprint from '../../components/fingerprint'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'
import {saveRegistrationSession} from '../../reducers/store_helpers'

import {connect} from 'react-redux'
export default connect((state) => state) (
    class extends QuestionPage {

        constructor(props) {
            super(props);
            this.state = { errors: {} }
        }

        onNext(e) {
            this.validate(e,{
                deviceName: {msg: "Enter a name for your device", summary: "You need to enter a device name", regEx: /\w+/}
            }, (props) => {


                // let factors = { ...this.props.account.factors,
                //     device_fingerprint: {
                //         devices: [
                //             {
                //                 device: props.deviceName,
                //                 fingerprint: this.refs.fp.secret()
                //             }
                //
                //         ]
                //     }
                // };

                saveRegistrationSession(this.props.dispatch, {
                    device_fingerprint: {
                        device: props.deviceName,
                        fingerprint: this.refs.fp.secret()
                    }
                });

                // this.props.dispatch( {type: 'SAVE_ACCOUNT', data: {factors: factors, two_fa_passed: true} })
                browserHistory.push("/register/your_auth_factors");
            })
        }


        render() {
            return (

                <Govuk>

                    <Breadcrumb text={`Register for ${this.props.service.request.name}`}/>

                    <Question title="Trust this device?" para="" errors={this.state.errors}>
                        <Fingerprint ref="fp" qrcodeSize={128}/>
                        <Content>
                            <p>This code uniquely identifies your smart phone, tablet, laptop or computer and
                                forms part of your digital signature.
                            </p>
                        </Content>
                        <Field ref="deviceName" name="deviceName" errors={this.state.errors} labelText="Device Name" labelHint="ie. home-laptop "/>
                    </Question>


                    <br/>
                    <a href="#" className="button" onClick={(e) => this.onNext(e)}>Trust this device</a>
                    <br/>
                    <br/>
                </Govuk>
            )
        }
    }
)