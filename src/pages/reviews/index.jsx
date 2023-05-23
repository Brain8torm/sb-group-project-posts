import { Container } from '@mui/material';
import { PageH1 } from '../../components/page-h1';
import { ReviewsList } from '../../components/reviews-list';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export function ReviewsPage() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        api.getReviews().then((reviewsData) => {
            let filteredReviews = reviewsData
                .filter((item, index) => item?.author.group === 'group-11')
                .sort((a, b) => a?.created_at < b?.created_at);
            setReviews(filteredReviews);
        });
    }, []);

    return (
        <>
            <Container maxWidth="lg">
                <PageH1 content="Отзывы о фильмах" />
                <ReviewsList reviews={reviews} />
            </Container>
        </>
    );
}
