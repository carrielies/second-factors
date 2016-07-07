import Govuk from '../../components/govuk'
import React from 'react'
import { browserHistory, Link } from 'react-router'
import JSONTree from 'react-json-tree'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends React.Component {

        componentDidMount() {
            setTimeout( () => {
                browserHistory.push("/signin")
            },2)
        }

        render() {
            let service = this.props.service || {};
            return (
                <Govuk>
                    <h1 className="heading-medium">Redirecting to Government Gateway...</h1>

                    <JSONTree data={service.request} isLightTheme={false} expandAll={true} hideRoot={true}/>
                </Govuk>
            )
        }

    }
)
