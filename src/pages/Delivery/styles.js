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
    padding: 20px;
    background: #fff;
`;
export const InputField = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px 5px;
    label {
        font-weight: bold;
        margin-bottom: 5px;
    }
    input {
        height: 38px;
        border-radius: 3px;
        background: none;
        border: 1px solid #cccccc;
        padding: 0 10px;
    }
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    h3 {
        font-size: 14px;
        margin-bottom: 10px;
    }
    p {
        margin: 4px 0;
        font-size: 12px;
    }
    hr {
        margin: 15px 0px;
    }
    img {
        width: 100%;
    }
    button {
        margin-top: 20px;
        background: #7159e1;
        border: 0;
        border-radius: 5px;
        color: #fff;
        height: 20px;
    }
`;

export const SelectRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const SelectItem = styled.div`
    list-style: none;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 5px;
`;
export const LabelSelect = styled.div`
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: bold;
`;
export const SpanError = styled.div`
    font-size: 10px;
    color: #ff0000;
    display: ${(props) => (props.show ? 'block' : 'none')};
`;
