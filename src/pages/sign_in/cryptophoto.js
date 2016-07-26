import React from 'react'
import GovUk from '../../components/govuk'
import {connect} from 'react-redux'
import 'whatwg-fetch';
import { browserHistory, Link } from 'react-router'
import {saveGG3Session, importSession} from '../../reducers/helpers'
import {serialize, deserialize } from '../../utils/serialize'
import Breadcrumb from '../../components/breadcrumb'


export default connect((state) => state) (
    class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {cryptophoto_visible: false, data: ""}

            serialize(props.session).then( (data) => {
                this.setState({ data})
            })
        }

        getQueryParameter(name) {
            var url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        componentDidMount() {
            let session_state = this.getQueryParameter("session_state");
            if ( session_state ) {
                deserialize(this.props.dispatch, session_state ).then( (session) => {
                    this.onSubmit(session);
                });
                //
                //
                // let session = JSON.parse(window.atob(session_state));
                // importSession( this.props.dispatch, session );
            }

            let session = this.props.session.gg3;
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

        onSubmit(session) {
            let account = session.gg3.account;
            let res = {
                token_response_field_row: this.getQueryParameter("token_response_field_row"),
                token_response_field_col: this.getQueryParameter("token_response_field_col"),
                cp_selector: this.getQueryParameter("token_selector"),
                token_phc: this.getQueryParameter("cp_phc"),
                gg_id: account.gg_id
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

            let connectingStr = this.getQueryParameter("session_state") ? "Checking..." : "Connecting to CryptoPhoto....";

            return(
                <GovUk>
                    <Breadcrumb text={`Sign in to ${request.name} using your Government Gateway account`}/>

                    <form id="myform" onSubmit={(e) => this.onSubmit(e)}>
                        <input type="hidden" id="cryptophoto"/>
                        <input type="hidden" name="session_state" value={this.state.data}/>
                        {!this.state.cryptophoto_visible ? <h1 className="heading-medium">{connectingStr}</h1> : <h1 className="heading-medium">CryptoPhoto</h1> }
                        <div className="grid-row">
                            <div className="column-one-third">&nbsp;</div>
                            <div className="column-one-third cryptophoto"><div id="cp_widget"></div></div>
                            <div className="column-one-third">&nbsp;</div>
                        </div>

                        {this.state.cryptophoto_visible ?
                            <div>


                            </div>: null}
                    </form>
                </GovUk>
            )
        }

    }
)