import styled from 'styled-components';

export const AddButtonWrapper = styled.div`
    right: 10px;
    top: 10px;
    z-index: 1;
    display: flex;
    flex-flow: row-reverse nowrap;

    button {
        display: block;
        width: 72px;
        height: 36px;
        line-height: 36px;
        margin-left: 5px !important;
        padding-left: 5px !important;
        padding-right: 5px !important;

        &.toggle-minus {
            span {
                &:after,
                &:before {
                    background: #fff;
                }
            }
        }
    }
`;
