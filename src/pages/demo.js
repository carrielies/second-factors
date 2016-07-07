import React from 'react'
import GovUk from '../components/govuk'
import Server from '../components/server'
import { browserHistory, Link } from 'react-router'

import {connect} from 'react-redux'
export default connect((state) => state) (
    class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                account: props.account,
                server: props.server,
                cookie: props.cookie,
                service: props.service
            }
        }

        onNext(e, url, email ) {
            if ( !email ) return;
            e.preventDefault();
            let server = new Server(this.props.server);
            let account = server.findByEmail(email);
            this.props.dispatch({type: "SAVE_ACCOUNT", data: {...account}});
            browserHistory.push(url)
        }


        setup(e, mergeData) {
            e.preventDefault();
            let server = new Server(this.props.server);
            let account = server.findByEmail("marky@gmail.com");
            let service = this.props.service;
            let cookie = this.props.cookie;

            if ( mergeData ) {
                if(mergeData.server) {
                    server = {...server, ...mergeData.server}
                }

                if(mergeData.service) {
                    service = {...service, ...mergeData.service}
                }

                if(mergeData.account) {
                    account = {...account, ...mergeData.account}
                }

                if(mergeData.cookie) {
                    cookie = {...cookie, ...mergeData.cookie}
                }

            }

            this.setState( {account: account, service: service, server: server, cookie: cookie})
        }

        go(e, url) {
            e.preventDefault();
            this.props.dispatch({type: "SAVE_ACCOUNT", data: JSON.parse(this.refs.account.value)});
            this.props.dispatch({type: "SAVE_SERVER", data: JSON.parse(this.refs.server.value)});
            this.props.dispatch({type: "SAVE_SERVICE", data: JSON.parse(this.refs.service.value)});
            this.props.dispatch({type: "SAVE_COOKIE", data: JSON.parse(this.refs.cookie.value)});
            browserHistory.push(url)
        }

        handleAccountChange(event) {
            this.setState({account: event.target.value});
        }

        handleServerChange(event) {
            this.setState({server: event.target.value});
        }

        handleServiceChange(event) {
            this.setState({service: event.target.value});
        }

        handleCookieChange(event) {
            this.setState({cookie: event.target.value});
        }


        render() {

            let request =  {
                name: "Child Maintenance",
                auth_level_required: "2",
                auth_level_desired: "2",
                redirect_url: "/service/landing_page"
            };


            let service_requires_2fa = {
                ...request,
                auth_level_desired: "2",
                auth_level_required: "2"
            };

            let service_would_like_2fa = {
                ...request,
                auth_level_desired: "2",
                auth_level_required: "1"

            };

            let service_requires_basic_auth = {
                ...request,
                auth_level_desired: "1",
                auth_level_required: "1"

            };

            return (
                <GovUk>
                    <br/>
                    <div className="grid-row">
                        <div className="column-one-third">
                            Account
                        </div>
                        <div className="column-two-thirds">
                            <textarea ref="account" cols="70" rows="5" onChange={this.handleAccountChange} value={JSON.stringify(this.state.account, null, 2)}/>
                        </div>
                    </div>
                    <br/>
                    <div className="grid-row">
                        <div className="column-one-third">
                            Server
                        </div>
                        <div className="column-two-thirds">
                            <textarea ref="server" cols="70" rows="5" onChange={this.handleServerChange}  value={JSON.stringify(this.state.server, null, 2)}/>
                        </div>
                    </div>
                    <br/>
                    <div className="grid-row">
                        <div className="column-one-third">
                            Service
                        </div>
                        <div className="column-two-thirds">
                            <textarea ref="service" cols="70" rows="5" onChange={this.handleServiceChange}  value={JSON.stringify(this.state.service, null, 2)}/>
                        </div>
                    </div>
                    <br/>
                    <div className="grid-row">
                        <div className="column-one-third">
                            Cookie
                        </div>
                        <div className="column-two-thirds">
                            <textarea ref="cookie" cols="70" rows="5" onChange={this.handleCookieChange}  value={JSON.stringify(this.state.cookie, null, 2)}/>
                        </div>
                    </div>

                    <br/>
                    <br/>


                    <table>
                        <thead>
                        <tr>
                            <th colSpan="1">Uplift</th>
                            <th colSpan="1">
                                <a href="#" onClick={(e) => this.go(e, "/signin")}>Go</a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Signed in level 1: Desired 2, Required 2</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_2fa }
                                    },
                                    cookie: {
                                        cred_id: "1234567",
                                        level: "1",
                                        service_name: "Child Maintenance",
                                        email: "average@joe.com"
                                    }
                                 }
                            )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Signed in level 1: Desired 2, Required 1</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_would_like_2fa }
                                    },
                                    cookie: {
                                        cred_id: "1234567",
                                        level: "1",
                                        service_name: "Child Maintenance",
                                        email: "average@joe.com"
                                    }
                                 }
                            )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Signed in level 2: Desired 2, Required 2</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_2fa }
                                    },
                                    cookie: {
                                        cred_id: "1234567",
                                        level: "2",
                                        service_name: "Child Maintenance",
                                        email: "average@joe.com"
                                    }
                                 }
                            )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Signed in to Welsh Government as Level1, now logging into Child Maintenance as Level 1</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_basic_auth }
                                    },
                                    cookie: {
                                        cred_id: "1234567",
                                        level: "1",
                                        service_name: "Welsh Government",
                                        email: "average@joe.com"
                                    }
                                 }
                            )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Signed in to Welsh Government as Level1, now logging into Child Maintenance as Level 2</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_2fa }
                                    },
                                    cookie: {
                                        cred_id: "1234567",
                                        level: "1",
                                        service_name: "Welsh Government",
                                        email: "average@joe.com"
                                    }
                                 }
                            )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Signed in to Welsh Government as Level2, now logging into Child Maintenance as Level 2</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_2fa }
                                    },
                                    cookie: {
                                        cred_id: "1234567",
                                        level: "2",
                                        service_name: "Welsh Government",
                                        email: "average@joe.com"
                                    }
                                 }
                            )}>setup</a></td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <br/>

                    <table>
                        <thead>
                        <tr>
                            <th colSpan="1">Persona's</th>
                            <th colSpan="1">
                                <a href="#" onClick={(e) => this.go(e, "/service_redirect")}>Go</a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Lapse Larry</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    account: {
                                        email: "lapse@larry.com"
                                    }
                                }
                            )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Security Simon</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    account: {
                                        email: "security@simon.com"
                                    }
                                }
                            )}>setup</a></td>
                        </tr>
                        
                        <tr>
                            <td>Average Joe</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    account: {
                                        email: "average@joe.com"
                                    }
                                }
                            )}>setup</a></td>
                        </tr>
                        
                        </tbody>
                    </table>

                    <br/>
                    <br/>

                    <table>
                        <thead>
                        <tr>
                            <th colSpan="1">Service's</th>
                            <th colSpan="1">
                                <a href="#" onClick={(e) => this.go(e, "/service_redirect")}>Go</a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Would like 2FA</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_would_like_2fa }
                                    }
                                },
                            )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Requires 2FA</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_2fa }
                                    }
                                },
                            )}>setup</a></td>
                        </tr>

                        <tr>
                            <td>Requires Basic Login</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_basic_auth }
                                    }
                                },
                            )}>setup</a></td>
                        </tr>

                        <tr>
                            <td>Uplift to 2fa</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_2fa }
                                    }
                                },
                            )}>setup</a></td>
                        </tr>

                        <tr>
                            <td>SSO</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_2fa }
                                    }
                                },
                            )}>setup</a></td>
                        </tr>

                        <tr>
                            <td>None repudiation</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_2fa }
                                    }
                                },
                            )}>setup</a></td>
                        </tr>


                        </tbody>
                    </table>
                    <br/>
                    <br/>

                    <table>
                        <thead>
                        <tr>
                            <th colSpan="1">Your auth factors scenario's</th>
                            <th colSpan="1">
                                <a href="#" onClick={(e) => this.go(e, "/signin")}>Go</a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Sign in: Desired 1, Required 1</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_basic_auth }
                                    },

                                    account: {
                                        email: "average@joe.com"
                                     }
                                 }
                            )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Sign in: Desired 2, Required 1</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_would_like_2fa }
                                    },

                                    account: {
                                        email: "average@joe.com"
                                     }
                                 }
                            )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Sign in: Desired 2, Required 2</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_2fa }
                                    },

                                    account: {
                                        email: "average@joe.com"
                                     }
                                 }
                             )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Sign in: Desired 1, Required, Credentials: 2fa mandatory</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_basic_auth }
                                    },
                                    account: {
                                        email: "security@simon.com"
                                     }
                                 }
                            )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Sign in: Desired 2, Required 1, No Factors</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_would_like_2fa }
                                    },

                                    account: {
                                        "email": "laps@larry.com"
                                     }
                                 }
                             )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Sign in: Desired 2, Required 2, No Factors</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        request: {...service_requires_2fa }
                                    },

                                    account: {
                                        "email": "laps@larry.com"
                                     }
                                 }
                             )}>setup</a></td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <br/>

                    <table>
                        <thead>
                        <tr>
                            <th colSpan="1">Repsonse to Service scenario's</th>
                            <th colSpan="1">
                                <a href="#" onClick={(e) => this.go(e, "/service/landing_page")}>Go</a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Trusted, and authenticated to correct level</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        auth_level_desired: "1",
                                        auth_level_required: "1",
                                        response_from_gw: {
                                            level: "1",
                                            trust_id: "6876Ff876W868SD787",
                                            name: "Marky Mid",
                                            cred_id: "1543245377",
                                            last_logged_in: "01/12/2016 09:26"
                                        }
                                     }

                                 }
                            )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Not trusted, and authenticated to correct level</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        auth_level_desired: "1",
                                        auth_level_required: "1",
                                        response_from_gw: {
                                            level: "1",
                                            trust_id: "6876DIFFERENTW868SD787",
                                            name: "Marky Mid",
                                            cred_id: "1543245377",
                                            last_logged_in: "01/12/2016 09:26"
                                        }
                                     }


                                 }
                            )}>setup</a></td>
                        </tr>
                        <tr>
                            <td>Trusted but at level 1, but level 2 was desired</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        auth_level_desired: "2",
                                        auth_level_required: "1",
                                        response_from_gw: {
                                            level: "1",
                                            trust_id: "6876Ff876W868SD787",
                                            name: "Marky Mid",
                                            cred_id: "1543245377",
                                            last_logged_in: "01/12/2016 09:26"
                                        }
                                     }
                                 }
                            )}>setup</a></td>
                        </tr>

                        <tr>
                            <td>Trusted but at level 2, but level 1 was desired</td>
                            <td><a href="#" onClick={(e) => this.setup(e,
                                {
                                    service: {
                                        auth_level_desired: "1",
                                        auth_level_required: "1",
                                        response_from_gw: {
                                            level: "2",
                                            trust_id: "6876Ff876W868SD787",
                                            name: "Marky Mid",
                                            cred_id: "1543245377",
                                            last_logged_in: "01/12/2016 09:26"
                                        }
                                     }
                                 }
                            )}>setup</a></td>
                        </tr>

                        </tbody>
                    </table>
                    <br/>
                    <br/>







                    <a href="/ga" className="button" onClick={(e) => this.onNext(e, "/ga", "marky@gmail.com")}>Google authenticator</a>
                    <br/>
                    <br/>
                    <a href="/check_device" className="button" onClick={(e) => this.onNext(e, "/check_device", "marky@gmail.com")}>Check Device</a>
                    <br/>
                    <br/>
                    <a href="/register" className="button" onClick={(e) => this.onNext(e, "/register")}>Register</a>

                    <br/>
                    <br/>
                    <a href="/register/summary" className="button" onClick={(e) => this.onNext(e, "/register/summary", "marky@gmail.com")}>Summary</a>

                    <br/>
                    <br/>
                    <a href="/your_auth_factors" className="button" onClick={(e) => this.onNext(e, "/your_auth_factors", "marky@gmail.com")}>Signed in, with 2fa</a>



                </GovUk>
            )
        }
    }
)