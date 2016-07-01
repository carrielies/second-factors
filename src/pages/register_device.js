import Govuk from '../components/govuk'
import Content from '../components/content'
import React from 'react'
import Fingerprint from '../components/fingerprint'
import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends React.Component {

        onNext(e) {

        }

        render() {

            return (

                <Govuk phaseBanner="true">

                    {this.props.breadcrumb}

                    <Content title="Your device fingerprint">
                        <Fingerprint/>
                        <h2>{this.props.account.fingerprint}</h2>
                    </Content>
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.onNext(e)}>Continue</a>
                    <br/>
                    <br/>
                </Govuk>
            )
        }
    }
)