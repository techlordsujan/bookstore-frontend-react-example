import React from 'react'

function Input(props) {
    return (
        <div class="mb-3">
            <label for={props.id} class="form-label">{props.label}</label>
            <input
                type={props.type}
                class="form-control"
                id={props.id}
                placeholder={props.placeholder}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
            />
        </div>
    )
}

export default Input