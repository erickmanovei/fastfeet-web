import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    background: #fff;
    padding: 0 30px;
`;

export const Content = styled.div`
    height: 64px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    nav {
        display: flex;
        align-items: center;
        img {
            max-height: 30px;
            margin-right: 20px;
            padding-right: 20px;
            border-right: 1px solid #eee;
        }
    }
    aside {
        display: flex;
        align-items: center;
    }
`;

export const LinkMenu = styled(Link)`
    font-weight: bold;
    color: ${(props) =>
        JSON.parse(props.activelabel) ? '#444444' : '#999999'};
    margin-right: 40px;
`;

export const Profile = styled.div`
    display: flex;
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid #eee;

    div {
        text-align: right;
        margin-right: 10px;

        strong {
            display: block;
            color: #333;
        }

        button {
            background: none;
            border: 0;
            margin-top: 2px;
            font-size: 12px;
            color: #ff0000;
        }
    }
`;
