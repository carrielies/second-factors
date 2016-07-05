import Govuk from '../../components/govuk'
import React from 'react'
import { browserHistory, Link } from 'react-router'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends React.Component {

        componentDidMount() {
            let account = this.props.account;

            let res = {
                response_from_gw: {
                    level: account.two_fa_passed ? "2" : "1",
                    trust_id: "6876Ff876W868SD787",
                    name: "Marky Mid",
                    cred_id: "1543245377",
                    last_logged_in: "01/12/2016 09:25"
                }
            };
            
            this.props.dispatch( {type: 'SAVE_SERVICE_TO_SERVER', data: {...res}  });

            
            setTimeout( () => {
                browserHistory.push(this.props.service.redirect_url)
            },2000)
        }

        render() {
            return (
                <Govuk>
                    <h1 className="heading-medium">Redirecting...</h1>
                </Govuk>
            )
        }

    }
)
