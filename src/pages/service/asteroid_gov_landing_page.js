import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import Question from '../../components/question'
import QuestionPage from '../../utils/question_page'
import StoreHelper from '../../utils/store_helper'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import JSONTree from 'react-json-tree'
import Field from '../../components/field'
import BehindTheScenes from '../../components/service_behind_the_scenes'

export default connect((state) => state) (
    class extends QuestionPage {

        render() {
            let resp = this.props.session.gg3.response

            return(
                <Govuk title="Asteroidgov" hidePhaseBanner={true} header="ASTEROID.GOV">
                    <div className="asteroidgov"></div>
                    <Content title={`Hello ${resp.name}`}>

                        <h1 className="heading-small">We trust you to level {resp.level}</h1>
                    </Content>
                    <hr/>
                    <BehindTheScenes/>

                </Govuk>
            )

        }


    }
)