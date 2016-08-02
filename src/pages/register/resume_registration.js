import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'
import {saveRegistrationSession, clearAllSessions, saveGG3Session} from '../../reducers/helpers'
import {connect} from 'react-redux'
import {saveAccount, updateAccount, findAccount} from '../../utils/database'


export default connect((state) => state) (

    class extends QuestionPage {

        componentDidMount() {

            let gg_id = this.getQueryParameter("gg_id");

            findAccount(gg_id).then((account) => {

                let request = {
                    name: `${account.org_name}`,
                    auth_level_required: "1",
                    auth_level_desired: "1",
                    redirect_url: "/org/registration_complete"
                };

                account.factors = { password: {} };
                account.interactions = [];
                clearAllSessions(this.props.dispatch);
                saveGG3Session( this.props.dispatch, {request});
                saveRegistrationSession(this.props.dispatch, {account, gg_id: account.gg_id});
                updateAccount(account).then( () => {
                    browserHistory.push( "/register/your_password");
                });
            });

        }

        render() {
            return null;
        }
    }
)