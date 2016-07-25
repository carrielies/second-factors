import {saveInteraction as interaction, serachForAccounts as search, findAccount as find,findByEmailAccount as findEmail, updateAccount as update} from './database'

export function searchForAcounts(email, name) {
    return search(email, name)
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