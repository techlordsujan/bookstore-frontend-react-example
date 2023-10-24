import React from 'react'

function Button(props) {
    if (props.type === "submit") {
        return (<button class={`mx-1 btn btn-${props.variant || 'primary'}`} type="submit">{props.label}</button>)
    } else {
        return (<button class={`mx-1 btn btn-${props.variant || 'primary'}`} type="button" onClick={props.handleClick}>{props.label}</button>)
    }
}

export default Button