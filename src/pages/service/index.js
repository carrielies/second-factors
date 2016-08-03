import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import {connect} from 'react-redux'
import {saveGG3Session} from '../../reducers/helpers'

export default connect((state) => state) (
    class extends React.Component {

        constructor(props) {
            super(props);

            let request = {
                name: "Spacegov",
                auth_level_required: "1",
                auth_level_desired: "1",
                redirect_url: "/service/landing_page",
                help: {
                    url_text: "Help using SPACE.GOV",
                    url_link: "/service/help"
                },
                feedback_url : "/service/feedback"
            };

            this.state = {request: JSON.stringify(request, null, 2)}
        }

        handleRequestChange(event) {
            this.setState({request: event.target.value});
        }

        onClick(e) {
            e.preventDefault();
            let request = JSON.parse(this.state.request);
            saveGG3Session(this.props.dispatch, {request})
            //
            //
            // this.props.dispatch( {type: 'SAVE_SERVICE', data: {
            //     request
            // }});
            browserHistory.push("/signin")
        }

        render() {
            return(
                <Govuk title="Spacegov" hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>
                    <Content title="Your Space Portal">
                        <p>
                            For your spacefaring adventures, aquisitions and licensing sign into Spacegov using your Government Gateway account.

                        </p>
                    </Content>
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.onClick(e)}>Sign into Spacegov</a>
                    <hr/>

                    <details>

                        <summary><span className="summary">Behind the scenes stuff...</span></summary>

                        <div className="panel panel-border-narrow">

                            <h1 className="heading-small">OpenId Request</h1>
                            <div className="grid-row">
                                <div className="column-two-thirds">
                                    <textarea ref="request" cols="70" rows="6" onChange={ (e) => this.handleRequestChange(e)}  value={this.state.request}/>
                                </div>
                                <div className="column-one-third">
                                </div>
                            </div>
                        </div>
                    </details>

                </Govuk>
            )
        }

    }
)