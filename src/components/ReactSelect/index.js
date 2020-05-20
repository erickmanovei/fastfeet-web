import React, { useRef, useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';

import { useField } from '@rocketseat/unform';
import { Select, Error } from './styles';

export default function ReactSelect({ name, label, defaultOptions, ...rest }) {
    const ref = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    const [value, setValue] = useState({});

    function parseSelectValue() {
        return value?.id ? value.id : '';
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: ref.current,
            path: 'state.value',
            parseValue: parseSelectValue,
            clearValue: (selectRef) => {
                selectRef.select.clearValue();
            },
        });
    }, [ref.current, fieldName, value]); // eslint-disable-line

    useEffect(() => {
        const v = defaultOptions.find((option) => option.id === defaultValue);
        setValue(v);
    }, [defaultOptions, defaultValue]);

    const filterOption = (inputValue) => {
        // eslint-disable-next-line react/prop-types
        return defaultOptions.filter((i) =>
            i.title.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const promiseOptions = (inputValue) => {
        return new Promise((resolve) => {
            resolve(filterOption(inputValue));
        });
    };

    return (
        <>
            {label && <label htmlFor={fieldName}>{label}</label>}

            <Select
                name={fieldName}
                defaultOptions={defaultOptions}
                loadOptions={promiseOptions}
                defaultValue={value}
                value={value?.id ? value : null}
                ref={ref}
                onChange={(e) => setValue(e)}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.title}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
            />

            {error && <Error>{error}</Error>}
        </>
    );
}

ReactSelect.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultOptions: PropTypes.arrayOf(object).isRequired,
};
