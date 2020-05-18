import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
`;

export const ActionList = styled.div`
    position: absolute;
    width: 190px;
    left: calc(-88px);
    top: calc(100% + 10px);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 5px 5px;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    box-shadow: 1px 1px 3px #000;
    z-index: 9;

    &::after {
        content: '';
        position: absolute;
        left: calc(50% - 10px);
        top: -8px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
    }

    &::before {
        content: '';
        position: absolute;
        left: calc(50% - 10px);
        top: -10px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(0, 0, 0, 0.1);
    }
    li {
        list-style-type: none;
        margin-left: 5px;
        margin-bottom: 10px;
        padding-left: 5px;
        padding-top: 5px;
        & + li {
            padding-top: 10px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        button {
            color: #999999;
            &:hover {
                color: #7d40e7;
            }
        }
        svg {
            margin-right: 5px;
        }
    }
`;
