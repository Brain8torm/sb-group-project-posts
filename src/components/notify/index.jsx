import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';

export default function B8Notify({ status, msg }) {
    const [open, setOpen] = useState(false);

    useEffect(
        () => {
            setOpen(true);
        },
        [status]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={msg}
                action={action}
            >
                <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
}