import React from 'react';
import PropTypes from 'prop-types';

import { Container, Boll } from './styles';

const getColor = (label) => {
    switch (label) {
        case 'ENTREGUE':
            return '#DFF0DF';
        case 'PENDENTE':
            return '#F0F0DF';
        case 'RETIRADA':
            return '#BAD2FF';
        case 'CANCELADA':
            return '#FAB0B0';
        default:
            return '#FAB0B0';
    }
};

const Badge = ({ label }) => {
    const labelUpper = label.toUpperCase();
    const color = getColor(labelUpper);
    return (
        <Container color={color}>
            <Boll color={color} />
            {labelUpper}
        </Container>
    );
};

Badge.propTypes = {
    label: PropTypes.string.isRequired,
};

export default Badge;
