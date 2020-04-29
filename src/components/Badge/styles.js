import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    width: 115px;
    padding: 2px 2px;
    background: ${(props) => props.color};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    font-weight: bold;
    color: ${(props) => darken(0.3, props.color)};
`;

export const Boll = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    background: ${(props) => darken(0.3, props.color)};
`;
