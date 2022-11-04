import SignInForm from '../sign-in-form/sign-in-form.component';
import SignUpForm from '../sign-up-form/sign-up-form.component';
import { AuthenticationContainer } from './authentication.styles.jsx';

const Athentication = () => {
    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    );
};

export default Athentication;
