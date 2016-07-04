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
            if( this.refs.ga.checked ) {
                browserHistory.push("/register/ga")
            }
            if( this.refs.none.checked ) {
                browserHistory.push("/register/device")
            }

        }

        render() {

            return (
                <Govuk>
                    <Breadcrumb text="Register for Government Gateway"/>

                    <Question title="Setup two step verification?" para="Adding additional authentication methods helps to protect you online. Choose how you would like us to athenticate you from the list below:">
                        <p>{this.props.extraText}</p>
                        <label className="block-label" for="radio-1">
                            <input ref="ga" id="radio-1" type="radio" name="radio-group"/>Google authenticator
                        </label>
                        <label className="block-label" for="radio-2">
                            <input ref="none" id="radio-2" type="radio" name="radio-group"/>Don't use two step verification
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

