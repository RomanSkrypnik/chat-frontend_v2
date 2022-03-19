import React, {useContext} from 'react';
import {Controller, useForm} from "react-hook-form";
import TextInput from "../inputs/TextInput";
import RegularButton from "../UI/buttons/RegularButton";
import AuthService from "../../services/AuthService";
import {useDispatch, useSelector} from "react-redux";
import {changePersonalInfo} from "../../store/slices/auth";
import {yupResolver} from "@hookform/resolvers/yup";
import validation from "../../validation";
import {SnackBarContext} from "../providers/SnackbarProvider";

const PrivacySettingsForm = () => {
    const {handleSubmit, control, formState, reset} = useForm({
        mode: 'onChange',
        resolver: yupResolver(validation.privacy)
    });

    const snackbar = useContext(SnackBarContext);

    const {errors, isDirty} = formState;

    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);

    const onSubmit = async data => {
        const res = await AuthService.checkPasswordIdentity(data.password);

        if (res.data.success) {
            const payload = {
                email: data.email,
                name: data.name,
                username: data.username,
                newPassword: data.newPassword
            };

            dispatch(changePersonalInfo(payload));

            const snackbarParams = {
                title: 'Success',
                message: 'Your personal info is changed!',
                color: 'green',
                timeout: 1000
            };

            snackbar(snackbarParams);

            reset(payload);
        } else {
            const snackbarParams = {
                title: 'Invalid data',
                message: 'You have entered a wrong password!',
                color: 'red',
                timeout: 1000
            };
            snackbar(snackbarParams);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column w-100">
                <div className="d-flex justify-content-between">
                    <div className="col-6 px-2">
                        <Controller
                            control={control}
                            name="email"
                            defaultValue={user.email}
                            render={({field: {onChange, value}}) => (
                                <TextInput onChange={onChange}
                                           value={value}
                                           placeholder="Enter email"
                                           label="Email"
                                           errorText={isDirty && errors.email?.message}
                                           classname={isDirty && errors.email && 'error'}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="name"
                            defaultValue={user.name}
                            render={({field: {onChange, value}}) => (
                                <TextInput onChange={onChange}
                                           value={value}
                                           placeholder="Enter name"
                                           label="Name"
                                           errorText={isDirty && errors.name?.message}
                                           classname={isDirty && errors.name && 'error'}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="username"
                            defaultValue={user.username}
                            render={({field: {onChange, value}}) => (
                                <TextInput onChange={onChange}
                                           value={value}
                                           placeholder="Enter username"
                                           label="Username"
                                           errorText={isDirty && errors.name?.message}
                                           classname={isDirty && errors.name && 'error'}
                                />
                            )}
                        />
                    </div>
                    <div className="col-6 px-2">
                        <Controller
                            control={control}
                            name="newPassword"
                            defaultValue=''
                            render={({field: {onChange, value}}) => (
                                <TextInput onChange={onChange}
                                           value={value}
                                           placeholder="Enter new password"
                                           label="New password"
                                           type="password"
                                           classname={isDirty && errors.newPassword && 'error'}
                                           errorText={isDirty && errors.newPassword?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="passwordConfirm"
                            defaultValue=''
                            render={({field: {onChange, value}}) => (
                                <TextInput onChange={onChange}
                                           value={value}
                                           placeholder="Enter new password again"
                                           label="Confirm your password"
                                           type="password"
                                           classname={isDirty && errors.passwordConfirm && 'error'}
                                           errorText={isDirty && errors.passwordConfirm?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            defaultValue=''
                            render={({field: {onChange, value}}) => (
                                <TextInput onChange={onChange}
                                           value={value}
                                           placeholder="Enter current password"
                                           label="Current password"
                                           type="password"
                                           classname={isDirty && errors.password && 'error'}
                                           errorText={isDirty && errors.password?.message}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <RegularButton disabled={!formState.isValid} type="submit">Save changes</RegularButton>
                </div>
            </form>
        </>
    );
};

export default PrivacySettingsForm;
