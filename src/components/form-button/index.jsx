import classNames from 'classnames';
import styles from './form-button.module.css';
import { B8Button } from '../button';

export function FormButton(
    {
        children,
        variant,
        color,
        size,
        type,
        ...props
    }
    
) {

    return (
        <B8Button
            variant={variant}
            size={size}
            color={color}
            type={type}
            {...props}
        >
            {children}
        </B8Button>
    );
}