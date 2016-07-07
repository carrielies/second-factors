import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'


import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{


        authFactors() {
            let factors = this.props.helpdesk.account.factors || [];

            let handlers = {
                google_authenticator: () => {
                    return(
                        <tr>
                            <td>Google authenticator</td>
                            <td>This requires a special app installed on THEIR browser or a phone app which generates a new code every 30 seconds.   </td>
                            <td></td>
                            <td className="change-link">
                                <Link to="/helpdesk/prove_google_authenticator">Issue Challenge</Link><br/>
                            </td>
                        </tr>
                    )
                },
                password: () => {
                    return(
                        null
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


        forceRetrust(e) {
            e.preventDefault();
            let account = this.props.helpdesk.account;
            account.trust_id= this.guid();
            this.props.dispatch({type: 'SAVE_HELPDESK', data: {account}});
            browserHistory.push("/helpdesk/manage_account");
        }



        render() {

            let factors = this.authFactors();

            return(
                <Govuk  title="Helpdesk">
                    <Content>
                        <h1 className="heading-medium">Prove their identity ?</h1>
                        <p>We need to trust the customer is who they say they are.  This can be done by issuing a challenge based on 2nd factors they have set up.</p>
                    </Content>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th colSpan="4">Strong Authentication Factors</th>
                        </tr>
                        </thead>
                        <tbody>
                        {factors}

                        <tr>
                            <td>Shared Secrets</td>
                            <td>These are facts that the user entered when they setup the gateway account<br/>
                            </td>
                            <td></td>
                            <td className="change-link">
                                <Link to="/helpdesk/prove_google_authenticator">Issue Challenge</Link>
                            </td>
                        </tr>



                        </tbody>
                    </table>

                    <br/>
                    <Content>
                        <details>

                            <summary><span class="summary">Customer unable to prove their identity</span></summary>

                            <div class="panel panel-border-narrow">

                                <p>
                                    If you can not prove the customers identity, then any password resets, changes to email address's etc
                                    will result in any services they have enrolled in, re-asking them for known facts, to re-establish the trust.
                                </p>

                                <a href="#" className="button-secondary" onClick={(e) => this.forceRetrust(e)}>Force services to re-trust user by asking for known facts</a>

                            </div>

                        </details>
                    </Content>





                </Govuk>
            )
        }
    }
)