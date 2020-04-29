import React from 'react';
import PropTypes from 'prop-types';

import { Container, Page } from './styles';

const Pagination = ({ listfunction, page, perpage, totalregisters }) => {
    const arr = [];
    for (let i = 1; i <= Math.ceil(totalregisters / perpage); i += 1) {
        arr.push({ number: i, selected: i === page });
    }

    const changePage = (pageSelected, perPage) => {
        listfunction(null, pageSelected, perPage);
    };

    return (
        <Container>
            {arr.map((e) => (
                <Page
                    key={e.number}
                    onClick={() => changePage(e.number, perpage)}
                    selected={e.selected}
                >
                    {e.number}
                </Page>
            ))}
            <select
                label="Registros"
                onChange={(e) => changePage(1, e.target.value)}
            >
                <option value="3">3 Registros</option>
                <option value="5">5 Registros</option>
                <option value="10">10 Registros</option>
                <option value="15">15 Registros</option>
            </select>
        </Container>
    );
};

Pagination.propTypes = {
    listfunction: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    perpage: PropTypes.number.isRequired,
    totalregisters: PropTypes.number.isRequired,
};

export default Pagination;
