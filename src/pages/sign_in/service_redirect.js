import Govuk from '../../components/govuk'
import React from 'react'
import { browserHistory, Link } from 'react-router'
import JSONTree from 'react-json-tree'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends React.Component {

        componentDidMount() {

            if ( this.props.debug ) {
                setTimeout(() => {
                    browserHistory.replace("/signin")
                }, 2000)
            }
            else {
                browserHistory.replace("/signin")
            }
        }

        render() {
            let session = this.props.session.gg3;
            return (
                <Govuk title={session.request.name}>
                    <h1 className="heading-medium">Redirecting to Government Gateway...</h1>
                    {this.props.debug ?
                        <JSONTree data={gg3.request} isLightTheme={false} expandAll={true} hideRoot={true}/> : null }
                </Govuk>
            )
        }

    }
)
