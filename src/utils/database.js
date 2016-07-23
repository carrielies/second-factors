var Datastore = require('nedb');
var Promise = require("bluebird");
Promise.promisifyAll(Datastore.prototype);
import fecha from 'fecha'

let db = new Datastore();

export function saveAccount(account) {
    return db.insertAsync(account);
}

export function findAccount(email ) {
    return db.findAsync({email}).then((accounts) => {
        return accounts[0];
    });
}

export function findAccountByEmailAndPassword(email, password ) {
    return findAccount(email).then( (account) => {
        if ( !account || account.password !== password.password ) {
            return null;
        }
        else {
            return account;
        }
    });
}

export function saveInteraction(email, origin, event) {
    let time = fecha.format(new Date(), 'DD/MM/YY HH:mm:ss');
    return db.updateAsync( {email: email}, {$push: {interactions: {origin, event, time} }}, {});
}

export function updateAccount(account) {
    delete(account._id);
    return db.updateAsync( {email: account.email}, {$set: account}, {});
}

export function allAccounts() {
    return db.findAsync({})
}

export function serachForAccounts(email, name) {
    return db.findAsync( {email: new RegExp(email, "i"), name: new RegExp(name, "i")} )
}



saveAccount({
    email: "average@joe.com",
    name: "Average Joe",
    always_use_2fa: false,
    cred_id: "765875675786",
    trust_id: "875678687GJHGH343",
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
    cred_id: "1234SIMON",
    trust_id: "875678687GJHGH343",
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
                },
                {
                    device: "iphone",
                    fingerprint: "978978"
                }

            ]
        },
        u2f_key: {
            keyHandle: "LRkki3ijnpibGgHAt26-7AUlnwaE5x46GEng0Ecqx0hBObTBAjX5NpaLZxjIZeL3swiXhsQHEUYP1JH7sJlt-A",
            publicKey: "BLePoDpfZn0_ncwZCNNveSNq_bj7jyaTHqiiZP5x-6q5268wcCXwGpGQXX_QrGQlONzQsHvPxpxivz8V1Wl3gt4"
        }
    }
});

saveAccount({
    email: "lapse@larry.com",
    name: "Lapse Larry",
    always_use_2fa: false,
    cred_id: "1234LARRY",
    trust_id: "875678687GJHGH343",
    interactions: [],
    factors: {
        password: {
            secret: "password"
        }
    }
})