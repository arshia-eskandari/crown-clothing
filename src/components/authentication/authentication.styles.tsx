import styled from 'styled-components';

export const AuthenticationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 900px;
    margin: 30px auto;
    flex-wrap: wrap;
    height: 540px;

    @media screen and (max-width: 800px) {
        width: 700px;
        height: 900px;
        display: block;
    }
    @media screen and (max-width: 400px) {
        width: 480px;
    }
`;
