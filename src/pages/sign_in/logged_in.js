import Govuk from '../../components/govuk'
import React from 'react'
import { browserHistory, Link } from 'react-router'
import JSONTree from 'react-json-tree'
import StoreHelper from '../../utils/store_helper'
import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends React.Component {

        componentDidMount() {

            let store = new StoreHelper(this.props);
            let account = store.account;
            let service = store.service;

            let res = {
                response_from_gw: {
                    level: account.two_fa_passed ? "2" : "1",
                    trust_id: account.trust_id,
                    name: account.name,
                    email: account.email,
                    cred_id: account.cred_id,
                    last_logged_in: "01/12/2016 09:25"
                }
            };

            let cookie = {
                cred_id: account.cred_id,
                level: account.two_fa_passed ? "2" : "1",
                service_name: service.request.name,
                email: account.email
            };
            
            store.saveService( res );
            store.saveCookie(cookie);
            store.saveInteraction( "sign_in", service.request.name );

            if ( this.props.debug ) {
                setTimeout(() => {
                    browserHistory.push(this.props.service.request.redirect_url)
                }, 2)
            }
            else {
                browserHistory.push(this.props.service.request.redirect_url)
            }
        }

        render() {
            let service = this.props.service || {};

            return (
                <Govuk title="Government Gateway">
                    <h1 className="heading-medium">Redirecting...</h1>
                    {this.props.debug ?
                        <JSONTree data={service.response_from_gw} isLightTheme={false} expandAll={true} hideRoot={true}/> : null }
                </Govuk>
            )
        }

    }
)
