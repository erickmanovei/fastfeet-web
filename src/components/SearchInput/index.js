import React from 'react';
import PropTypes from 'prop-types';

import { FaSearch } from 'react-icons/fa';
import { Search, SearchBar } from './styles';

// libaries

const SearchInput = ({ placeholder, onchange }) => {
    return (
        <Search>
            <FaSearch style={{ marginLeft: '1rem', position: 'absolute' }} />
            <SearchBar
                id="search-bar"
                type="text"
                placeholder={placeholder}
                onChange={(e) => onchange(e.target.value)}
            />
        </Search>
    );
};

SearchInput.protoTypes = {
    placeholder: PropTypes.string.isRequired,
};
SearchInput.defaultProps = {
    placeholder: 'Buscar',
};

export default SearchInput;
