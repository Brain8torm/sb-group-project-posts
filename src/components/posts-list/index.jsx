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

    /*    const sortData = ['По названию', 'По году выпуска', 'По рейтингу', 'По лайкам', 'По отзывам'];

    const handlePostsSortChange = (e) => {
        setCurrentPostsSort(e.target.value);
    };

    const handleMovieYearFilterChange = (e) => {
        if (e.target.value) {
            setFilterActive(true);
            setCurrentMovieYearFilter(e.target.value);
        } else {
            setFilterActive(false);
        }
    };



    if (currentPostsSort === 'По названию') {
        posts?.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));
    }

    if (currentPostsSort === 'По лайкам') {
        posts?.sort((a, b) =>
            a.likes.length < b.likes.length ? 1 : b.likes.length < a.likes.length ? -1 : 0
        );
    }

    if (currentPostsSort === 'По отзывам') {
        posts?.sort((a, b) =>
            a.comments.length < b.comments.length
                ? 1
                : b.comments.length < a.comments.length
                ? -1
                : 0
        );
    }

    if (currentPostsSort === 'По году') {
        posts?.sort((a, b) => {
            const yearA = a?.text.split('|')[1].split(':')[1];
            const yearB = b?.text.split('|')[1].split(':')[1];
            return yearA < yearB ? 1 : yearB < yearA ? -1 : 0;
        });
    }

    if (currentPostsSort === 'По рейтингу') {
        posts?.sort((a, b) => {
            const yearA = a?.text.split('|')[5].split(':')[1];
            const yearB = b?.text.split('|')[5].split(':')[1];
            return yearA < yearB ? 1 : yearB < yearA ? -1 : 0;
        });
    }

    if (currentPostsSort === '') {
        posts?.sort((a, b) => (b.created_at > a.created_at ? 1 : a.created_at > b.created_at ? -1 : 0));
    }

    useEffect(() => {
        if (currentMovieYearFilter) {
            let filtered = posts?.filter(
                (item, index) => +movieYear(item.text) === +currentMovieYearFilter
            );

            setFilteredPosts(filtered);
        }
    }, [filterActive]);

    useEffect(() => {
        if (filteredPosts) setPosts(filteredPosts);
    }, [filteredPosts]);
 */
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
