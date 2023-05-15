import { useContext, useEffect, useState } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { PostsContext } from '../../contexts/posts-context';
import { movieYear, movieYears, movieAllGenres, movieGenres } from '../../utils/movie';
import styles from './posts-filter.module.css';

export function PostsFilter() {
    const { posts, setPosts } = useContext(PostsContext);

    const [currentPostsSort, setCurrentPostsSort] = useState('');
    const [currentMovieYearFilter, setCurrentMovieYearFilter] = useState('');
    const [currentMovieGenreFilter, setCurrentMovieGenreFilter] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [filterActive, setFilterActive] = useState(false);

    const sortData = ['По названию', 'По году выпуска', 'По рейтингу', 'По лайкам', 'По отзывам'];

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

    const handleMovieGenreFilterChange = (e) => {
        if (e.target.value) {
            setFilterActive(true);
            setCurrentMovieGenreFilter(e.target.value);
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
        posts?.sort((a, b) =>
            b.created_at > a.created_at ? 1 : a.created_at > b.created_at ? -1 : 0
        );
    }

    useEffect(() => {
        if (currentMovieYearFilter) {
            let filtered = posts?.filter(
                (item, index) => +movieYear(item.text) === +currentMovieYearFilter
            );

            setFilteredPosts(filtered);
        }

        if (currentMovieGenreFilter) {
            let filtered = posts?.filter((item, index) =>
                movieGenres(item.text).includes(currentMovieGenreFilter)
            );

            setFilteredPosts(filtered);
        }
    }, [filterActive]);

    useEffect(() => {
        if (filteredPosts) setPosts(filteredPosts);
    }, [filteredPosts]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.filter}>
                <FormControl size="small">
                    <Select
                        labelId="posts-filter-year-label"
                        id="posts-filter-year-label"
                        displayEmpty
                        value={currentMovieYearFilter}
                        label="Год выпуска"
                        onChange={handleMovieYearFilterChange}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Год выпуска</em>;
                            }
                            return selected;
                        }}
                    >
                        <MenuItem value="">
                            <em>По умолчанию</em>
                        </MenuItem>
                        {movieYears(posts)?.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small">
                    <Select
                        labelId="posts-filter-genre-label"
                        id="posts-filter-genre-label"
                        displayEmpty
                        value={currentMovieGenreFilter}
                        label="Жанр"
                        onChange={handleMovieGenreFilterChange}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Жанр</em>;
                            }
                            return selected;
                        }}
                    >
                        <MenuItem value="">
                            <em>По умолчанию</em>
                        </MenuItem>
                        {movieAllGenres(posts)?.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className={styles.sort}>
                <FormControl size="small">
                    <Select
                        labelId="posts-sort-label"
                        id="posts-sort"
                        displayEmpty
                        value={currentPostsSort}
                        label="Сортировать"
                        onChange={handlePostsSortChange}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Сортировка</em>;
                            }
                            return selected;
                        }}
                    >
                        <MenuItem value="">
                            <em>По умолчанию</em>
                        </MenuItem>
                        {sortData.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}
