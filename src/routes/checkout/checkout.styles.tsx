import styled from 'styled-components';

export const CheckoutContainer = styled.div`
    width: 55%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px auto 0;

    @media screen and (max-width: 800px) {
        width: 92%;
    }
    @media screen and (max-width: 400px) {
    }
`;

export const CheckoutHeader = styled.div`
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid darkgrey;

    @media screen and (max-width: 800px) {
        font-size: 1.8vh;
        justify-content: start;
    }
    @media screen and (max-width: 400px) {
        font-size: 1.8vh;
    }
`;

export const HeaderBlock = styled.div`
    text-transform: capitalize;
    width: 23%;
    &:last-child {
        width: 8%;
    }

    @media screen and (max-width: 800px) {
        width: 15%;
        margin-left: 20px;

        &:last-child {
            width: 10%;
        }

        &:first-child {
          margin-left: -3px;
        }
    }
    @media screen and (max-width: 400px) {
        width: 15%;
    }
`;

export const Total = styled.span`
    margin-top: 30px;
    margin-left: auto;
    font-size: 36px;
`;
