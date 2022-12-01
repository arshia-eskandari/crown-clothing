import styled from 'styled-components';

export const AuthenticationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 900px;
    margin: 30px auto;
    flex-wrap: wrap;

    @media screen and (max-width: 800px) {
        width: 700px;
    }
    @media screen and (max-width: 400px) {
        width: 480px;
    }
`;
