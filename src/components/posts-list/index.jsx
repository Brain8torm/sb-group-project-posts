import { PostCard } from '../post-card';
import { PostCardAlt } from '../post-card-alt';
import { Grid, Pagination, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import usePagination from '../../hooks/usePagination';
import { PostsContext } from '../../contexts/posts-context';
import { PostsFilter } from '../posts-filter';

export function PostsList({ type }) {
    const { posts } = useContext(PostsContext);

    const PER_PAGE = 12;
    const [page, setPage] = useState(1);
    const count = Math.ceil(posts.length / PER_PAGE);
    const _DATA = usePagination(posts, PER_PAGE);

    const handlePageChange = (event, p) => {
        setPage(p);
        _DATA?.jump(p);
    };


    return (
        <>
            <PostsFilter />
            <Grid container spacing={2}>
                {_DATA.currentData()?.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        {type === 'my' ? <PostCard {...item} /> : <PostCardAlt {...item} />}
                    </Grid>
                ))}
            </Grid>

            <Stack spacing={2} sx={{ marginTop: 2 }}>
                <Typography>Страница {page}</Typography>
                <Pagination count={count} page={page} onChange={handlePageChange} />
            </Stack>
        </>
    );
}
