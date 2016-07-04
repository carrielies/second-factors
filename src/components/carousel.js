import React from 'react'

export default class extends React.component {

    constructor() {
        this.state = { index: 0}
    }
    
    keyDownHandler(e) {
        let index = this.state.index;
        if ( e.keyCode == 37) {
            index = index==0? 0 : index-1
            // prev
        }
        
        if ( e.keyCode == 39) {
            index = index == (index.length-1) ? index : index++;
            // next
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.keyDownHandler.bind(this) );
    }

    componentWillUnmout() {
        window.removeEventListener( "keydown", this.keyDownHandler )
    }    
    
    render() {

        let url = this.props.pages[this.state.index];
        return (
            <h1></h1>
        )

    }
    
} 