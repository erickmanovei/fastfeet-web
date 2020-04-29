import React from 'react';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';

import { Container } from './styles';

const getInitials = (string) => {
    const names = string.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

const Initials = ({ name }) => {
    const color = randomColor({
        luminosity: 'light',
    });
    const initials = getInitials(name);
    return <Container color={color}>{initials}</Container>;
};

Initials.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Initials;
