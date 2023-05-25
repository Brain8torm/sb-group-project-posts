import { Container } from '@mui/material';
import { PageH1 } from '../../components/page-h1';
import { ReviewsList } from '../../components/reviews-list';
import { useContext } from 'react';
import { PostsContext } from '../../contexts/posts-context';

export function ReviewsPage() {
    const { reviews } = useContext(PostsContext);


    return (
        <>
            <Container maxWidth="lg">
                <PageH1 content="Отзывы о фильмах" />
                <ReviewsList reviews={reviews} />
            </Container>
        </>
    );
}
