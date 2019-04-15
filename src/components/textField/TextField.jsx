import React from 'react';
import propTypes from 'prop-types';
import './TextField.css';

const TextField = ({ id, name, value, type, placeholder, error, onChange, disabled, checked, onBlur }) => {

    return (
        <div>
            <input
                id={id || name}
                type={type}
                name={name || ''}
                placeholder={placeholder || ''}
                value={value || ''}
                onChange={onChange || null}
                disabled={disabled}
                className={error ? 'error' : ''}
                checked={checked}
                onBlur={onBlur}
            />
            {error && <span className={`${name}-error fieldError`}>{error}</span>}
        </div>
    )
}

TextField.propTypes = {
    id: propTypes.string,
    name: propTypes.string,
    type: propTypes.string.isRequired,
    value: propTypes.string,
    placeholder: propTypes.string,
    onChange: propTypes.func,
    onBlur: propTypes.func,
    disabled: propTypes.bool,
    checked: propTypes.bool,
    error: propTypes.string,
    // label: propTypes.string.isRequired,
    // checkUserExists: propTypes.func
};

TextField.defaultProps = {
    type: 'text',
    disabled: false,
    checked: false,
    onBlur: null,
    onChange: null
};

export default TextField;
