import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Breadcrumb from '../../components/breadcrumb'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{

        forceRetrust(e) {
            e.preventDefault();
            let account = this.props.helpdesk.account;
            account.trust_id= this.guid();
            this.props.dispatch({type: 'SAVE_HELPDESK', data: {account}});
        }


        authFactors() {
            let factors = this.props.helpdesk.account.factors || [];

            let handlers = {
                google_authenticator: () => {
                    return(
                        <tr>
                            <td>Google authenticator</td>
                            <td>This requires a special app installed on THEIR browser or a phone app which generates a new code every minute or so. </td>
                            <td>Enabled</td>
                            <td className="change-link">
                                <Link to="/helpdesk/manage_google_authenticator">Manage</Link>
                            </td>
                        </tr>
                    )
                },
                password: () => {
                    return (
                        <tr>
                            <td>Password</td>
                            <td>This is enabled by default.  </td>
                            <td>Enabled</td>
                            <td className="change-link">
                                <Link to="/helpdesk/reset_password">Reset password</Link>
                            </td>
                        </tr>
                    )
                },
                device_fingerprint: () => {
                    return(
                        null
                    )
                }
            };

            let list = [];

            Object.keys(factors).forEach( (k) => {
                let entry = handlers[k]();
                if (entry) list.push(entry)
            });

            return list;
        }

        render() {

            let service = this.props.service;
            let resp = service.response_from_gw;
            
            let account = this.props.helpdesk.account;


            let logs = account.interactions.map( (e) => {
               return(
                   <tr>
                       <td>{e.type}</td>
                       <td>{e.event}</td>
                       <td>{e.time}</td>
                   </tr>
               )
            });

            return(
                <Govuk phaseBanner="true">
                    <h1 className="heading-medium">{`${account.firstnames} ${account.lastname}`}</h1>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th colSpan="3">Their details</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr>
                            <td>Credential Id</td>
                            <td>{`${account.cred_id}`}</td>
                            <td className="change-link"></td>
                        </tr>

                        <tr>
                            <td>Name</td>
                            <td>{`${account.firstnames} ${account.lastname}`}</td>
                            <td className="change-link"></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{`${account.email}`}</td>
                            <td className="change-link">

                            </td>
                        </tr>

                        <tr>
                            <td>Trust Id</td>
                            <td>{account.trust_id}</td>
                            <td></td>
                        </tr>

                        </tbody>
                    </table>



                    <h1 className="heading-medium">Services which they have interacted with</h1>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th>Event</th>
                            <th>Message</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs}
                        </tbody>
                    </table>

                    <br/>
                    <a href="#" onClick={(e) => this.forceRetrust(e)} className="button-secondary">Force services to re-trust user by asking for known facts</a>
                    <br/>
                    <br/>


                    <h1 className="heading-medium">Their authentication factors</h1>
                    <p>Changing these will not break trust between a user and service. If you are not 100% sure that you trust the person is who they say they are then click the break trust button. </p>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th colSpan="4">Authentication Factors</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.authFactors()}
                        
                        </tbody>
                    </table>




                </Govuk>
            )
        }
    }
)