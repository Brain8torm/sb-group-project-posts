import { Rating, Switch, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Form } from '../form';
import { useContext, useState } from 'react';

import styles from './forms.module.css';
import classNames from 'classnames';
import { FormButton } from '../form-button';
import { useParams } from 'react-router';
import { reviewByID, reviewRating, reviewText } from '../../utils/reviews';
import { PostsContext } from '../../contexts/posts-context';

export function FormEditReview({ onSubmit }) {
    const { reviewID } = useParams();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const { reviews } = useContext(PostsContext);

    const review = reviewByID(reviews, reviewID);
    const rating = reviewRating(review?.text);
    const text = reviewText(review?.text);

    const [commentRating, setCommentRating] = useState(rating);

    let propsReviewText = {};
    let propsReviewRating = {};

    propsReviewText.label = 'Текст отзыва';
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

    return (
        <div className={classNames(styles.wrapper)}>
            <Form title="Редактировать отзыв" handleFormSubmit={handleSubmit(onSubmit)}>
                <div className={styles.row}>
                    <Controller
                        control={control}
                        name="reviewID"
                        render={({ field }) => <TextField {...field} type="hidden" />}
                        defaultValue={review?._id}
                    />
                    <Controller
                        control={control}
                        name="postID"
                        render={({ field }) => <TextField {...field} type="hidden" />}
                        defaultValue={review?.post}
                    />
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
                        defaultValue={text}
                    />
                </div>

                <div className={styles.row}>
                    <Controller
                        name="rating"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Rating
                                {...propsReviewRating}
                                {...field}
                                max={10}

                            />
                        )}
                        defaultValue={rating}
                    />
                </div>

                <div className={styles.row}>
                    <FormButton type="submit">Отправить</FormButton>
                </div>
            </Form>
        </div>
    );
}
