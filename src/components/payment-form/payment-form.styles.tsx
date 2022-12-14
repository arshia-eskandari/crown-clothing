import { CardElement } from '@stripe/react-stripe-js';
import styled from 'styled-components';

export const PaymentFormContainer = styled.div`
    min-height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const FormContainer = styled.form`
    min-width: 500px;
    margin-bottom: 20px;

    @media screen and (max-width: 800px) {
        width: 370px;
        min-width: 370px;
    }
    @media screen and (max-width: 400px) {
        width: 370px;
    }
`;

export const StyledCardElement = styled(CardElement)`
    margin-top: 40px;
    margin-bottom: 40px;
`;

export const StyledLabel = styled.label`
    display: block;
    margin-bottom: 40px;
`
