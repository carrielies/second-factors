import React from 'react'
import Govuk from '../../components/govuk'
import Question from '../../components/question'
import QuestionPage from '../../utils/question_page'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import {saveGG3Session} from '../../reducers/helpers'

export default connect((state) => state) (
    class extends QuestionPage {
        constructor(props) {
            super(props);
            if (!props || !props.session || !props.session.gg3 || !props.session.gg3.response) {
                let request = {
                    name: "Test",
                    auth_level_required: "1",
                    auth_level_desired: "1",
                    redirect_url: "/test/level_1_required",
                    help: {
                        url_text: "Help using SPACE.GOV",
                        url_link: "/service/help"
                    },
                    feedback_url : "/test/feedback"
                };
                saveGG3Session(this.props.dispatch, {request})
                browserHistory.push("/signin")
                return;
            }
        }

        render() {
            return (
                <Govuk title="Test" hidePhaseBanner={true} header="Test.GOV">
                    <h1 className="heading-medium">Level 1 Required Page</h1>
                    <br/>
                    <br/>
                    <Link to="/test/level_1_required">Test Level 1 Required</Link>
                    <br/>
                    <br/>
                    <Link to="/test/level_2_required">Test Level 2 Required</Link>
                    <br/>
                    <br/>
                    <Link to="/test/level_2_desired">Test Level 2 Desired</Link>
                </Govuk>
            )
        }
    }
)