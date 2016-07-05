import React from 'react'

export default class QuestionPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {errors: {}};
    }

    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });

    }

    validate(e,rules,callback) {
        let errors = {};
        let props = {};
        Object.keys(rules).forEach( (k) => {
            let val = this.refs[k].value();
            props[k] = val;
            let regEx = rules[k].regEx || /\w+/;
            if (! val.match(regEx) ) errors[k] = rules[k]
        });

        this.setState( {errors});

        if (Object.keys(errors).length != 0 ) {
            e.preventDefault();
            return false;
        }
        else {
            if ( callback ) {
                callback(props)
            }
            return props;
        }
    }
    
    doNothing(e) {
        e.preventDefault();
    }

}