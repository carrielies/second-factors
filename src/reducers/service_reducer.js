const initState = {
    
    request: {
        name: "Child Maintenance",
        auth_level_required: "2",
        auth_level_desired: "2",
        redirect_url: "/service/landing_page",
    },
    
    response_from_gw: {
        level: "1",
        trust_id: "6876Ff876W868SD787",
        name: "Marky Mid",
        cred_id: "1543245377",
        last_logged_in: "01/12/2016 09:25"
    },
    trusted_hashes: [
        "6876Ff876W868SD787"
    ]
};

export default function(state=initState, action ) {

    switch(action.type) {
        case 'SAVE_SERVICE_TO_SERVER':
            return {...state, ...action.data};
        default:
            return state
    }
}
