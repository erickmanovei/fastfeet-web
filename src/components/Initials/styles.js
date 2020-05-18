import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background: ${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    color: ${(props) => darken(0.5, props.color)};
`;

export const Image = styled.img`
    height: 35px;
    width: 35px;
    border-radius: 50%;
`;
