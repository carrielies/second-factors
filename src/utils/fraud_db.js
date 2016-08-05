var Datastore = require('nedb');
var Promise = require("bluebird");
Promise.promisifyAll(Datastore.prototype);
import fecha from 'fecha'


let db = new Datastore();

export function reset() {
    db = new Datastore();
}

export function saveGroupEnrolment(groupEnrolment) {
    return db.insertAsync(groupEnrolment);
}

export function findGroupEnrolment(group_id ) {
    return db.findAsync({group_id}).then((groupEnrolments) => {
        return groupEnrolments[0];
    });
}

export function exportGroupEnrolments() {
    return db.findAsync({})
}

export function rawDb() {
    return db;
}

import {saveInteraction as interaction, searchForAccounts as search, findAccount as find,findByEmailAccount as findEmail, updateAccount as update} from './database'


export function rawDb() {
    return db;
}

export function searchForAccounts(email, name, gg_id) {
    return search(email, name, gg_id)
}

export function findAccount(gg_id) {
    return find(gg_id)
}

export function findAccountByEmail(email) {
    return findAccountByEmail(email)
}


export function updateAccount(account) {
    return update(account);
}

export function saveAccountInteraction(gg_id, origin, event) {
    return interaction(gg_id, origin, event);
}

saveGroupEnrolment({
    group_id: "GR587FRAUD",
    org_name: "Fraud Helpdesk"
});

