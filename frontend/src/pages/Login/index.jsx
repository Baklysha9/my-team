import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, selectIsAuth} from "../../redux/slices/auth";
import {Navigate, useNavigate} from "react-router-dom";


export const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch();
    const {register, handleSubmit,setError,formState: {errors, isValid}} = useForm({
        defaultValues: {
            email:'',
            password: ''
        },
        mode: "onChange"
    })

    const onSubmit = (values) => {
        dispatch(fetchAuth(values))
    }

    if (isAuth) {
        return <Navigate to="/" />
    }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
        <form onSubmit={handleSubmit(onSubmit)}><TextField
            {...register(
                'email',
                {required:'Укажите почту', maxLength:70, minLength:3}
            )}
            className={styles.field}
            label="E-Mail"
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            fullWidth
        />
            <TextField
                {...register(
                'password',
                {required:'Укажите пароль', maxLength:30, minLength:3}
            )}
                className={styles.field}
                label="Пароль"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                fullWidth />
            <Button type="submit" size="large" variant="contained" fullWidth>
                Войти
            </Button>
        </form>
    </Paper>
  );
};
