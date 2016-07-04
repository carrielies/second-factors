import React from 'react'
import GovUk from '../components/govuk'
import Server from '../components/server'
import { browserHistory } from 'react-router'

import {connect} from 'react-redux'
export default connect((state) => state) (
    class extends React.Component {

        onNext(e, url, email) {
            if ( !email ) return;
            e.preventDefault();
            let server = new Server(this.props.server);
            let account = server.findByEmail(email);
            this.props.dispatch({type: "SAVE_ACCOUNT", data: {...account}});
            browserHistory.push(url)
        }

        render() {
            return (
                <GovUk>
                    <br/>
                    <a href="/ga" className="button" onClick={(e) => this.onNext(e, "/ga", "marky@gmail.com")}>Google authenticator</a>
                    <br/>
                    <br/>
                    <a href="/check_device" className="button" onClick={(e) => this.onNext(e, "/check_device", "marky@gmail.com")}>Check Device</a>
                    <br/>
                    <br/>
                    <a href="/register" className="button" onClick={(e) => this.onNext(e, "/register")}>Register</a>

                    <br/>
                    <br/>
                    <a href="/register/summary" className="button" onClick={(e) => this.onNext(e, "/register/summary", "marky@gmail.com")}>Summary</a>

                </GovUk>
            )
        }
    }
)