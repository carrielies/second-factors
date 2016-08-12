var Datastore = require('nedb');
var Promise = require("bluebird");
Promise.promisifyAll(Datastore.prototype);
import fecha from 'fecha'

import {findAccount as find} from './database'
import {findEnrolment as findEn, updateEnrolment as updateEn, searchTrustStore as searchTrust} from './spacegov_db'

let db = new Datastore();

export function reset() {
    db = new Datastore();
}

export function findAccount(gg_id) {
    return find(gg_id)
}

export function findEnrolment(gg_id ) {
    return findEn(gg_id);
}

export function updateEnrolment(enrolment) {
    return updateEn(enrolment);
}

export function searchTrustStore(email, name, license) {
    return searchTrust(email, name, license);
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

saveGroupEnrolment({
    group_id: "GR587HELP",
    org_name: "Spacegov Helpdesk"
});

