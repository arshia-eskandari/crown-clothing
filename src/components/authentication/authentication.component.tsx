import { Fragment } from 'react';
import Footer from '../../routes/footer/footer.component';
import SignInForm from '../sign-in-form/sign-in-form.component';
import SignUpForm from '../sign-up-form/sign-up-form.component';
import { AuthenticationContainer } from './authentication.styles';

const Athentication = () => {
    return (
        <Fragment>
            <AuthenticationContainer>
                <SignInForm />
                <SignUpForm />
            </AuthenticationContainer>
            <Footer />
        </Fragment>
    );
};

export default Athentication;
