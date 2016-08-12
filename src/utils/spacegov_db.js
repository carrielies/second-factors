var Datastore = require('nedb');
var Promise = require("bluebird");
Promise.promisifyAll(Datastore.prototype);
import fecha from 'fecha'

let db = new Datastore();

export function reset() {
    db = new Datastore();
}


export function saveEnrolment(enrolment) {
    return db.insertAsync(enrolment);
}

export function findEnrolment(gg_id ) {
    return db.findAsync({gg_id}).then((enrolments) => {
        return enrolments[0];
    });
}

export function updateEnrolment(enrolment) {
    return db.updateAsync( {gg_id: enrolment.gg_id}, enrolment, {});
}

export function searchTrustStore(email, name, license) {
    return db.findAsync( {email: new RegExp(email, "i"), name: new RegExp(name, "i"), space_trading_license_number: new RegExp(license, "i")} )
}

export function exportEnrolments() {
    return db.findAsync({}).then((enrolments) => {
        return JSON.stringify({data: enrolments})
    });
}

export function rawDb() {
    return db;
}

saveEnrolment(
  {
    email: "lapse@larry.com",
    name: "Lapse Larry",
    gg_id: "1234LARRY",
    trust_id: "875678687GJHGH343",
    space_trading_license_number: "SP651C02E4",
    org_name: "Lapse Larry SpaceCorp",
    mission: "See the Universe"
  }
)

saveEnrolment(
  {
    email: "average@joe.com",
    name: "Average Joe",
    gg_id: "765875675786",
    trust_id: "875678687GJHGH343",
    space_trading_license_number: "SP645C02E5",
    org_name: "Average Joe Mining",
    mission: "Mine the Universe"
  }
)