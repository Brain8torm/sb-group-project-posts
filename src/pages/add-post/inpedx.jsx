import { Container } from '@mui/material';
import { FormAddPost } from '../../components/forms';

export function AddPostPage({handleFormSubmit}) {
    return (
        <Container maxWidth='sm'>
            <FormAddPost onSubmit={handleFormSubmit} />
        </Container>
    );
}
