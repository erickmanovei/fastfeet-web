import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    select {
        height: 30px;
    }
`;
export const Page = styled.button`
    width: 30px;
    height: 30px;
    margin-right: 10px;
    background: ${(props) =>
        props.selected ? '#999999' : lighten(0.1, '#7d40e7')};
    color: #fff;
    border: 0;
    border-radius: 5px;
    &:hover {
        background: ${(props) =>
            props.selected ? darken(0.1, '#999999') : '#7d40e7'};
    }
`;
