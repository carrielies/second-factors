const initState = {
    
    "average@joe.com": {
        email: "average@joe.com",
        firstnames: "Average",
        lastname: "Joe",
        always_use_2fa: false,
        two_fa_passed: false,
        cred_id: "765875675786",
        trust_id: "875678687GJHGH343",
        factors: {
            password: {
                secret: "password"
            },
            google_authenticator: {
                secret: "JM4VQTSGMQRSGRZEKJGSMUTNORUE63JS"
            }
        }
    },
    "security@simon.com": {
        email: "security@simon.com",
        firstnames: "Security",
        lastname: "Simon",
        always_use_2fa: true,
        two_fa_passed: false,
        cred_id: "1234SIMON",
        trust_id: "875678687GJHGH343",
        factors: {
            password: {
                secret: "password"
            },
            google_authenticator: {
                secret: "JM4VQTSGMQRSGRZEKJGSMUTNORUE63JS"
            },
            device_fingerprint: {
                devices: [
                    {
                        device: "laptop",
                        fingerprint: "2c02c8bc7a959ab4bfddfac82de12a19"
                    },
                    {
                        device: "iphone",
                        fingerprint: "978978"
                    }

                ]
            }
        }
    },
    "lapse@larry.com": {
        email: "lapse@larry.com",
        firstnames: "Lapse",
        lastname: "Larry",
        always_use_2fa: false,
        two_fa_passed: false,
        cred_id: "1234LARRY",
        trust_id: "875678687GJHGH343",
        factors: {
            password: {
                secret: "password"
            }
        }
    }


    
    
};

export default function(state=initState, action ) {

    switch(action.type) {
        case 'SAVE_ACCOUNT_TO_SERVER':
            return {...state, ...action.data};
        default:
            return state
    }
}
