import styled from 'styled-components';

export default styled.table`
    border: 0;
    padding: 0;
    border-spacing: 0 15px;
    thead {
        th {
            text-align: left;
            padding: 10px 20px;
        }
    }
    tbody {
        color: #666666;
        tr {
            background: #fff;
            text-align: left;
            td {
                border: none;
                padding: 10px 20px;
                button {
                    background: none;
                    border: none;
                }
            }
        }
    }
`;
