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
                <Govuk title="Spacegov" hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>
                    <Content title="Contact" para="">
                        <p>
                            Contact your local SPACE.GOV representative.
                            <br/>
                            <br/>
                            <ul>
                                  <li>
                                    Help Desk : <a href="/service/contact">0191 999 1234</a>
                                    <p>Your help desk contact number</p>
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