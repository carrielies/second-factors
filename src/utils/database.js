var Datastore = require('nedb');
var Promise = require("bluebird");
Promise.promisifyAll(Datastore.prototype);
import fecha from 'fecha'

let db = new Datastore();

export function reset() {
    db = new Datastore();
}

export function saveAccount(account) {
    return db.insertAsync(account);
}

export function findAccount(gg_id ) {
    return db.findAsync({gg_id}).then((accounts) => {
        return accounts[0];
    });
}

export function findAccountByEmail(email ) {
    return db.findAsync({email}).then((accounts) => {
        return accounts[0];
    });
}


export function findAccountByEmailAndPassword(email, password ) {
    return findAccountByEmail(email).then( (account) => {
        if ( !account || account.factors.password.secret !== password ) {
            return null;
        }
        else {
            return account;
        }
    });
}


export function applyInteraction(account, origin, event) {
    let time = fecha.format(new Date(), 'DD/MM/YY HH:mm:ss');
    account.interactions.push( {origin, event, time} );
    return account;
}


export function saveInteraction(gg_id, origin, event) {
    let time = fecha.format(new Date(), 'DD/MM/YY HH:mm:ss');
    return db.updateAsync( {gg_id: gg_id}, {$push: {interactions: {origin, event, time} }}, {});
}

export function updateAccount(account) {
    delete(account._id);
    return db.updateAsync( {gg_id: account.gg_id}, {$set: account}, {});
}

export function deleteAccount(account) {
    account.status = "Deleted";
    return updateAccount(account);
}

export function allAccounts() {
    return db.findAsync({})
}

export function searchForAccounts(email, name, gg_id) {
    return db.findAsync( {email: new RegExp(email, "i"), name: new RegExp(name, "i"), gg_id: new RegExp(gg_id, "i")} )
}

export function rawDb() {
    return db;
}

export function getGroupAccounts( group_id ) {
    return db.findAsync( {group_id: group_id } )
}

saveAccount({
    email: "average@joe.com",
    name: "Average Joe",
    always_use_2fa: false,
    gg_id: "765875675786",
    trust_id: "875678687GJHGH343",
    trust_id_level_2: "875678687GJHGH343",
    group_id: "GR58757",
    type: "individual",
    interactions: [],
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
                }
            ]
        }
    }
});


saveAccount({
    email: "org@olive.com",
    name: "Organised Olive",
    always_use_2fa: false,
    gg_id: "765875675786234",
    trust_id: "875678687GJ234HGH343",
    trust_id_level_2: "875678687GJHGH343",
    group_id: "GR58723457",
    org_name: "Olive ltd",
    type: "admin",
    is_org: true,
    interactions: [],
    factors: {
        password: {
            secret: "password"
        },
        google_authenticator: {
            secret: "JM4VQTSGMQRSGRZEKJGSMUTNORUE63JS"
        }
    }
});

saveAccount({
    email: "annie@olive.com",
    name: "Assistant Annie",
    always_use_2fa: false,
    gg_id: "765123475786234",
    trust_id: "875678687GJ234HGH343",
    trust_id_level_2: "875678687GJHGH343",
    group_id: "GR58723457",
    org_name: "Olive ltd",
    type: "assistant",
    is_org: true,
    interactions: [],
    factors: {
        password: {
            secret: "password"
        },
        google_authenticator: {
            secret: "JM4VQTSGMQRSGRZEKJGSMUTNORUE63JS"
        }
    }
});

saveAccount({
    email: "helen@spacegov-help.com",
    name: "Helpful Helen",
    always_use_2fa: false,
    gg_id: "765875671112223",
    trust_id: "875678687G4HELPGL111",
    trust_id_level_2: "875678687G4HELPGL111",
    group_id: "GR587HELP",
    org_name: "Spacegov Helpdesk",
    type: "admin",
    is_org: true,
    interactions: [],
    factors: {
        password: {
            secret: "password"
        },
        google_authenticator: {
            secret: "JM4VQTSGMQRSGRZEKJGSMUTNORUE63JS"
        }
    }
});

saveAccount({
    email: "security@simon.com",
    name: "Security Simon",
    always_use_2fa: true,
    gg_id: "GWed85d4c3",
    trust_id: "875678687GJHGH343",
    trust_id_level_2: "875678687GJHGH343",
    group_id: "GR58877",
    interactions: [],
    type: "individual",
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
        },
        u2f_key: {
            keyHandle: "zIdS3YuIc5lLQr9cusvGHLPCEGby_eTE83vOFgoQ7PzjTvrWNdVBz3GRxTEXHG6LrYWviCepe1XWilPwTONt8w",
            publicKey: "BFYR1mysTZA-TZSnlN7KAdPcGjeb-Txp4EOQSjg8wYENedh-ZxIQomh3R935cx2pRMJdiHUsaPZxZmHX3vtO2Hs"
        },
        cryptophoto: {

        }
    }
});

saveAccount({
    email: "lapse@larry.com",
    name: "Lapse Larry",
    always_use_2fa: false,
    gg_id: "1234LARRY",
    trust_id: "875678687GJHGH343",
    trust_id_level_2: "875678687GJHGH343",
    group_id: "GR511257",
    type: "individual",
    interactions: [],
    factors: {
        password: {
            secret: "password"
        }
    }
})

saveAccount({
    email: "Patty@fraud.com",
    name: "Police Patty",
    always_use_2fa: false,
    gg_id: "765875671115523",
    trust_id: "875678687G4FRAUDGL111",
    trust_id_level_2: "875678687G4FRAUDGL111",
    group_id: "GR587FRAUD",
    org_name: "Fraud Helpdesk",
    type: "admin",
    is_org: true,
    interactions: [],
    factors: {
        password: {
            secret: "password"
        },
        google_authenticator: {
            secret: "JM4VQTSGMQRSGRZEKJGSMUTNORUE63JS"
        }
    }
});