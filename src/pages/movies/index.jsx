import {
    Autocomplete,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { PostsList } from '../../components/posts-list';
import { useContext, useEffect, useState } from 'react';
import { Spinner } from '../../components/spinner';
import { ActionsContext } from '../../contexts/actions-context';
import { Link, useLocation } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { PostsContext } from '../../contexts/posts-context';
import { movieTop } from '../../utils/movie';

export function MoviesPage({ handleSwitchChange }) {
    const [isMyPosts, setIsMyPosts] = useState(true);
    const { setQuickActions } = useContext(ActionsContext);
    const { posts, setPosts, isLoading, searchQuery, setSearchQuery } = useContext(PostsContext);
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    const [searchInputValue, setSearchInputValue] = useState(options[0]);

    function onSwitchChange(event) {
        let checked = event.target.checked ? true : false;
        setIsMyPosts(checked);
        handleSwitchChange(checked ? 'my' : 'other');
        return checked;
    }

    useEffect(() => {
        setQuickActions([
            {
                icon: (
                    <Link
                        className="speed-dial__action"
                        replace
                        to="/add-post"
                        state={{
                            backgroundLocation: location,
                            initialPath: location.pathname,
                        }}
                    >
                        <AddOutlinedIcon />
                    </Link>
                ),
                name: 'Добавить',
            },
        ]);
    }, []);

    const topFilms = movieTop(posts, 10);

    function sleep(delay = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3);

            if (active) {
                setOptions([...topFilms]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <>
            <Container maxWidth="lg">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Все</Typography>
                    <Switch
                        checked={isMyPosts}
                        value={isMyPosts ? 'my' : 'other'}
                        onChange={onSwitchChange}
                        name="my-posts"
                    />
                    <Typography>Мои посты</Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <Autocomplete
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        isOptionEqualToValue={(option, value) => option.title === value.title}
                        getOptionLabel={(option) => option.title}
                        options={options}
                        loading={loading}
                        fullWidth
                        value={searchInputValue}
                        onChange={(event, newValue) => {
                            setSearchInputValue(newValue);
                        }}
                        inputValue={searchQuery}
                        onInputChange={(event, newInputValue) => {
                            setSearchQuery(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id="search-movie"
                                type="text"
                                placeholder="Поиск фильмов"
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <>
                                            {loading ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : null}
                                            {params.InputProps.startAdornment}
                                        </>
                                    ),
                                    endAdornment: (
                                        <>
                                            <IconButton aria-label="Поиск по фильмам">
                                                <SearchOutlinedIcon />
                                            </IconButton>
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />
                </Stack>

                <PostsList type={isMyPosts ? 'my' : 'other'} />
            </Container>
        </>
    );
}
