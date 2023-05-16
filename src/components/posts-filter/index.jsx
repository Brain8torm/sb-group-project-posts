import { useContext, useEffect, useState } from 'react';
import { Checkbox, FormControl, ListItemText, MenuItem, Select } from '@mui/material';
import { PostsContext } from '../../contexts/posts-context';
import { movieYear, movieYears, movieAllGenres, movieGenres } from '../../utils/movie';
import styles from './posts-filter.module.css';

export function PostsFilter() {
    const { posts, currentSort, currentFilter, setCurrentSort, setCurrentFilter, onSortedData } =
        useContext(PostsContext);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const [currentMovieYearFilter, setCurrentMovieYearFilter] = useState([]);
    const [currentMovieGenreFilter, setCurrentMovieGenreFilter] = useState([]);

    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [filterActive, setFilterActive] = useState(false);

    const sortData = ['По названию', 'По году выпуска', 'По рейтингу', 'По лайкам', 'По отзывам'];

    const handlePostsSortChange = (e) => {
        setCurrentSort(e.target.value);
        onSortedData(e.target.value);
    };

    const handleMovieYearFilterChange = (e) => {
        const selected = e.target;
        let filters = currentFilter;

        const {
            target: { value },
        } = e;
        setCurrentMovieYearFilter(typeof value === 'string' ? value.split(',') : value);


        filters.push({ [selected.name]: selected.value });

        setCurrentFilter(filters);
        console.log('curent', currentFilter);
    };

    const handleMovieGenreFilterChange = (e) => {
        const selected = e.target;
        let filters = currentFilter;

        const {
            target: { value },
        } = e;
        setCurrentMovieGenreFilter(typeof value === 'string' ? value.split(',') : value);

        filters.push({ [selected.name]: selected.value });

        setCurrentFilter(filters);
        console.log('curent', currentFilter);
    };

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

    /*useEffect(() => {
        if (filteredPosts) setPosts(filteredPosts);
    }, [filteredPosts]);*/

    return (
        <div className={styles.wrapper}>
            <div className={styles.filter}>
                <FormControl size="small">
                    <Select
                        labelId="posts-filter-year-label"
                        id="posts-filter-year-label"
                        name="filter-year"
                        displayEmpty
                        value={currentMovieYearFilter}
                        label="Год выпуска"
                        MenuProps={MenuProps}
                        onChange={handleMovieYearFilterChange}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Год выпуска</em>;
                            }
                            return selected.join(', ');
                        }}
                    >
                        <MenuItem value="">
                            <em>По умолчанию</em>
                        </MenuItem>
                        {movieYears(posts)?.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                <Checkbox checked={currentMovieGenreFilter.indexOf(item) > -1} />
                                <ListItemText primary={item} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small">
                    <Select
                        labelId="posts-filter-genre-label"
                        id="posts-filter-genre-label"
                        name="filter-genre"
                        displayEmpty
                        multiple
                        value={currentMovieGenreFilter}
                        label="Жанр"
                        MenuProps={MenuProps}
                        onChange={handleMovieGenreFilterChange}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Жанр</em>;
                            }
                            return selected.join(', ');
                        }}
                    >
                        <MenuItem value="">
                            <em>По умолчанию</em>
                        </MenuItem>
                        {movieAllGenres(posts)?.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                <Checkbox checked={currentMovieGenreFilter.indexOf(item) > -1} />
                                <ListItemText primary={item} />
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
                        value={currentSort}
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
