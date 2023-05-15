import { Rating, Switch, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Form } from '../form';
import { useState } from 'react';

import styles from './forms.module.css';
import classNames from 'classnames';
import { FormButton } from '../form-button';

export function FormAddReview({ onSubmit }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const [isMoviePosts, setIsMoviePosts] = useState(true);
    const [commentRating, setCommentRating] = useState(5);

    let propsReviewText = {};
    let propsReviewRating = {};

    propsReviewText.label = isMoviePosts ? 'Текст отзыва' : 'Текст комментария';
    propsReviewText.required = true;
    if (errors['text']) {
        propsReviewText.error = true;
        propsReviewText.label = 'Ошибка';
        propsReviewText.helperText = 'Поле обязательно для заполнения.';
    }

    propsReviewRating.label = 'Оцените фильм';
    propsReviewRating.required = true;
    if (errors['rating']) {
        propsReviewRating.error = true;
        propsReviewRating.label = 'Ошибка';
        propsReviewRating.helperText = 'Поле обязательно для заполнения.';
    }


    function onSwitchChange(event) {
        let checked = event.target.checked ? true : false;
        setIsMoviePosts(checked);
        return checked;
    }

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
                title={isMoviePosts ? 'Добавить отзыв' : 'Добавить комментарий'}
                handleFormSubmit={handleSubmit(onSubmit)}
            >
                <div className={styles.row}>
                    <Controller
                        control={control}
                        name="text"
                        rules={{
                            required: { value: true, message: 'Обязательно' },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                {...propsReviewText}
                                fullWidth
                                multiline
                                rows={4}
                            />
                        )}
                        defaultValue=""
                    />
                </div>
                {isMoviePosts &&
                    <div className={styles.row}>
                        <Controller
                            name="rating"
                            control={control}
                            defaultValue={6}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Rating
                                    {...propsReviewRating}
                                    value={commentRating}
                                    max={10}
                                    onChange={(event, newValue) => {
                                        setCommentRating(newValue);
                                    }}
                                />
                            )}
                        />
                    </div>
                }

                <div className={styles.row}>
                    <FormButton type="submit">Отправить</FormButton>
                </div>
            </Form>
        </div>
    );
}
