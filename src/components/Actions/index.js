import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEllipsisH, FaEye, FaPen, FaTrash } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { Container, ActionList } from './styles';

const Actions = ({ id }) => {
    const [visible, setVisible] = useState(false);

    const handleVisible = () => {
        setVisible(!visible);
    };
    return (
        <Container>
            <button type="button" onClick={handleVisible}>
                <FaEllipsisH color="#666666" />
            </button>
            <ActionList visible={visible}>
                <li>
                    <Link to={`/delivery/${id}`}>
                        <FaEye color="#8E5BE8" /> Visualizar
                    </Link>
                </li>
                <li>
                    <Link to={`/delivery/${id}`}>
                        <FaPen color="#4D85EE" /> Editar
                    </Link>
                </li>
                <li>
                    <Link to={`/delivery/${id}`}>
                        <FaTrash color="#DE3B3B" /> Excluir
                    </Link>
                </li>
            </ActionList>
        </Container>
    );
};

Actions.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Actions;
