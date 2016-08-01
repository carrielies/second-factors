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
                name: "Spacegov Trust Store",
                auth_level_required: "1",
                auth_level_desired: "1",
                redirect_url: "/spacegov/trust_store/landing_page",
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
            browserHistory.push("/signin")
        }

        render() {
            return(
                <Govuk title="Spacegov" hidePhaseBanner={true} header="SPACE.GOV">
                    <div className="spacegov"></div>
                    <Content title="Spacegov Trust Store Helpdesk Service">
                        <p>
                            This can be used to lookup details from the Spacegov Trust Store
                        </p>
                    </Content>
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.onClick(e)}>Sign into Spacegov Trust Store Service</a>
                    <hr/>

                    <details>

                        <summary><span class="summary">Behind the scenes stuff...</span></summary>

                        <div class="panel panel-border-narrow">

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