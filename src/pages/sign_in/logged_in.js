import Govuk from '../../components/govuk'
import React from 'react'
import { browserHistory, Link } from 'react-router'
import JSONTree from 'react-json-tree'
import {connect} from 'react-redux'
import fecha from 'fecha'
import {saveGG3Session} from '../../reducers/helpers'
import {saveInteraction, findAccount} from '../../utils/database'

export default connect((state) => state) (
    class extends React.Component {

        componentDidMount() {

            let session = this.props.session.gg3;
            let account = session.account;
            let request = session.request;

            let time = fecha.format(new Date(), 'DD/MM/YY HH:mm:ss');

            findAccount(account.gg_id).then( (a) => {
                let response = {
                        level: session.level,
                        trust_id: a.trust_id,
                        trust_id_level_2: a.trust_id_level_2,
                        name: a.name,
                        email: a.email,
                        gg_id: a.gg_id,
                        group_id: a.group_id,
                        status: a.status || "Active",
                        org_name: a.org_name || "",
                        last_logged_in: time
                };
                saveGG3Session(this.props.dispatch, {response, signed_in: true, service_name: request.name});
                saveInteraction(a.gg_id, "sign_in", request.name);

                if ( this.props.debug ) {
                    setTimeout(() => {
                        browserHistory.push(request.redirect_url)
                    }, 2)
                }
                else {
                    browserHistory.push(request.redirect_url)
                }
            });

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
