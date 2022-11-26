import { BUTTON_TYPE_CLASSES } from '../../config';
import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
    ButtonSpinner,
} from './button.styles';
import { FC, ButtonHTMLAttributes } from 'react';

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

export type ButtonProps = {
    children: string;
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
    children,
    buttonType,
    isLoading,
    ...otherProps
}) => {
    const CustomeButton = getButton(buttonType);
    return (
        <CustomeButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomeButton>
    );
};

export default Button;
