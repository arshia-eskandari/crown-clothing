import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    BUTTON_TYPE_CLASSES,
    DEFAULT_SHIPPING_ADDRESS_FORM_FIELDS,
    DEFAULT_BILLING_ADDRESS_FORM_FIELDS,
} from '../../config';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import {
    PaymentFormContainer,
    FormContainer,
    StyledCardElement,
    StyledLabel,
} from './payment-form.styles';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const user = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [shippingAddress, setShippingAddress] = useState(
        DEFAULT_SHIPPING_ADDRESS_FORM_FIELDS
    );
    const { shipLine1, shipLine2, shipCity, shipPostalCode, shipState } =
        shippingAddress;
    const [billingAddress, setBillingAddress] = useState(
        DEFAULT_BILLING_ADDRESS_FORM_FIELDS
    );
    const { billLine1, billLine2, billCity, billPostalCode, billState } =
        billingAddress;
    const [checked, setChecked] = useState(true);

    const handleCheckedChange = () => {
        setChecked(!checked);
        setShippingAddress(DEFAULT_SHIPPING_ADDRESS_FORM_FIELDS);
    };

    const resetFormFields = () => {
        setBillingAddress(DEFAULT_BILLING_ADDRESS_FORM_FIELDS);
        setShippingAddress(DEFAULT_SHIPPING_ADDRESS_FORM_FIELDS);
    };

    const handleBillingChange = event => {
        const { name, value } = event.target;
        setBillingAddress({ ...billingAddress, [name]: value });
    };

    const handleShippingChange = event => {
        const { name, value } = event.target;
        setShippingAddress({ ...shippingAddress, [name]: value });
    };

    const paymentHandler = async e => {
        e.preventDefault();

        if (!stripe || !elements) return;

        if (!user) {
            alert('Users must be logged in to make a puchase');
            return;
        }

        if (!billLine1 || !billCity || !billPostalCode || !billState) {
            alert('Missing billing information');
            return;
        }

        if (
            !checked &&
            (!shipLine1 ||
                !shipLine2 ||
                !shipCity ||
                !shipPostalCode ||
                !shipState)
        ) {
            alert('Missing shipping information');
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch(
            '/.netlify/functions/create-payment-intent',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: amount * 100 }),
            }
        ).then(res => res.json());

        const {
            paymentIntent: { client_secret },
        } = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user ? user.displayName : 'Guest',
                    address: {
                        line1: billLine1,
                        line2: billLine2,
                        city: billCity,
                        postal_code: billPostalCode,
                        state: billState,
                        country: 'US',
                    },
                },
            },
            shipping: {
                name: user ? user.displayName : 'Guest',
                address: {
                    line1: checked ? billLine1 : shipLine1,
                    line2: checked ? billLine2 : shipLine2,
                    city: checked ? billCity : shipCity,
                    postal_code: checked ? billPostalCode : shipPostalCode,
                    state: checked ? billState : shipState,
                    country: 'US',
                },
            },
        });

        setIsProcessingPayment(false);
        resetFormFields();

        if (paymentResult.error) {
            alert(paymentResult.error.message);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment successful');
            }
        }
    };
    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment</h2>
                <h3>Billing Address</h3>
                <FormInput
                    label="Line1"
                    value={billLine1}
                    name="billLine1"
                    type="text"
                    onChange={handleBillingChange}
                    required
                />
                <FormInput
                    label="Line2"
                    value={billLine2}
                    name="billLine2"
                    type="text"
                    onChange={handleBillingChange}
                />
                <FormInput
                    label="City"
                    value={billCity}
                    name="billCity"
                    type="text"
                    onChange={handleBillingChange}
                    required
                />
                <FormInput
                    label="ZIP Code"
                    value={billPostalCode}
                    name="billPostalCode"
                    type="text"
                    onChange={handleBillingChange}
                    required
                />
                <FormInput
                    label="State"
                    value={billState}
                    name="billState"
                    type="text"
                    onChange={handleBillingChange}
                    required
                />
                <StyledLabel>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleCheckedChange}
                    />
                    The shipping address is the same as the billing address?
                </StyledLabel>
                {!checked && (
                    <Fragment>
                        <h3>Shipping Address</h3>
                        <FormInput
                            label="Line1"
                            value={shipLine1}
                            name="shipLine1"
                            type="text"
                            onChange={handleShippingChange}
                            required
                        />
                        <FormInput
                            label="Line2"
                            value={shipLine2}
                            name="shipLine2"
                            type="text"
                            onChange={handleShippingChange}
                        />
                        <FormInput
                            label="City"
                            value={shipCity}
                            name="shipCity"
                            type="text"
                            onChange={handleShippingChange}
                            required
                        />
                        <FormInput
                            label="ZIP Code"
                            value={shipPostalCode}
                            name="shipPostalCode"
                            type="text"
                            onChange={handleShippingChange}
                            required
                        />
                        <FormInput
                            label="State"
                            value={shipState}
                            name="shipState"
                            type="text"
                            onChange={handleShippingChange}
                            required
                        />
                    </Fragment>
                )}
                <h3>Card Information</h3>
                <StyledCardElement />
                <Button
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                    isLoading={isProcessingPayment}
                >
                    Pay Now
                </Button>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
