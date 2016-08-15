import React from 'react'
import GovUk from '../../components/govuk'
import {connect} from 'react-redux'
import 'whatwg-fetch';
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'
import {saveRegistrationSession} from '../../reducers/helpers'
import {findAccount, updateAccount, saveAccountInteraction} from '../../utils/database'


export default connect((state) => state) (
    class extends React.Component {

        constructor() {
            super();
            this.state = {cryptophoto_visible: false}
        }

        onNext(e) {
            if(e) e.preventDefault();

            let session = this.props.session.registration;
            let account = session.account;
            let gg3 = this.props.session.gg3;
            let resp = gg3.response;
            if (resp.level != 2) {
                account.trust_id_level_2 = this.trust_id();
            }
            account.factors.cryptophoto = {};

            updateAccount(account).then( () => {
                browserHistory.push("/register/your_auth_factors")
            });

            saveRegistrationSession(this.props.dispatch, { level: "2"});
        }


        componentDidMount() {
            let session = this.props.session.registration;
            let account = session.account;

            fetch("/svr/crypto", {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({gg_id: account.gg_id})
            }).then((resp) => resp.json())
                .then( (res) => {
                    if ( res.is_valid ) {
                        (function(){
                            var newscript = document.createElement('script');
                            newscript.type = 'text/javascript';
                            newscript.async = true;
                            newscript.src = `https://cryptophoto.com/api/token?sd=${res.sid}`;
                            (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
                        })();
                    }
                });

            let interval = setInterval( () => {
                if ( document.getElementById('cp-sw-if') )  {
                    this.setState({cryptophoto_visible: true});
                    clearInterval(interval)
                }
            }, 200)
        }


        render() {
            let session = this.props.session.registration;
            let account = session.account;
            let request = this.props.session.gg3.request;

            return(
                <GovUk>
                    <Breadcrumb text={`Register for ${request.name}`}/>

                    <form onSubmit={(e) => onNext(e)}>
                        <div id="cp_widget">
                            <h1 className="heading-medium">Connecting to Cryptophoto....</h1>
                        </div>
                    </form>
                    {this.state.cryptophoto_visible ?
                        <div>
                            <p>Once you have setup cryptophoto click below to continue.  </p>
                            <a href="#" className="button" onClick={(e) => this.onNext(e)}>I have finished setting up Cryptophoto</a>

                        </div>: null}
                </GovUk>
            )
        }

    }
)