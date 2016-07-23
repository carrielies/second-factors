import React from 'react'
import GovUk from '../components/govuk'
import {connect} from 'react-redux'
import u2f from 'u2f-api'
import 'whatwg-fetch';

export default connect((state) => state) (
    class extends React.Component {

        constructor() {
            super();
            this.state = {};
        }

        register(e) {
            e.preventDefault();


            fetch("/svr/u2f/register").then((resp) => resp.json())
            .then((reg) => u2f.register( reg ))
            .then((resp) => {
                this.setState({resp: resp});
                return fetch('/svr/u2f/register', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
                    body: JSON.stringify(resp)
                });
            })
            .then((resp) => resp.json())
            .then((res) => {
                console.log(res);
                console.log("keyhandle: " + res.keyHandle)
                console.log("pubkey: " + res.publicKey)
            });
        }


        authenticate(e) {
            e.preventDefault();

            let keyHandle = "Lhme0_tMwLTlMRbslq6ejejGFn3zVeK4HBVwdMVhUbhKnZYN2WpPkylzCtGoUZfBuv_z9tTlw7NNQhpS2_1t-Q";
            let publicKey = "BLSPGmLciSMT4-cOJPKvWUKHHjGA-JRvnKz-9FrzsDxJ0AsSvP6vrDQvpRIZzFBQDtUn1AvfJE6X_amefBY2ZDs";

            fetch("/svr/u2f/challenge", {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({keyHandle, publicKey})
            }).then((resp) => resp.json())
                .then((req) => u2f.sign(req))
                .then((res) => {
                    return fetch("/svr/u2f/challenge_response", {
                        method: 'POST',
                        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                        body: JSON.stringify(res)
                    })
                }).then((resp) => resp.json())
                .then((res) => {
                    console.log(res);
                })
        }


        render() {

            return(
                <GovUk title="Home">
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.register(e)}>Register</a>
                    <br/>
                    <br/>
                    <br/>
                    <a href="#" className="button" onClick={(e) => this.authenticate(e)}>Authenticate</a>


                    <textarea cols="60" value={this.state.resp}/>
                </GovUk>
            )
        }
    }
)