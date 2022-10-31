import { useState } from 'react';
import { DEFAULT_SIGNUP_FORM_FIELDS } from '../../config';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firbase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(DEFAULT_SIGNUP_FORM_FIELDS);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(DEFAULT_SIGNUP_FORM_FIELDS);
    };
    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('passwords do not match.');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use.');
                return;
            }
            console.log(err.message);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    value={displayName}
                    name="displayName"
                    type="text"
                    onChange={handleChange}
                    required
                />
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
                <FormInput
                    label="Confirm Password"
                    value={confirmPassword}
                    name="confirmPassword"
                    type="password"
                    onChange={handleChange}
                    required
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
