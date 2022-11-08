import { useState } from 'react';
import { BUTTON_TYPE_CLASSES, DEFAULT_SIGNIN_FORM_FIELDS } from '../../config';
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.jsx';
import Button from '../button/button.component';
import { useDispatch } from 'react-redux';
import {
    googleSignInStart,
    emailSignInStart,
} from '../../store/user/user.action';

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(DEFAULT_SIGNIN_FORM_FIELDS);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(DEFAULT_SIGNIN_FORM_FIELDS);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password))
            resetFormFields();
        } catch (err) {
            if (err.code === 'auth/wrong-password') {
                alert('Incorrect password for this email');
                return;
            }
            if (err.code === 'auth/user-not-found') {
                alert('No user is associated with this email');
                return;
            }
            alert('Something went wrong. Please try again later.');
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    value={email}
                    name="email"
                    type="email"
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label="Password"
                    value={password}
                    name="password"
                    type="password"
                    onChange={handleChange}
                    required
                />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button
                        type="button"
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;
