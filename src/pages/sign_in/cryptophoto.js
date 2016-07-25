import React from 'react'
import GovUk from '../../components/govuk'
import {connect} from 'react-redux'
import 'whatwg-fetch';
import { browserHistory, Link } from 'react-router'
import {saveGG3Session} from '../../reducers/helpers'
import Breadcrumb from '../../components/breadcrumb'


export default connect((state) => state) (
    class extends React.Component {

        constructor() {
            super();
            this.state = {cryptophoto_visible: false}
        }

        componentDidMount() {
            let session = this.props.session.gg3;
            let account = session.account;

            fetch("/svr/crypto", {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({email: account.email})
            }).then((resp) => resp.json())
            .then( (res) => {
                if ( res.is_valid ) {
                    (function(){
                        var newscript = document.createElement('script');
                        newscript.type = 'text/javascript';
                        newscript.async = true;
                        newscript.src = `https://cryptophoto.com/api/challenge?sd=${res.sid}`;
                        (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
                    })();
                }
            });


            let interval = setInterval( () => {
                if ( document.getElementById( "cp_selector" ) )  {
                    this.setState({cryptophoto_visible: true});
                    clearInterval(interval)
                }
            }, 200)

        }


        onSubmit(e) {
            e.preventDefault();

            let session = this.props.session.gg3;
            let account = session.account;

            let res = {
                token_response_field_row: document.getElementById("token_response_field_row").value,
                token_response_field_col: document.getElementById("token_response_field_col").value,
                cp_selector: document.getElementById("cp_selector").value,
                token_phc: document.getElementById("token_phc").value,
                email: account.gg_id
            };

            fetch("/svr/crypto_verify", {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(res)
            }).then((resp) => resp.json())
                .then( (res) => {
                    if( res.is_valid) {
                        saveGG3Session( this.props.dispatch, {level: "2"});
                        browserHistory.push("/logged_in")
                    }
                })

        }

        render() {
            let session = this.props.session.gg3;
            let account = session.account;
            let request = session.request;

            return(
                <GovUk>
                    <Breadcrumb text={`Sign in to ${request.name} using your Government Gateway account`}/>

                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <input type="hidden" id="cryptophoto"/>


                        {!this.state.cryptophoto_visible ? <h1 className="heading-medium">Connecting to CryptoPhoto....</h1> : <h1 className="heading-medium">CryptoPhoto</h1> }
                        <div className="grid-row">
                            <div className="column-one-third">&nbsp;</div>
                            <div className="column-one-third cryptophoto"><div id="cp_widget"></div></div>
                            <div className="column-one-third">&nbsp;</div>
                        </div>

                        {this.state.cryptophoto_visible ?
                            <div>
                                <a href="#" className="button" onClick={(e) => this.onSubmit(e)}>Continue</a>

                            </div>: null}
                    </form>
                </GovUk>
            )
        }

    }
)