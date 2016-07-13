import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import StoreHelper from '../../utils/store_helper'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory,Link } from 'react-router'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {
        
        onNext(e) {
            e.preventDefault();
            let factors = Object.keys(this.props.account.factors).join(",");

            let email = this.props.account.email;
            let account = {};
            account[email] = {...this.props.account};
            this.props.dispatch( {type: 'SAVE_SERVER', data: account});
            let store = new StoreHelper(this.props);
            store.saveInteraction( "registration", `Account created with factors: ${factors}` );
            browserHistory.push( "/logged_in")
        }

        render() {

            return (
                <Govuk phaseBanner="true">

                    <Breadcrumb text={`Register for ${this.props.service.request.name}`}/>
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

