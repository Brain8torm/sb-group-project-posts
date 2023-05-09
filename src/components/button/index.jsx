import { Button } from '@mui/material';

export function B8Button({ children, variant, color, size, type, href, disabled, extraClass, action }) {

    function handleClick(e) {
        href && e.preventDefault();
        action()
    }
    
    return (
        href
            ? <Button
                variant={variant ? variant : 'contained'}
                color={color ? color : 'primary'}
                size={size ? size : 'medium'}
                {...(disabled && { disabled: true })}
                href={href || '#'}
                classes={extraClass}
                onClick={handleClick}
            >{children}</Button>
            : <Button
                variant={variant ? variant : 'contained'}
                color={color ? color : 'primary'}
                size={size ? size : 'medium'}
                {...(disabled && { disabled: true })}
                classes={{ ...extraClass }}
                type={type ? type : 'button'}
                onClick={action}
            >{children}</Button>
    );
}
