import { BUTTON_TYPE_CLASSES } from '../../config';
import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
    ButtonSpinner,
} from './button.styles.jsx';

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    const CustomeButton = getButton(buttonType);
    return (
        <CustomeButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomeButton>
    );
};

export default Button;
