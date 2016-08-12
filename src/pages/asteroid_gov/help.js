import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import {saveGG3Session} from '../../reducers/helpers'

export default connect((state) => state) (
    class extends React.Component {

        render() {
            return(
                <Govuk title="Asteroidgov" hidePhaseBanner={true} header="ASTEROID.GOV">
                    <div className="asteroidgov"></div>
                    <Content title="Help using ASTEROID.GOV">
                        <p>
                            Find out about ASTEROID.GOV, including the use of cookies, accessibility of the site, the privacy policy and terms and conditions of use.
                            <br/>
                            <br/>
                            <ul>
                                  <li>
                                    <Link to="/service/contact">Contact us</Link>
                                    <p>Details of how to contact us</p>
                                  </li>
                                  <li>
                                    <a href="/help/about-govuk">About ASTEROID.GOV</a>
                                    <p>Information about the website and the team that are building it</p>
                                  </li>
                                  <li>
                                    <a href="/help/accessibility">Accessibility</a>
                                    <p>Details of accessibility and help using the internet</p>
                                  </li>
                                  <li>
                                    <a href="/help/beta">Beta services on ASTEROID.GOV</a>
                                    <p>How new services are developed on ASTEROID.GOV and what it means for users</p>
                                  </li>
                                  <li>
                                    <a href="/help/browsers">Browsers</a>
                                    <p>Information about browsers and how to upgrade yours</p>
                                  </li>
                                  <li>
                                    <a href="/help/cookies">Cookies</a>
                                    <p>How cookies are used on ASTEROID.GOV and each cookie’s purpose</p>
                                  </li>
                                  <li>
                                    <a href="/help/privacy-policy">Privacy policy</a>
                                    <p>SPACE.GOV’s approach to users’ privacy</p>
                                  </li>
                                  <li>
                                    <a href="/help/terms-conditions">Terms and conditions</a>
                                    <p>Information about the use of ASTEROID.GOV and liability</p>
                                  </li>
                             </ul>
                        </p>
                    </Content>
                    <br/>

                </Govuk>
            )
        }

    }
)