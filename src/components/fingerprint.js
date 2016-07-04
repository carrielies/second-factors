import React from 'react'
import Fingerprint2 from 'fingerprintjs2'
import QRCode from 'qrcode.react';


export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        new Fingerprint2().get((result, components) => {
            this.setState( {fingerprint: result, components: components});
            if ( this.props.onFingerprint ) {
                this.props.onFingerprint(result);
            }
            console.dir(components)
        });
    }

    render() {
        if( this.props.qrcodeSize && this.state.fingerprint ) {
            return (
                <QRCode value={this.state.fingerprint} size={this.props.qrcodeSize} />
            )
        }
        else {
            return null;
        }
    }

    secret() {
        return this.state.fingerprint
    }
}

