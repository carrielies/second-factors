import {connect} from 'react-redux'
import React from 'react'
import Fingerprint2 from 'fingerprintjs2'

export default connect((state) => state) (
    class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {fingerprint: "", components: ""}
            new Fingerprint2().get((result, components) => {
                props.dispatch( {type: 'FINGERPRINT', data: result});
                this.setState( {fingerprint: result, components: components})
            });

        }

        render() {
            return(
                null
            )
        }
    }

)