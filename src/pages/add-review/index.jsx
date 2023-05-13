import { Container } from '@mui/material';
import { FormAddReview } from '../../components/forms';

export function AddReviewPage({handleFormSubmit}) {
    return (
        <Container maxWidth='sm'>
            <FormAddReview onSubmit={handleFormSubmit} />
        </Container>
    );
}
