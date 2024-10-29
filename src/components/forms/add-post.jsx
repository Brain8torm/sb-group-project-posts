import { Autocomplete, CircularProgress, Switch, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Form } from '../form';
import { useEffect, useState } from 'react';

import styles from './forms.module.css';
import classNames from 'classnames';
import { FormButton } from '../form-button';
import { genres } from '../../utils/config';

export function FormAddPost({ onSubmit }) {

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onBlur" });

    const [isMoviePosts, setIsMoviePosts] = useState(true);

    let propsPostTitle = {};
    let propsPostText = {};
    let propsPostImage = {
        label: isMoviePosts ? 'Постер фильма' : 'Изображение поста',
    };
    propsPostTitle.label = isMoviePosts ? 'Название фильма' : 'Заголовок поста';
    propsPostTitle.required = true;
    if (errors['title']) {
        propsPostTitle.error = true;
        propsPostTitle.label = 'Ошибка'
        propsPostTitle.helperText = "Поле обязательно для заполнения."
    }
    propsPostText.label = isMoviePosts ? 'Описание фильма' : 'Текст поста';
    propsPostText.required = true;
    if (errors['text']) {
        propsPostText.error = true;
        propsPostText.label = 'Ошибка'
        propsPostText.helperText = "Поле обязательно для заполнения."
    }

    let propsMovieYear = {
        label: 'Год выпуска',
    }

    let propsMovieDirector = {
        label: 'Режиссер',
    }

    let propsMovieCountry = {
        label: 'Страна',
    }

    let propsMovieGenre = {
        label: 'Жанр',
    }

    let propsMovieActors = {
        label: 'Актеры',
    }

    let propsMovieKP = {
        label: 'Рейтинг КиноПоиск',
        type: 'number',
    }

    let propsMovieIMDb = {
        label: 'Рейтинг IMDb',
        type: 'number',
    }

    function onSwitchChange(event) {
        let checked = event.target.checked ? true : false;
        setIsMoviePosts(checked);
        return checked;
    }

    function sleep(delay = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...genres]);
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

        <div className={classNames(styles.wrapper)}>

            <div className={styles.switcher}>
                <div className={styles.switcher_label}>Пост</div>
                <Switch
                    checked={isMoviePosts}
                    value={isMoviePosts ? 'movie' : 'post'}
                    onChange={onSwitchChange}
                    name="post-type"
                />
                <div className={styles.switcher_label}>Фильм</div>
            </div>
            <Form
                title={isMoviePosts ? 'Добавить фильм' : 'Добавить пост'}
                handleFormSubmit={handleSubmit(onSubmit)}
            >
                <div className={styles.row}>
                    <Controller
                        control={control}
                        name='title'
                        rules={{
                            required: { value: true, message: "Обязательно" }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant='outlined'
                                label='Заголовок поста'
                                {...propsPostTitle}
                                fullWidth
                            />
                        )}
                        defaultValue=''
                    />
                </div>
                <div className={styles.row}>
                    <Controller
                        control={control}
                        name='text'
                        rules={{
                            required: { value: true, message: "Обязательно" }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant='outlined'
                                {...propsPostText}
                                fullWidth
                                multiline
                                rows={4}
                            />
                        )}
                        defaultValue=''
                    />
                </div>
                <div className={styles.row}>
                    <Controller
                        control={control}
                        name='image'
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant='outlined'
                                label='Изображение поста'
                                {...propsPostImage}
                                className='control'
                                fullWidth
                            />
                        )}
                        defaultValue=''
                    />
                </div>
                {isMoviePosts &&
                    <div className={styles.movie_fields}>
                        <div className={styles.row}>
                            <Controller
                                control={control}
                                name='movie-year'
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant='outlined'
                                        {...propsMovieYear}
                                        className='control'
                                        fullWidth
                                    />
                                )}
                                defaultValue=''
                            />
                        </div>
                        <div className={styles.row}>
                            <Controller
                                control={control}
                                name='movie-director'
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant='outlined'
                                        {...propsMovieDirector}
                                        className='control'
                                        fullWidth
                                    />
                                )}
                                defaultValue=''
                            />
                        </div>
                        <div className={styles.row}>
                            <Controller
                                control={control}
                                name='movie-country'
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant='outlined'
                                        {...propsMovieCountry}
                                        className='control'
                                        fullWidth
                                    />
                                )}
                                defaultValue=''
                            />
                        </div>
                        <div className={styles.row}>
                            <Controller
                                control={control}
                                name='movie-genre'
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant='outlined'
                                        {...propsMovieGenre}
                                        className='control'
                                        fullWidth
                                    />
                                )}
                                defaultValue=''
                            />
                        </div>
                        <div className={styles.row}>
                            <Controller
                                control={control}
                                name='movie-kp'
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant='outlined'
                                        {...propsMovieKP}
                                        className='control'
                                        fullWidth
                                        inputProps={{
                                            step: 0.01,
                                            min: 0.00, max: 10.00
                                        }}
                                    />
                                )}
                                defaultValue='5.00'

                            />
                        </div>
                        <div className={styles.row}>
                            <Controller
                                control={control}
                                name='movie-imdb'
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant='outlined'
                                        {...propsMovieIMDb}
                                        className='control'
                                        fullWidth
                                        inputProps={{
                                            step: 0.01,
                                            min: 0.00, max: 10.00
                                        }}
                                    />
                                )}
                                defaultValue='5.00'
                            />
                        </div>
                        <div className={styles.row}>
                            <Controller
                                control={control}
                                name='movie-actors'
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant='outlined'
                                        {...propsMovieActors}
                                        className='control'
                                        fullWidth
                                    />
                                )}
                                defaultValue=''
                            />
                        </div>
                        <div className={styles.row}>
                            <Controller
                                control={control}
                                name='tags'
                                render={({ field: { onChange, value } }) => (
                                    <Autocomplete
                                        id="tags"
                                        multiple
                                        open={open}
                                        onOpen={() => {
                                            setOpen(true);
                                        }}
                                        onClose={() => {
                                            setOpen(false);
                                        }}
                                        onChange={(event, item) => {
                                            onChange(item);
                                        }}
                                        getOptionLabel={(option) => option}
                                        options={options}
                                        loading={loading}

                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name='tags'
                                                label='Теги'
                                                InputProps={{
                                                    ...params.InputProps,
                                                    endAdornment: (
                                                        <>
                                                            {loading ? <CircularProgress color='inherit' size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </>
                                                    ),
                                                }}

                                            />
                                        )}
                                    />
                                )}
                            />
                        </div>

                    </div>
                }
                <div className={styles.row}>
                    <FormButton type='submit'>Отправить</FormButton>
                </div>
            </Form>


        </div>

    );
}
