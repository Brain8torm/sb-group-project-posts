import classNames from 'classnames';
import styles from './reviews-list.module.css';
import { ReviewCard } from '../review-card';
import usePagination from '../../hooks/usePagination';
import { useState } from 'react';
import { Grid, Pagination, Stack, Typography } from '@mui/material';
import api from '../../utils/api';

export function ReviewsList({ reviews }) {
    const PER_PAGE = 30;
    const [page, setPage] = useState(1);

    const count = Math.ceil(reviews.length / PER_PAGE);
    const _DATA = usePagination(reviews, PER_PAGE);

    const handlePageChange = (event, p) => {
        setPage(p);
        _DATA?.jump(p);
    };
    return (
        <>
            <div className={classNames('reviews', styles.wrapper)}>
                <Grid container spacing={2}>
                    {_DATA.currentData()?.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <ReviewCard key={index} {...item} />
                        </Grid>
                    ))}
                </Grid>
            </div>

            <Stack spacing={2} sx={{ marginTop: 2 }}>
                <Typography>Страница {page}</Typography>
                <Pagination count={count} page={page} onChange={handlePageChange} />
            </Stack>
        </>
    );
}
