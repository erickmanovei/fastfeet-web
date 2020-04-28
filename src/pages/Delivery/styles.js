import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;

    header {
        display: flex;
        align-self: center;
        align-items: center;

        button {
            border: 0;
            background: none;
        }

        strong {
            color: #fff;
            font-size: 24px;
            margin: 0 15px;
        }
    }

    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 15px;
        margin-top: 30px;
    }

    tr {
        text-align: left;
        padding: 10px 20px;
        margin: 10px;
        background: #fff;
    }

    th {
        text-align: left;
        padding: 10px 20px;
    }
`;

export const Title = styled.h1`
    margin-top: 50px;
    font-size: 24px;
    color: #444444;
`;

export const HeaderActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 40px 0;

    button {
        width: 150px;
        height: 40px;
        border-radius: 5px;
        border: 0;
        background: #7d40e7;
        color: #fff;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
        &:hover {
            background: ${darken(0.09, '#7d40e7')};
        }
        svg {
            margin-right: 5px;
        }
    }
`;
