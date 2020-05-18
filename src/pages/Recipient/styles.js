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
`;

export const Name = styled.div`
    display: flex;
    align-items: center;
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
    margin: 20px 0;

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

export const HeaderActionsStore = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 40px 0;

    h1 {
        font-size: 24px;
        color: #444444;
    }

    div {
        display: flex;
        flex-direction: row;
    }
`;
export const ButtonActionsStore = styled.button`
    width: 150px;
    height: 40px;
    border-radius: 5px;
    border: 0;
    background: ${(props) => (props.back ? '#CCCCCC' : '#7d40e7')};
    color: #fff;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    margin-left: 20px;
    &:hover {
        background: ${(props) =>
            props.back ? darken(0.09, '#CCCCCC') : darken(0.09, '#7d40e7')};
    }
    svg {
        margin-right: 5px;
    }
`;

export const ContentStore = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #fff;
`;
export const InputField = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${(props) => props.flex || 1};
    padding: 15px 5px;
    label {
        font-weight: bold;
        margin-bottom: 5px;
        margin-top: 20px;
    }
    input {
        height: 38px;
        border-radius: 3px;
        background: none;
        border: 1px solid #cccccc;
        padding: 0 10px;
    }
    span {
        color: red;
        font-size: 10px;
    }
`;

export const InputRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;
