import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import Question from '../../components/question'
import QuestionPage from '../../utils/question_page'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import JSONTree from 'react-json-tree'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'
import {findEnrolment} from '../../utils/spacegov_db'
import {saveGG3Session, saveSpacegovSession} from '../../reducers/helpers'


export default connect((state) => state) (
    class extends QuestionPage {

        render() {
            let session = this.props.session.spacegov;
            let gg3 = this.props.session.gg3;
            let request = gg3.request;
            let resp = gg3.response;

            return(
                    <Govuk title="Spacegov" hidePhaseBanner={true} header="SPACE.GOV">
                        <div className="spacegov"></div>

                        <div className="grid-row">
                            <div className="column-one-half">
                                <h1 className="heading-medium">What would you like to do?</h1>
                                <Link to="/spacegov/trust_store/search" className="button">Search for User</Link>
                            </div>
                        </div>

                    </Govuk>
            );

        }
    }
)