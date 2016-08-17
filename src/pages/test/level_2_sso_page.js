import React from 'react'
import Govuk from '../../components/govuk'
import AsteriodGovAuthPage from '../../utils/asteroidgov_auth_page'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import {saveGG3Session} from '../../reducers/helpers'
import BehindTheScenes from '../../components/credentials_behind_the_scenes'

export default connect((state) => state) (
    class extends AsteriodGovAuthPage {
        constructor(props) {
            super(props);
            this.authenticate("2","2")
        }

        render() {
            return (
                <Govuk title={this.serviceName()}  hidePhaseBanner={true} header="Test.GOV">
                    <h1 className="heading-medium">Level 2 SSO Page</h1>
                    <br/>
                    <br/>
                    <Link to="/test/level_1_required">Test Level 1 Required</Link>
                    <br/>
                    <br/>
                    <Link to="/test/level_2_required">Test Level 2 Required</Link>
                    <br/>
                    <br/>
                    <Link to="/test/level_2_desired">Test Level 2 Desired</Link>
                    <br/>
                    <br/>
                    <Link to="/test/level_2_none_repudiation">Test Level 2 Repudiation</Link>
                    <br/>
                    <br/>
                    <Link to="/test/level_2_sso">Test Level 2 SSO</Link>
                        <hr/>
                        <BehindTheScenes/>
                </Govuk>
            )
        }
    }
)