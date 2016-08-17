import React from 'react'
import fecha from 'fecha'
import QuestionPage from './question_page'
import {saveGG3Session} from '../reducers/helpers'
import {browserHistory} from 'react-router'

export default class SpacegovAuthPage extends QuestionPage {

    constructor(props) {
        super(props);
    }

    serviceName() {
        return "Spacegov";
    }

    authenticate(required_level, desired_level) {
        if (!this.props || !this.props.session || !this.props.session.gg3 || !this.props.session.gg3.response) {
            //This means the user isn't logged in
            this.redirectToSignIn(required_level, desired_level, window.location.href);
            return;
        } else {
            let response = this.props.session.gg3.response
            let request = this.props.session.gg3.request
            if (request.name != this.serviceName() || (required_level == "2" && response.level != "2")) {
                //Either the user needs an uplift, or the service has changed
                this.redirectToSignIn(required_level, desired_level, window.location.href);
                return;
            }
            if (required_level != desired_level && response.level != desired_level) {
                //Check to see if the user wants to uplift or not
                var desired = this.getQueryParameter("desired")
                if (!desired) {
                    //If the last call wasn't to a page that did a desired call, then perform one
                    this.redirectToSignIn(required_level, desired_level, this.addParamToUrl(window.location.href, "desired=true"));
                    return;
                }
            }
        }
    }

    noneRepudiation() {
        var repudiation = this.getQueryParameter("repudiation")
        let request = this.props.session.gg3.request
        if (request.name != this.serviceName() || !repudiation) {
            //If the last call wasn't to a page that did a desired call, then perform one
            this.redirectToSignIn("2", "2", this.addParamToUrl(window.location.href, "repudiation=true"));
        }
    }

    addParamToUrl(url, paramValue) {
        if (url.indexOf("?") > 0) {
            return url + "&" + paramValue;
        } else {
            return url + "?" + paramValue;
        }

    }

    redirectToSignIn(required_level, desired_level, url) {
        let url_text = "Help using SPACE.GOV"
        let url_link = "/service/help"
        let feedback_url = "/test/feedback"

        let request = {
            name: this.serviceName(),
            auth_level_required: required_level,
            auth_level_desired: desired_level,
            redirect_url: url,
            help: {
                url_text: url_text,
                url_link: url_link
            },
            feedback_url : feedback_url
        };
        saveGG3Session(this.props.dispatch, {request})
        browserHistory.push("/signin")
    }

}