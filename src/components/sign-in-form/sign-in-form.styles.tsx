import styled from 'styled-components';

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 400px;
  h2 {
    margin: 10px 0;
  }

  @media screen and (max-width: 800px) {
        width: 370px;
    }
    @media screen and (max-width: 400px) {
        width: 370px;
    }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;