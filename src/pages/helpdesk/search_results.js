import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'
import { browserHistory, Link } from 'react-router'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import Server from '../../components/server'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends QuestionPage{


        select(e, email) {
            e.preventDefault();
            let server = new Server(this.props.server);
            let account = server.findByEmail(email);
            this.props.dispatch({type: 'SAVE_HELPDESK', data: {account: account}});
            browserHistory.push("/helpdesk/prove_identity")
        }
        
        

        render() {


            let server = this.props.server;

            let res = Object.keys(server).map( (k) => {
                let account = server[k];
                return (
                    <tr>
                        <td>{account.firstnames} {account.lastname}</td>
                        <td>{account.email}</td>
                        <td>-</td>
                        <td>{account.cred_id}</td>
                        <td className="change-link"><a href="#" onClick={(e) => this.select(e, account.email)}>Prove Identity</a></td>
                    </tr>

                )
            })

            return(
                <Govuk title="Helpdesk">

                    <h1 className="heading-medium">Results</h1>
                    <table className="table-font-xsmall summary" >
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of birth</th>
                            <th>Gateway Id</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {res}

                        </tbody>
                    </table>
                    <br/>

                </Govuk>
            )
        }
    }
)