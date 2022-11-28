import { useState, FormEvent, ChangeEvent } from 'react';
import { BUTTON_TYPE_CLASSES, DEFAULT_SIGNIN_FORM_FIELDS } from '../../config';
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles';
import Button from '../button/button.component';
import { useDispatch, useSelector } from 'react-redux';
import {
    googleSignInStart,
    emailSignInStart,
} from '../../store/user/user.action';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(DEFAULT_SIGNIN_FORM_FIELDS);
    const { email, password } = formFields;
    const navigate = useNavigate();
    if (currentUser) navigate('/shop');

    const resetFormFields = () => {
        setFormFields(DEFAULT_SIGNIN_FORM_FIELDS);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(emailSignInStart(email, password));
        resetFormFields();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
