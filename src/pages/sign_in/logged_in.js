import Govuk from '../../components/govuk'
import React from 'react'
import { browserHistory, Link } from 'react-router'
import JSONTree from 'react-json-tree'
import {connect} from 'react-redux'
import fecha from 'fecha'
import {saveGG3Session} from '../../reducers/store_helpers'
import {saveInteraction} from '../../utils/database'

export default connect((state) => state) (
    class extends React.Component {

        componentDidMount() {

            let session = this.props.session.gg3;
            let account = session.account;
            let request = session.request;

            let time = fecha.format(new Date(), 'DD/MM/YY HH:mm:ss');
            let response = {
                    level: session.level,
                    trust_id: account.trust_id,
                    name: account.name,
                    email: account.email,
                    last_logged_in: time
            };
            saveGG3Session(this.props.dispatch, {response, signed_in: true, service_name: request.name});
            saveInteraction(account.email, "sign_in", request.name);

            if ( this.props.debug ) {
                setTimeout(() => {
                    browserHistory.push(request.redirect_url)
                }, 2)
            }
            else {
                browserHistory.push(request.redirect_url)
            }
        }

        render() {
            let session = this.props.session.gg3;
            let request = session.request;

            return (
                <Govuk title="Government Gateway">
                    <h1 className="heading-medium">Redirecting...</h1>
                    {this.props.debug ?
                        <JSONTree data={response} isLightTheme={false} expandAll={true} hideRoot={true}/> : null }
                </Govuk>
            )
        }

    }
)
