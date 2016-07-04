const initState = {
    
    "marky@gmail.com": {
        email: "marky@gmail.com",
        firstnames: "Marky Mark",
        lastname: "Middleton",
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
