import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormButton } from '../form-button';
import styles from './forms.module.css';
import classNames from 'classnames';
import { Form } from '../form';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';

export function FormChangeAvatar({ onSubmit }) {
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const { currentUser } = useContext(UserContext);

    let propsAvatarURL = {};

    propsAvatarURL.label = 'Аватар';
    propsAvatarURL.required = true;
    if (errors['avatar']) {
        propsAvatarURL.error = true;
        propsAvatarURL.label = 'Ошибка'
        propsAvatarURL.helperText = "Поле обязательно для заполнения."
    }

    return (
        <div className={classNames(styles.wrapper)}>


            <Form
                title={'Изменить аватар'}
                handleFormSubmit={handleSubmit(onSubmit)}
            >

                <div className={styles.row}>
                    <Controller
                        control={control}
                        name='avatar'
                        rules={{
                            required: { value: true, message: "Обязательно" }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant='outlined'
                                {...propsAvatarURL}
                                fullWidth
                            />
                        )}
                        defaultValue={currentUser ? currentUser?.avatar : ''}
                    />
                </div>

                <div className={styles.row}>
                    <FormButton type='submit'>Отправить</FormButton>
                </div>
            </Form>


        </div>
    );
}
