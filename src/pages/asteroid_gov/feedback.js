import React from 'react'
import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import TextareaField from '../../components/textarea_field'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import {saveGG3Session} from '../../reducers/helpers'


export default connect((state) => state) (
    class extends React.Component {

        render() {
            return(
                <Govuk title="Asteroidgov" hidePhaseBanner={true} header="ASTEROID.GOV">
                    <div className="asteroidgov"></div>
                    <Question title="Send your feeback" para="What do you think of this online service?">

                        <fieldset className="inline">
                            <legend className="visuallyhidden">What do you think of this online service?</legend>
                            <label for="feedback-rating-5" className="label--inlineRadio--overhead">Very<br/>good<br/>
                                <input type="radio" id="feedback-rating-5" name="feedback-rating" value="5"/>
                            </label>
                            <label for="feedback-rating-4" className="label--inlineRadio--overhead"><br/>Good<br/>
                                <input type="radio" id="feedback-rating-4" name="feedback-rating" value="4"/>
                            </label>
                            <label for="feedback-rating-3" className="label--inlineRadio--overhead"><br/>Neutral<br/>
                                <input type="radio" id="feedback-rating-3" name="feedback-rating" value="3"/>
                            </label>
                            <label for="feedback-rating-2" className="label--inlineRadio--overhead"><br/>Bad<br/>
                                <input type="radio" id="feedback-rating-2" name="feedback-rating" value="2"/>
                            </label>
                            <label for="feedback-rating-1" className="label--inlineRadio--overhead">Very<br/>bad<br/>
                                <input type="radio" id="feedback-rating-1" name="feedback-rating" value="1"/>
                            </label>
                        </fieldset>
                        <Field ref="name" name="name" labelText="Name" />
                        <Field ref="email" name="email" labelText="Email address" />
                        <TextareaField ref="comments" name="comments" labelText="Comments" labelHint="Limit is 2000 characters"/>

                    </Question>
                    <br/>
                    <br/>
                    <a href="/#" className="button" onClick={(e) => this.onNext(e)}>Send</a>
                    <br/>
                    <br/>
                </Govuk>
            )
        }

    }
)