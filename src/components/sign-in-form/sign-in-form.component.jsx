import { useState } from 'react';
import { DEFAULT_SIGNIN_FORM_FIELDS } from '../../config';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firbase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';

const SignInForm = () => {
    const [formFields, setFormFields] = useState(DEFAULT_SIGNIN_FORM_FIELDS);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(DEFAULT_SIGNIN_FORM_FIELDS);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            console.log(response);
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
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    return (
        <div className="sign-up-container">
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
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button
                        type="button"
                        buttonType="google"
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
