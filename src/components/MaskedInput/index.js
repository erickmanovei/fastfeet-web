import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import { useField } from '@rocketseat/unform';

export default function MaskedInput({ name, label, mask, ...rest }) {
    const ref = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    const [valueEdited, setValueEdited] = useState('');

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: ref.current,
            path: 'value',
        });
    }, [ref.current, fieldName]); // eslint-disable-line

    useEffect(() => {
        setValueEdited(defaultValue || '');
    }, [defaultValue]);

    function getDefaultValue() {
        return valueEdited;
    }

    return (
        <>
            {label && <label htmlFor={fieldName}>{label}</label>}

            <InputMask
                name={fieldName}
                aria-label={fieldName}
                value={getDefaultValue()}
                mask={mask}
                onChange={(e) => setValueEdited(e.target.value)}
                ref={ref}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
            />

            {error && <span>{error}</span>}
        </>
    );
}

MaskedInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    mask: PropTypes.string.isRequired,
};
