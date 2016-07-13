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


        onClick(e) {
            let appId = "https://localhost:3000";
            let req = u2fServer.request(appId);
            u2f.register( [req], [], (resp) => {
                console.log(resp)
                debugger
            },10)
        }

        render() {



            return(
                <GovUk title="Home">
                    <h1>hello</h1>
                    <a href="#" className="button" onClick={(e) => this.onClick(e)}>Click me</a>

                </GovUk>
            )
        }
    }
)