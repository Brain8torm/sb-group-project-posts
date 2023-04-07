import Masonry from '@mui/lab/Masonry';
import { PostCard } from '../post-card';
import { Grid, Pagination, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import usePagination from '../../hooks/usePagination';


export function PostsList({ posts, type }) {
    const PER_PAGE = 12;
    const [page, setPage] = useState(1);
    const count = Math.ceil((posts.length) / PER_PAGE);
    const _DATA = usePagination(posts, PER_PAGE);

    const handlePageChange = (event, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <>
            {type === 'masonry'
                ?
                (
                    <Masonry columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={2}>
                        <>
                            {
                                _DATA.currentData().map((item, index) => (
                                    <PostCard key={index} cardImg='image' {...item} />
                                ))
                            }
                        </>
                    </Masonry>
                )
                :
                (

                    <Grid container spacing={2}>
                        {
                            _DATA.currentData().map((item, index) => (
                                <Grid item xs={2} md={3} key={index}>
                                    <PostCard {...item} />
                                </Grid>
                            ))

                        }
                    </Grid>
                )
            }

            <Stack spacing={2} sx={{marginTop: 2}}>
                <Typography>Страница {page}</Typography>
                <Pagination count={count} page={page} onChange={handlePageChange} />
            </Stack>
        </>
    );
}
