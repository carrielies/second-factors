import React from 'react'
import speakeasy from 'speakeasy';
import QRCode from 'qrcode.react';


export default class extends React.Component{

    constructor(props) {
        super(props);
        this.state = { secret: speakeasy.generateSecret({length: 20})};

        setInterval( () => {
            var token = speakeasy.totp({
                secret: this.state.secret.base32,
                encoding: 'base32'
            });
            this.setState( {token: token} );
        }, 1000)

    }

    verify() {
        let token = this.refs.inp_code.value;

        var verified = speakeasy.totp.verify({
            secret: this.state.secret.base32,
            encoding: 'base32',
            token: token
        });

        this.setState( {verified})
    }

    render() {

        return (
            <div>
                <h1>{this.state.secret.base32}</h1>
                <QRCode value={this.state.secret.otpauth_url} />
                <h1>{this.state.token}</h1>
                <input ref="inp_code"/>
                <button onClick={() => this.verify()}>Verify</button>
                <h1>{this.state.verified ? "correct" : "wrong"}</h1>
            </div>

        )
    }

}