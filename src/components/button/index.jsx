import { Button } from '@mui/material';

export function B8Button({ variant, color, children, href, disabled, extraClass, action }) {

    function handleClick(e) {
        href && e.preventDefault();
        action()
    }

    return (
        href
            ? <Button
                variant={variant}
                color={color ? color : 'primary'}
                {...(disabled && { disabled: true })}
                href={href}
                classes={extraClass}
                onClick={handleClick}
            >{children}</Button>
            : <Button
                variant={variant}
                color={color ? color : 'primary'}
                {...(disabled && { disabled: true })}
                onClick={handleClick}
                classes={{ ...extraClass }}
              >{children}</Button>
    );
}