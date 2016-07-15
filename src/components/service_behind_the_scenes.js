import React from 'react'
import Content from './content'
import StoreHelper from '../utils/store_helper'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends React.Component {

        render() {
            let service = this.props.service;
            let resp = service.response_from_gw;
            let request = service.request;

            return(
                <details>

                    <summary><span class="summary">Behind the scenes stuff...</span></summary>

                    <div class="panel panel-border-narrow">

                        <h1 className="heading-small">OpenId/SAML Request issued by service</h1>
                        <div className="grid-row">
                            <div className="column-two-thirds">
                                <textarea ref="request" cols="70" rows="6" value={JSON.stringify(request, null, 2)}/>
                            </div>
                            <div className="column-one-third">
                            </div>

                        </div>
                        <h1 className="heading-small">Gateway Response</h1>
                        <div className="grid-row">
                            <div className="column-two-thirds">
                                <textarea ref="request" cols="70" rows="6" value={JSON.stringify(resp, null, 2)}/>
                            </div>
                            <div className="column-one-third">
                            </div>
                        </div>
                        <h1 className="heading-small">{request.name} trust store</h1>
                        <div className="grid-row">
                            <div className="column-two-thirds">
                                <textarea ref="request" cols="70" rows="6" value={JSON.stringify(service.enrolled_users, null, 2)}/>
                            </div>
                            <div className="column-one-third">
                            </div>
                        </div>
                        <h1 className="heading-small">Cookie</h1>
                        <div className="grid-row">
                            <div className="column-two-thirds">
                                <textarea ref="request" cols="70" rows="6" value={JSON.stringify(this.props.cookie, null, 2)}/>
                            </div>
                            <div className="column-one-third">
                            </div>
                        </div>

                    </div>

                </details>
            )
        }
    }
)