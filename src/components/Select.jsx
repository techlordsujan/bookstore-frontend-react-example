import React from 'react'

function Select(props) {
    return (
        <div className="mb-3">
            <label for="status" className="form-label">{props.label}</label>
            <select name={props.name} class="form-select" aria-label="Default select example" onChange={props.onChange} value={props.value}>
                {props.options.map((o) => (
                    <option value={o.value}>{o.label}</option>
                ))}
            </select>
        </div>

    )
}

export default Select