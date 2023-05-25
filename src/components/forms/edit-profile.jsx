import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormButton } from '../form-button';
import styles from './forms.module.css';
import classNames from 'classnames';
import { Form } from '../form';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';


export function FormEditProfile({ onSubmit }) {
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const { currentUser } = useContext(UserContext);

    let propsName = {};
    let propsAbout = {};


    propsName.label = 'Имя';
    propsName.required = true;
    if (errors['name']) {
        propsName.error = true;
        propsName.label = 'Ошибка'
        propsName.helperText = "Поле обязательно для заполнения."
    }
    propsAbout.label = 'Обо мне';

    return (
        <div className={classNames(styles.wrapper)}>


            <Form
                title={'Изменить профиль'}
                handleFormSubmit={handleSubmit(onSubmit)}
            >

                <div className={styles.row}>
                    <Controller
                        control={control}
                        name='name'
                        rules={{
                            required: { value: true, message: "Обязательно" }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant='outlined'
                                {...propsName}
                                fullWidth
                            />
                        )}
                        defaultValue={currentUser ? currentUser?.name : ''}
                    />
                </div>

                <div className={styles.row}>
                    <Controller
                        control={control}
                        name='about'
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant='outlined'
                                {...propsAbout}
                                fullWidth
                                multiline
                                rows={3}
                            />
                        )}
                        defaultValue={currentUser ? currentUser?.about : ''}
                    />
                </div>

                <div className={styles.row}>
                    <FormButton type='submit'>Отправить</FormButton>
                </div>
            </Form>


        </div>
    );
}
