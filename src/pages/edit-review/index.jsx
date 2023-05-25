import { Container } from '@mui/material';
import { FormEditReview } from '../../components/forms';



export function EditReviewPage({ handleFormSubmit }) {
    return (
        <Container maxWidth='sm'>
            <FormEditReview onSubmit={handleFormSubmit} />
        </Container>
    );
}
