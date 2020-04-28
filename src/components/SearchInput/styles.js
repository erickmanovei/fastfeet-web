import styled from 'styled-components';

export const Search = styled.div`
    padding: 0.5rem;
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    color: rgba(0, 0, 0, 0.2);
`;
export const SearchBar = styled.input`
    padding: 1rem 1rem 1rem 3.5rem;
    width: 300px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    &::placeholder {
        color: rgba(0, 0, 0, 0.2);
    }
`;
