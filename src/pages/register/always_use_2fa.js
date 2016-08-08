import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import React from 'react'
import { browserHistory } from 'react-router'

import {connect} from 'react-redux'
import {saveRegistrationSession} from '../../reducers/helpers'
import {updateAccount, saveInteraction} from '../../utils/database'

export default connect((state) => state) (

    class extends QuestionPage {


        onClick(e) {
            e.preventDefault();

            let gg3 = this.props.session.gg3;
            let session = this.props.session.registration;
            let account = session.account;

            if ( this.refs.yes.checked ) {
                account.always_use_2fa = true;
                updateAccount( account ).then( () => {
                    browserHistory.push("/register/summary")
                })
            }

            if ( this.refs.no.checked ) {
                account.always_use_2fa = false;
                updateAccount( account ).then( () => {
                    browserHistory.push("/register/summary")
                })
            }
        }

        render() {
            let session = this.props.session.registration;
            let request = this.props.session.gg3.request;

            return(
                <Govuk title="Credential Management">
                    <Breadcrumb text={`Register for ${request.name}`}/>
                    <Question title="Always ask for a second authentication factor?">
                        <fieldset className="inline">
                            <label className="block-label">
                                <input id="yes" type="radio" name="radio-group" value="Yes" ref="yes"/>Yes
                            </label>
                            <label className="block-label">
                                <input id="no" type="radio" name="radio-group" value="No" ref="no"/>No
                            </label>
                        </fieldset>
                    </Question>
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.onClick(e)}>Continue</a>


                </Govuk>
            )
        }
    }
)
