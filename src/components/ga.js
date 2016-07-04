import React from 'react'
import speakeasy from 'speakeasy';
import QRCode from 'qrcode.react';

export default class extends React.Component{


    constructor(props) {
        super(props);
        if( props.secret ) {
            this.state = {token: "", secret: props.secret}
        }
        else {
            let secret = speakeasy.generateSecret({length: 20});
            this.state = {token: "", secret: secret.base32, url: secret.otpauth_url}
        }
    }

    componentDidMount() {
        this.timer = setInterval( () => {
            let token = speakeasy.totp({ secret: this.state.secret, encoding: 'base32'});
            this.setState( {token});

            if ( this.props.onTokenChange) {
                this.props.onTokenChange(token);
            }

        },500)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    verifyToken(token) {
        return speakeasy.totp.verify({
            secret: this.state.secret,
            encoding: 'base32',
            token: token
        });
    }

    secret() {
        return this.state.secret
    }

    token() {
        return this.state.token
    }


    render() {
        if(this.props.qrcodeSize ) {
            return(
                <QRCode value={this.state.url} size={this.props.qrcodeSize} />
            )
        }
        else {
            return null;
        }

    }
}