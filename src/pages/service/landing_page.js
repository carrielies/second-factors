import React from 'react'
import Govuk from '../../components/govuk'
import Content from '../../components/content'

import {connect} from 'react-redux'

export default connect((state) => state) (
    class extends React.Component {
        
        render() {
            // response_from_gw: {
            //     level: "1",
            //         trust_id: "6876Ff876W868SD787",
            //         name: "Marky Mid",
            //         cred_id: "1543245377",
            //         last_logged_in: "01/12/2016 09:25"
            // },

            // enrolment
            // recognises user and hashcode
            // recognises user but not hashcode
            // desires level 2, but level 1 returned
            
            let service = this.props.service;
            let resp = service.response_from_gw;

            if( service.trusted_hashes.indexOf(resp.trust_id) != -1 ) {
                return(
                    <Govuk title={service.name}>
                        <Content title={`Welcome back ${resp.name}`}>
                            <p>
                                You last logged into {service.name} on {resp.last_logged_in}
                            </p>

                            { service.auth_level_desired == "2" && resp.level == "1" ?
                                <p>We kind of trust you, but we need to double check your identity</p> :
                                <p>We trust you!</p>
                            }

                        </Content>
                    </Govuk>
                )
            }
            else {
                return(
                    <Govuk title={service.name}>
                        <Content title={`Welcome back ${resp.name}`}>
                            <p>
                                You last logged into {service.name} on {resp.last_logged_in}
                            </p>

                            <p>We need to re-trust you </p>
                        </Content>
                    </Govuk>
                )

            }



        }
        
    }
)