import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEllipsisH, FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Container, ActionList, Ext } from './styles';

const Actions = ({ id, show, update, remove, removelabel }) => {
    const [visible, setVisible] = useState(false);

    const handleVisible = () => {
        setVisible(!visible);
    };
    const handeRemove = () => {
        confirmAlert({
            title: 'Atenção',
            message: 'Deseja realizar a remoção / cancelamento?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => remove(id),
                },
                {
                    label: 'Não',
                    onClick: () => null,
                },
            ],
        });
    };
    return (
        <>
            <Ext onClick={handleVisible} show={visible} />
            <Container>
                <button type="button" onClick={handleVisible}>
                    <FaEllipsisH color="#666666" />
                </button>
                <ActionList visible={visible}>
                    {show ? (
                        <li>
                            <button
                                type="button"
                                onClick={() => show(id)}
                                to={`/delivery/${id}`}
                            >
                                <FaEye color="#8E5BE8" /> Visualizar
                            </button>
                        </li>
                    ) : null}
                    {update ? (
                        <li>
                            <button
                                type="button"
                                onClick={() => update(id)}
                                to={`/delivery/${id}`}
                            >
                                <FaPen color="#4D85EE" /> Editar
                            </button>
                        </li>
                    ) : null}
                    {remove ? (
                        <li>
                            <button
                                type="button"
                                onClick={handeRemove}
                                to={`/delivery/${id}`}
                            >
                                <FaTrash color="#DE3B3B" /> {removelabel}
                            </button>
                        </li>
                    ) : null}
                </ActionList>
            </Container>
        </>
    );
};

Actions.propTypes = {
    id: PropTypes.number.isRequired,
    show: PropTypes.func,
    update: PropTypes.func,
    remove: PropTypes.func,
    removelabel: PropTypes.string,
};

Actions.defaultProps = {
    show: null,
    update: null,
    remove: null,
    removelabel: 'Excluir',
};

export default Actions;
