import React from 'react'
import speakeasy from 'speakeasy';
import QRCode from 'qrcode.react';

export default class extends React.Component{


    constructor(props) {
        super(props);
        this.state = {};
        if( props.secret ) {
            this.state = {token: "", secret: props.secret}
        }
        else {
            fetch("/svr/ga/secret").then((resp) => resp.json()).then( (secret) => {
                this.setState({token: "", secret: secret.base32, url: secret.otpauth_url})
            } )

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
        let url = this.state.url || "loading";
        if(this.props.qrcodeSize ) {
            return(
                <QRCode value={url} size={parseInt(this.props.qrcodeSize)} />
            )
        }
        else {
            return null;
        }

    }
}