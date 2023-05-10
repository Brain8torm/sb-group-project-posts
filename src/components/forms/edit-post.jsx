import { Autocomplete, CircularProgress, Switch, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Form } from '../form';
import { useEffect, useState } from 'react';

import styles from './forms.module.css';
import classNames from 'classnames';
import { FormButton } from '../form-button';
import { genres } from '../../utils/config';
import { getLocalData } from '../../utils/localStorage';

export function FormEditPost({ onSubmit }) {

    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const [isMoviePosts, setIsMoviePosts] = useState(true);

    let post = getLocalData('currentPost');

    let textData = post?.text?.split('|');
    let roles = (textData && textData[7].split(': ')[1]);

    let propsPostTitle = {};
    let propsPostText = {};
    let propsPostImage = {};
    let propsMovieYear = {};
    let propsMovieDirector = {};
    let propsMovieCountry = {};
    let propsMovieGenre = {};
    let propsMovieActors = {};
    let propsMovieKP = {};
    let propsMovieIMDb = {};

    //console.log(errors);




    //useEffect(() => {

        propsPostTitle.label = isMoviePosts ? 'Название фильма' : 'Заголовок поста';
        propsPostTitle.required = true;
        if (errors['title']) {
            propsPostTitle.error = true;
            propsPostTitle.label = 'Ошибка'
            propsPostTitle.helperText = "Поле обязательно для заполнения."
        }

        propsPostImage.label = isMoviePosts ? 'Постер фильма' : 'Изображение поста';


        propsPostText.label = isMoviePosts ? 'Описание фильма' : 'Текст поста';
        propsPostText.required = true;
        //propsPostText.value = isMoviePosts ? textData[0] : post.text;
        if (errors['text']) {
            propsPostText.error = true;
            propsPostText.label = 'Ошибка'
            propsPostText.helperText = "Поле обязательно для заполнения."
        }

        propsMovieYear.label = 'Год выпуска';
        //propsMovieYear.value = textData[1].split(': ')[1];

        propsMovieDirector.label = 'Режиссер';
        //propsMovieDirector.value = textData[2].split(': ')[1];

        propsMovieCountry.label = 'Страна';
        //propsMovieCountry.value = textData[3].split(': ')[1];

        propsMovieGenre.label = 'Жанр';
        //propsMovieGenre.value = textData[4].split(': ')[1];

        propsMovieActors.label = 'Актеры';
        //propsMovieActors.value = roles;


        propsMovieKP.label = 'Рейтинг КиноПоиск';
        propsMovieKP.type = 'number';
        //propsMovieKP.value = +textData[5].split(': ')[1];

        propsMovieIMDb.label = 'Рейтинг IMDb';
        propsMovieIMDb.type = 'number';
        //propsMovieIMDb.value = +textData[6].split(': ')[1];

    //}, []);


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
    const [val, setVal] = useState([...post.tags]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(100);

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
                title={isMoviePosts ? 'Изменить фильм' : 'Изменить пост'}
                handleFormSubmit={handleSubmit(onSubmit)}
            >
                <div className={styles.row}>
                    <Controller
                        control={control}
                        name='title'
                        rules={{
                            required: { value: true, message: "Обязательно" }
                        }}
                        defaultValue={post.title}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant='outlined'
                                label='Заголовок поста'
                                {...propsPostTitle}
                                fullWidth
                            />
                        )}

                    />
                </div>
                <div className={styles.row}>
                    <Controller
                        control={control}
                        name='text'
                        rules={{
                            required: { value: true, message: "Обязательно" }
                        }}
                        defaultValue={isMoviePosts ? textData[0] : post.text}
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
                        defaultValue={post.image}
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
                                defaultValue={textData[1].split(': ')[1]}
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
                                defaultValue={textData[2].split(': ')[1]}
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
                                defaultValue={textData[3].split(': ')[1]}
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
                                defaultValue={textData[4].split(': ')[1]}
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
                                defaultValue={+textData[5].split(': ')[1]}

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
                                defaultValue={+textData[6].split(': ')[1]}
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
                                defaultValue={roles}
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
                                        value={val}
                                        onOpen={() => {
                                            setOpen(true);
                                        }}
                                        onClose={() => {
                                            setOpen(false);
                                        }}
                                        onChange={(event, item) => {
                                            console.log('item', item);
                                            console.log('val', val);
                                            console.log('filter', item.filter((option) => post.tags.indexOf(option) === -1));
                                            setVal([
                                                ...item,
                                                //...item.filter((option) => post.tags.indexOf(option) === -1),
                                            ]);
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
