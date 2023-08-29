import styled from 'styled-components';

export const QInfiniteLoopWrapper = styled.div`
    background-color: #fffff;
    display: flex;
    flex-direction: row;
    border: 1px solid rgb(234, 236, 237);
    border-radius: 2px;
    padding: 10px;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
