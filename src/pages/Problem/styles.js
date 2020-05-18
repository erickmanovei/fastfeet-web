import styled from 'styled-components';

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

export const Title = styled.h1`
    margin-top: 50px;
    font-size: 24px;
    color: #444444;
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

export const Abbreviate = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
`;
