import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import Question from '../../components/question'
import QuestionPage from '../../utils/question_page'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import Field from '../../components/field'
import {findEnrolment, updateEnrolment} from '../../utils/spacegov_db'

export default connect((state) => state) (
    class extends QuestionPage {

        onNext(e) {

            this.validate(e, {
                secret: {msg: "You need to enter an amount", summary: "Enter your station tax bill", regEx: /\w+/},
            }, (props) => {
                let resp = this.props.session.gg3.response;
                findEnrolment(resp.gg_id).then( (enrolment) => {
                    enrolment.trust_id = resp.trust_id;
                    enrolment.trust_id_level_2 = resp.trust_id_level_2;
                    return updateEnrolment(enrolment)
                }).then( () => {
                    browserHistory.push("/service/landing_page")
                });
            })
        }

        render() {

            let resp = this.props.session.gg3.response;

            return(
                <Govuk title="Spacegov" hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>
                    <Question title={`Hello ${resp.name}`} errors={this.state.errors}>
                        <p>We need to check that it really is you.</p>
                        <Field ref="secret" name="secret" labelText="What was your last station tax bill to the nearest pound ?" errors={this.state.errors}/>
                        <a href="#" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    </Question>
                </Govuk>
            );

        }

    }
)