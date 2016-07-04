import React from 'react'

export default function(props) {

    let priority = props.priority || "important";
    let cn = `icon icon-${priority}`;

    return (
        <div className="notice">
            <i className={cn}>
                <span className="visuallyhidden">{priority}</span>
            </i>
            <strong className="small">
                {props.children}
            </strong>
        </div>
    )
}