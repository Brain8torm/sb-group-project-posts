import { Container } from '@mui/material';
import { FormEditPost } from '../../components/forms';
import { useParams } from 'react-router-dom';

export function EditPostPage({ handleFormSubmit }) {
    const { postID } = useParams();

    return (
        <Container maxWidth='sm'>
            <FormEditPost onSubmit={handleFormSubmit} />
        </Container>
    );
}
