var Datastore = require('nedb');
var Promise = require("bluebird");
Promise.promisifyAll(Datastore.prototype);
import fecha from 'fecha'

import {saveInteraction as interaction, searchForAccounts as search, findAccount as find,findByEmailAccount as findEmail, updateAccount as update} from './database'

let db = new Datastore();

export function reset() {
    db = new Datastore();
}


export function saveGroupEnrolment(groupEnrolment) {
    return db.insertAsync(groupEnrolment);
}


export function exportGroupEnrolments() {
    return db.findAsync({})
}

export function rawDb() {
    return db;
}

export function searchForAcounts(email, name, gg_id) {
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
    group_id: "GR587HELP",
    org_name: "Spacegov Helpdesk"
});

