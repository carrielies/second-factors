import React from 'react'

export default function(props) {
    return(
        <div className="grid-row">
            <div className="column-two-thirds">
                <h1 className="heading-medium">{props.title}</h1>
                {props.children}
            </div>
        </div>
    )
}