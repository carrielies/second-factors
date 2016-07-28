import React from 'react'
import Content from './content'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends React.Component {

        render() {

            let session = this.props.session.spacegov;
            let gg3 = this.props.session.gg3;
            let resp = gg3.response;
            let request = gg3.request;

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
                        <h1 className="heading-small">GG3 session</h1>
                        <div className="grid-row">
                            <div className="column-two-thirds">
                                <textarea ref="request" cols="70" rows="6" value={JSON.stringify(gg3, null, 2)}/>
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
                                <textarea ref="request" cols="70" rows="6" value={JSON.stringify(session, null, 2)}/>
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