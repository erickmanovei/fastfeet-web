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
    width: 100%;
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
        max-height: 80px;
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

export const AddPictureContainer = styled.div`
    input {
        display: none;
    }
    label {
        background-image: ${(props) =>
            props.image ? `url("${props.image}")` : null};
        background-repeat: no-repeat;
        background-size: 150px 150px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: dashed 1px rgba(0, 0, 0, 0.2);
        align-items: center;
        justify-content: center;
        svg {
            display: ${(props) => (props.image ? 'none' : 'block')};
            color: rgba(0, 0, 0, 0.2);
            font-size: 40px;
        }
        span {
            display: ${(props) => (props.image ? 'none' : 'block')};
            font-weight: bold;
            color: rgba(0, 0, 0, 0.2);
        }
    }
`;
