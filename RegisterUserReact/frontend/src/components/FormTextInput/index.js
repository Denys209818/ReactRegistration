import React, { Component } from 'react'
import PropTypes from 'prop-types'

const FormTextInput = (props) => 
{
    const { field, type, label, value, labelText, onInputHandler } = props;
    return (
        <div className="form-group">
            <label className="form-label" htmlFor={field}>{label}</label>
            <input className="form-control"
            type={type}
                id={field} name={field}
                placeholder={labelText}
                value={value}
                onInput={onInputHandler}
            />
            <div className="invalid-feedback">
                Поле {label} введено не коректно!
            </div>
        </div>
    );

    

}

FormTextInput.defaulProps = {
    type: 'text'
};

FormTextInput.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired
};

export default FormTextInput
