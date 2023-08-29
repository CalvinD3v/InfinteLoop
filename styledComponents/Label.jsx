/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

const Label = styled.label`
    display: inline-block;
    font-family: ${props => props.theme?.label?.font?.family};
    font-size: ${props => props.theme?.label?.font?.size};
    font-weight: ${props => props.theme?.label?.font?.weight};
    font-style: ${props => props.theme?.label?.font?.style};
    color: ${props =>
        props['data-fieldstate'] === null
            ? props.theme?.statusColors?.labelDefault
            : props['data-fieldstate']
            ? props.theme?.statusColors?.labelActive
            : props.theme?.statusColors?.labelActive};
    line-height: ${props => props.theme?.label?.font?.lineHeight};
    margin-bottom: 15px;
    padding-right: 40px;
    padding: 0 15px;

    & > div {
        display: flex;
        flex-flow: row nowrap;
        margin-top: 15px;
        align-items: center;
    }

    p {
        margin: 0;

        @media (max-width: 767px) {
            padding-right: 60px;
        }
    }

    @media (max-width: 767px) {
        font-size: ${props => props.theme?.label?.font?.smallSize};
        line-height: ${props => props.theme?.label?.font?.smallLineHeight};
    }
`;

export default Label;
