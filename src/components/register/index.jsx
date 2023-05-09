import { Controller, useForm } from 'react-hook-form';
import { Form } from '../form';
import { FormButton } from '../form-button';
import { Stack, TextField } from '@mui/material';
import styles from './register.module.css';

export function Register({ onSubmit, onNavigateLogin }) {
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })

    let propsEmail = {
        name: 'email',
        required: true,
        label: 'E-mail',
    };
    if (errors.email) {
        propsEmail.error = true;
        propsEmail.label = 'Ошибка'
        propsEmail.helperText = errors?.email.message
    }

    let propsPassword = {
        name: 'password',
        required: true,
        label: 'Пароль',
        type: 'password'
    };
    if (errors.password) {
        propsPassword.error = true;
        propsPassword.label = 'Ошибка';
        propsPassword.helperText = errors?.password.message
    }

    let propsGroup = {
        name: 'group',
        required: true,
        label: 'Группа',
    };
    if (errors.group) {
        propsGroup.error = true;
        propsGroup.label = 'Ошибка';
        propsGroup.helperText = errors?.group.message
    }

    return (
        <Form handleFormSubmit={handleSubmit(onSubmit)}>
            <div className={styles.row}>
                <Controller
                    control={control}
                    name={propsEmail.name}
                    rules={{
                        required: {
                            value: true,
                            message: 'Поле обязательно для заполнения'
                        },
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'E-mail не соотвествует формату электронной почты'
                        }
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            variant='outlined'
                            {...propsEmail}
                            fullWidth
                        />
                    )}
                    defaultValue=''
                />
            </div>
            <div className={styles.row}>
                <Controller
                    control={control}
                    name={propsPassword.name}
                    rules={{
                        required: {
                            value: true,
                            message: 'Поле обязательно для заполнения'
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message: "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру."
                        }
                    }}
                    defaultValue=''
                    {...propsPassword}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            {...propsPassword}
                            variant='outlined'
                            fullWidth
                        />
                    )}


                />
            </div>
            <div className={styles.row}>
                <Controller
                    control={control}
                    name={propsGroup.name}
                    rules={{
                        required: {
                            value: true,
                            message: 'Поле обязательно для заполнения'
                        },
                    }}
                    defaultValue=''
                    {...propsGroup}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            {...propsGroup}
                            variant='outlined'
                            fullWidth
                        />
                    )}
                />
            </div>

            <Stack direction='row' spacing={2}>
                <FormButton type='submit'>Зарегистрироваться</FormButton>
                <FormButton variant='outlined' color='secondary' action={onNavigateLogin}>Войти</FormButton>
            </Stack>
        </Form>
    );
}
