import React from 'react'

export default function(props) {

    let errorProps = props.errors || {};
    let errors = Object.keys(errorProps).map( (k) => <li><a href={`#${k}`}>{props.errors[k].summary}</a></li> )
    let header = props.header || "Please fix the problems below";

    if( Object.keys(errorProps).length == 0 ) {
        return null
    }
    else {
        return (
            <div className="error-summary" role="group">
                <h1 className="heading-medium error-summary-heading" id="error-summary-heading-example-1">
                    {header}
                </h1>
                <ul className="error-summary-list">
                    {errors}
                </ul>
            </div>
        )
    }
}
