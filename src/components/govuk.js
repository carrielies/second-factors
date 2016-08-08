import React from 'react'

import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'


export default connect((state) => state) (
    class extends React.Component {
        
        render() {

            let session = this.props.session.gg3;
            let request = session.request;

            let feedback_url = "/#"
            let help_url_link = "https://www.gov.uk/help"
            let help_url_text = "Help using GOV.UK"
            if (request) {
                if (request.feedback_url) {
                    feedback_url = request.feedback_url
                }
                if (request.help && request.help.url_link && request.help.url_text) {
                    help_url_link = request.help.url_link
                    help_url_text = request.help.url_text
                }
            }

            let signedIn;
            if (session.signed_in) {
                signedIn = <span><Link to="/" id="sign-out" >Sign out</Link></span>
            }
            
            return (
                <div>
                    <div id="skiplink-container">
                        <div>
                            <a href="#content" className="skiplink">Skip to main content</a>
                        </div>
                    </div>
    
                    <div id="global-cookie-message">
                        <p>GOV.UK uses cookies to make the site simpler. <a href="https://www.gov.uk/help/cookies">Find out more about cookies</a></p>
                    </div>
    
    
                    <header role="banner" id="global-header" className="with-proposition">
                        <div className="header-wrapper">
                            <div className="header-global">
                                <div className="header-logo">
                                    <a href="https://www.gov.uk/" title="Go to the GOV.UK homepage" id="logo" className="content">
                                        <img src="/govuk_template/images/gov.uk_logotype_crown_invert_trans.png" width="35" height="31" alt=""/> {this.props.header || "GOV.UK"}
                                    </a>
                                </div>
                            </div>
                            <div className="header-proposition">
                                <div className="content">
                                    <nav id="proposition-menu">
                                        <div className="grid-row">
                                            <div className="column-half">
                                                <Link to="/" id="proposition-name">{this.props.title || "Government Gateway"}</Link>
                                            </div>
                                            <div className="column-half logout">
                                                {signedIn}
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </header>

                    {this.props.hidePhaseBanner ?  <div className="white_bar"></div> :
                        <div id="global-header-bar"></div>
                    }
    
                    <main role="main">
                        <div id="page-container">
                            {this.props.hidePhaseBanner ? null:
                            <div className="phase-banner">
                                <p>
                                    <strong className="phase-tag">ALPHA</strong>
                                    <span className="span">This is a new service – your <Link to={feedback_url}>feedback</Link> will help us to improve it.</span>
                                </p>
                            </div> }
    
                            {this.props.children}
                            <br/>
                            <br/>
                        </div>
                    </main>
    
                    <footer className="group js-footer" id="footer" role="contentinfo">
                        <div className="footer-wrapper">
                            <div className="footer-meta">
                                <div className="footer-meta-inner">
                                    <ul className="platform-help-links">
                                        <li><a href="https://www.tax.service.gov.uk/help/cookies" target="_blank" data-sso="false" data-journey-click="footer:Click:Cookies">Cookies</a></li>
                                        <li><a href="https://www.tax.service.gov.uk/help/privacy" target="_blank" data-sso="false" data-journey-click="footer:Click:Privacy policy">Privacy policy</a></li>
                                        <li><a href="https://www.tax.service.gov.uk/help/terms-and-conditions" target="_blank" data-sso="false" data-journey-click="footer:Click:Terms and conditions">Terms and conditions</a></li>
                                        <li><a href={help_url_link} target="_blank" data-sso="false" data-journey-click="footer:Click:Help">{help_url_text}</a></li>
                                    </ul>
                                    <div className="open-government-licence">
                                        <p className="logo"><a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence</a></p>
                                        <p>All content is available under the <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</a>, except where otherwise stated</p>
    
                                    </div>
                                </div>
    
                                <div className="copyright">
                                    <a href="http://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/copyright-and-re-use/crown-copyright/">© Crown copyright</a>
                                </div>
                            </div>
                        </div>
                    </footer>
    
    
    
                    <div id="global-app-error" className="app-error hidden"></div>
                </div>
            )
        }
    }
)