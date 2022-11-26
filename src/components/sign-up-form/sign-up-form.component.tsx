import { useState, ChangeEvent, FormEvent } from 'react';
import { DEFAULT_SIGNUP_FORM_FIELDS } from '../../config';
import FormInput from '../form-input/form-input.component';
import { SignUpContainer } from './sign-up-form.styles';
import Button from '../button/button.component';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.action';

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(DEFAULT_SIGNUP_FORM_FIELDS);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(DEFAULT_SIGNUP_FORM_FIELDS);
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('passwords do not match.');
            return;
        }

        dispatch(signUpStart(email, password, displayName));
        resetFormFields();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <SignUpContainer>
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
        </SignUpContainer>
    );
};

export default SignUpForm;
