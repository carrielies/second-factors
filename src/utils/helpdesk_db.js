import {saveInteraction as interaction, serachForAccounts as search, findAccount as find, updateAccount as update} from './database'

export function searchForAcounts(email, name) {
    return search(email, name)
}

export function findAccount(email) {
    return find(email)
}

export function updateAccount(account) {
    return update(account);
}

export function saveAccountInteraction(email, origin, event) {
    return interaction(email, origin, event);
}