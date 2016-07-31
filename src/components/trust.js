import React from 'react'
import {saveGG3Session, saveSpacegovSession} from '../reducers/helpers'
import { browserHistory, Link } from 'react-router'

import {connect} from 'react-redux'

export default connect((state) => state) (
   class extends React.Component {

        componentDidMount() {
            let gg3 = this.props.session.gg3;
            let response = gg3.response;

            let request = {
                name: "Spacegov",
                auth_level_required: this.props.required,
                auth_level_desired: this.props.desired,
                redirect_url: window.location.pathname
            };


            let hash = btoa(JSON.stringify(request));
            let challenges = gg3.challenges || [];

            if( response.level == "2" ) return;
            if ( challenges.indexOf(hash) != -1 ) {
                challenges = challenges.filter( (i) => i != hash);
                saveGG3Session(this.props.dispatch, {request, challenges});
            }
            else {
                challenges.push(hash);
                saveGG3Session(this.props.dispatch, {request, challenges});
                browserHistory.push("/service_redirect");
            }

        }

        render() {
            return null;
        }
    }
)