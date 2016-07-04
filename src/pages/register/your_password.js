import Govuk from '../../components/govuk'
import QuestionPage from '../../utils/question_page'
import Question from '../../components/question'
import Field from '../../components/field'
import React from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { browserHistory } from 'react-router'

import {connect} from 'react-redux'

export default connect((state) => state) (

    class extends QuestionPage {

        constructor(props) {
            super(props);
            this.state = {error: false, chars_8: false, lowercase_uppercase: false, special_char: false, update_enabled: false }
        }

        updatePassword(e) {

            if ( !this.state.update_enabled ) {
                e.preventDefault();
                return;
            }
            let password1 = this.refs.password1.value;
            let password2 = this.refs.password2.value;

            if ( password1 != password2) {
                this.setState({error: true});
                e.preventDefault();
                return;
            }

            let factors = {
                factors: {
                    password: {
                        secret: password1
                    }
                }
            };


            this.props.dispatch( {type: 'SAVE_ACCOUNT', data: factors })

            browserHistory.push("/register/your_secret");

        }

        passwordChange() {

            let password = this.refs.password1.value;
            this.setState( {error: false,
                chars_8: this.has8Chars(password),
                lowercase_uppercase: this.hasLowercaseAndUppercase(password),
                special_char: this.hasSpecialChar(password)});

            if ( this.hasLowercaseAndUppercase(password) && this.hasSpecialChar(password) && this.has8Chars(password) ) {
                this.setState({update_enabled: true })
            }
            else {
                this.setState({update_enabled: false })
            }
        }

        hasLowercaseAndUppercase(password) {
            return !! (password.match(/[A-Z]/) && password.match(/[a-z]/))
        }

        hasSpecialChar(password) {
            return !! (password.match(/[!@£$%*().,~`#€¢∞§¶•]/) && password.match(/[1234567890]/))
        }

        has8Chars(password) {
            return password.length >= 8;
        }

        render() {

            return (

                <Govuk>
                    <Breadcrumb text="Register for Government Gateway"/>

                    <Question title="Set your password">

                        <ul className="list tick" >
                            <li className={this.state.chars_8 ? "li-tick" : ""}>It must contain at least 8 characters</li>
                            <li className={this.state.lowercase_uppercase ? "li-tick" : ""} >A lowercase letter and an uppercase letter</li>
                            <li className={this.state.special_char ? "li-tick" : ""} >At least one number and one special character</li>
                        </ul>

                        <form >
                            <fieldset className="inline">
                                <div className={this.state.error? "form-group error" : "form-group"}>
                                    {this.state.error ?
                                        <legend id="passwords_do_not_match" >
                                        <span className="error-message">
                                        Your passwords do not match
                                        </span>
                                        </legend> : null }

                                    <div>
                                        <label className="form-label-bold" for="password1" >Password</label>
                                        <input className={this.state.show_password ? "form-control password-lightgray" : "form-control"} onKeyUp={() => this.passwordChange()} id="password1" name="password1" type={this.state.show_password ? "text" : "password"} ref="password1"/>
                                    </div>
                                    <br/>


                                    <div>
                                        <label className="form-label-bold" for="password2" ref="password2">Confirm Password</label>
                                        <input className="form-control" id="password2" name="password2" type="password" ref="password2"/>
                                    </div>

                                </div>

                            </fieldset>
                            <div key={this.state.show_confirm}>
                                <a href={this.props.continue_url} className={this.state.update_enabled? "button" : "button disabled"} onClick={(e) => this.updatePassword(e)}>Continue</a>
                            </div>
                            <br/>

                        </form>
                    </Question>
                </Govuk>
            )
        }

    }
)

