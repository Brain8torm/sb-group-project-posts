import { TextField } from '@mui/material';
import { forwardRef } from 'react';

const FormInput = forwardRef(({ typeTag, ...props }, ref) => {
    return (
        typeTag === 'textarea'
            ? <textarea ref={ref} {...props} />
            : <TextField ref={ref} {...props} />
    );
});

export default FormInput;