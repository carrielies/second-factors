export default class {

    constructor( data ) {
        this.data = data;
    }

    findByEmailAndPassword(email, password) {
        const account = this.data[email];
        if ( !account ) return null;
        if ( account.factors.password.secret != password ) return null;
        return account;
    }

    findByEmail(email) {
        const account = this.data[email];
        return account;

    }




}