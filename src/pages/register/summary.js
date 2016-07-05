import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory,Link } from 'react-router'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {
        
        onNext(e) {
            e.preventDefault();
            let email = this.props.account.email;
            let account = {};
            account[email] = {...this.props.account};
            this.props.dispatch( {type: 'SAVE_ACCOUNT_TO_SERVER', data: account});
            browserHistory.push( "/signin")
        }

        render() {

            return (
                <Govuk phaseBanner="true">

                    {this.props.breadcrumb}
                    <Question title="Your government gateway account has been created">
                    </Question>

                    <table>
                        <thead>
                        <tr>
                            <th colSpan="2">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{this.props.account.email}</td>
                        </tr>
                        <tr>
                            <td>Firstnames</td>
                            <td>{this.props.account.firstnames}</td>
                        </tr>
                        <tr>
                            <td>Lastname</td>
                            <td>{this.props.account.lastname}</td>
                        </tr>
                        
                        </tbody>
                    </table>
                    <br/>
                    <br/>
                    <a href="/signin" onClick={(e) => this.onNext(e)} className="button">Save and Sign in</a>
                    <br/>
                    <br/>

                </Govuk>
            )
        }
    }
)
