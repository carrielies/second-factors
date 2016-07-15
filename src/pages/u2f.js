import React from 'react'
import GovUk from '../components/govuk'
import StoreHelper from '../utils/store_helper'
import { browserHistory, Link } from 'react-router'
// var u2fapi  = require( 'u2f-client' );
var u2fServer  = require( 'u2f' );
import {connect} from 'react-redux'
//import u2fapi from 'u2f-api-polyfill'

export default connect((state) => state) (
    class extends React.Component {

        constructor() {
            super();
            this.state = {};
        }

        onClick(e) {
            let appId = "https://localhost:3000";
            let req = u2fServer.request(appId);
            this.setState( {resp: "running..."});
            u2f.register( [req], [], (resp) => {
                if ( resp.errorMessage ) {
                    this.setState({resp: resp.errorMessage});
                }
                else {
                    this.setState({resp: resp});
                }
                console.log(resp);
            },10)
        }

        render() {

            return(
                <GovUk title="Home">
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.onClick(e)}>Click me</a>
                    <br/>
                    <br/>
                    <br/>

                    <textarea cols="60" value={this.state.resp}/>
                </GovUk>
            )
        }
    }
)