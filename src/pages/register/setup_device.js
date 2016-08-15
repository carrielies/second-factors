import Govuk from '../../components/govuk'
import Content from '../../components/content'
import React from 'react'
import Fingerprint from '../../components/fingerprint'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'
import {saveRegistrationSession} from '../../reducers/helpers'
import {updateAccount, findAccount} from '../../utils/database'

import {connect} from 'react-redux'
export default connect((state) => state) (
    class extends QuestionPage {

        constructor(props) {
            super(props);
            this.state = { errors: {} }
        }

        componentDidMount() {
            let session = this.props.session.registration;
            findAccount(session.gg_id).then( (account) => {
                saveRegistrationSession(this.props.dispatch, {account})
            });
        }

        onNext(e) {
            this.validate(e,{
                deviceName: {msg: "Enter a name for your device", summary: "You need to enter a device name", regEx: /\w+/}
            }, (props) => {


                let session = this.props.session.registration;
                let account = session.account;

                account.factors.device_fingerprint = {
                    devices: [
                        {
                            device: props.deviceName,
                            fingerprint: this.refs.fp.secret()
                        }
                    ]
                };

                updateAccount(account).then( () => {
                    browserHistory.push("/register/your_auth_factors")
                });

                saveRegistrationSession(this.props.dispatch, {level: "2"});
            })
        }


        render() {
            let session = this.props.session.registration;
            let request = this.props.session.gg3.request;

            return (

                <Govuk>

                    <Breadcrumb text={`Register for ${request.name}`}/>

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