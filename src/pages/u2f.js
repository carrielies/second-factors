import React from 'react'
import GovUk from '../components/govuk'
import StoreHelper from '../utils/store_helper'
// import { browserHistory, Link } from 'react-router'
// var u2fServer  = require( '../utils/u2fserver' );
import {connect} from 'react-redux'
// import 'u2f-api-polyfill'
// var Datastore = require('nedb')
// import {saveUser, findUser} from '../utils/database'

export default connect((state) => state) (
    class extends React.Component {

        constructor() {
            super();
            this.state = {};
        }

        // onClick(e) {


            // let req = {
            //     version: "U2F_V2",
            //     appId: "https://localhost:3000",
            //     challenge: "bAwnaQ0EPaV1u1L7ySA7rB4rKwAffHO2yCb2H31CQPA"
            // };
            //
            // let resp = {
            //     appId: "https://localhost:3000",
            //     challenge: "bAwnaQ0EPaV1u1L7ySA7rB4rKwAffHO2yCb2H31CQPA",
            //     clientData: "eyJ0eXAiOiJuYXZpZ2F0b3IuaWQuZmluaXNoRW5yb2xsbWVudCIsImNoYWxsZW5nZSI6ImJBd25hUTBFUGFWMXUxTDd5U0E3ckI0ckt3QWZmSE8yeUNiMkgzMUNRUEEiLCJvcmlnaW4iOiJodHRwczovL2xvY2FsaG9zdDozMDAwIiwiY2lkX3B1YmtleSI6InVudXNlZCJ9",
            //     registrationData: "BQQ_d9TcfNN-xIrUVU-OyERntMhKoGDb_jAgvcxzJSBsU_8vRpvRDoguvehSJjo6ZKhf50dzSmhrEVTe1EpgVSlNQKXhUG1bFp1jjAJNh-rJg6jbEG1daxpzFJBWSF0T8QGiZbnCKvbLa4m7PkruXjujZzA_YI5BqeY15DVQZMc5bfMwggE8MIHkoAMCAQICChlFiGBmRWaIdkgwCgYIKoZIzj0EAwIwFzEVMBMGA1UEAxMMRlQgRklETyAwMTAwMB4XDTE0MDgxNDE4MjkzMloXDTI0MDgxNDE4MjkzMlowMTEvMC0GA1UEAxMmUGlsb3RHbnViYnktMC40LjEtMTk0NTg4NjA2NjQ1NjY4ODc2NDgwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQ_d9TcfNN-xIrUVU-OyERntMhKoGDb_jAgvcxzJSBsU_8vRpvRDoguvehSJjo6ZKhf50dzSmhrEVTe1EpgVSlNMAoGCCqGSM49BAMCA0cAMEQCIPTBC8-APrDgbgraKiMBZ4LbJGHvXmZoYBSCKpPqeeF4AiAfdmXHjzzpqmQ1ogzATdjZI4r0jxqVEsCnNocEPKPnezBEAiAe9FwrOJ42-4FSNmjbnbQVmBSyVUF69EKhRW1ZhgawhAIgVIBYyr-jnIV5LJ961N9Ok-CcRIH9OMTb5n3FmQMQpX4",
            //     version: "U2F_V2"
            // };

            // u2fServer.checkRegistration(req, resp);

            // let appId = "https://localhost:3000";
            // let req = u2fServer.request(appId);
            // debugger
            // this.setState( {resp: "running..."});
            // u2f.register( appId, [req], [], (resp) => {
            //     if ( resp.errorMessage ) {
            //         this.setState({resp: resp.errorMessage});
            //     }
            //     else {
            //         this.setState({resp: resp});
            //     }
            //     debugger
            //     console.log(u2fServer.checkRegistration(req, resp));
            //     debugger
            //
            //     console.log(resp);
            //     console.log(req);
            //     debugger
            // },10)
        // }

        // render() {
        //
        //     return(
        //         <GovUk title="Home">
        //             <br/>
        //             <a href="#" className="button" onClick={(e) => this.onClick(e)}>Click me</a>
        //             <br/>
        //             <br/>
        //             <br/>
        //
        //             <textarea cols="60" value={this.state.resp}/>
        //         </GovUk>
        //     )
        // }
    }
)