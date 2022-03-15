import React from 'react';
import {Controller, useForm} from "react-hook-form";
import TextInput from "../inputs/TextInput";
import RegularButton from "../UI/buttons/RegularButton";
import AuthService from "../../services/AuthService";
import {useDispatch, useSelector} from "react-redux";
import {changePersonalInfo} from "../../store/slices/auth";
import {yupResolver} from "@hookform/resolvers/yup";
import validation from "../../validation";

const PrivacySettingsForm = () => {
    const {handleSubmit, control, formState} = useForm({
        mode: 'onChange',
        resolver: yupResolver(validation.privacy)
    });

    const {errors, isDirty} = formState;

    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);

    const onSubmit = async data => {
        const res = await AuthService.checkPasswordIdentity(data.password);
        res.data.success && dispatch(changePersonalInfo(data));
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column w-100">
                <Controller
                    control={control}
                    name="email"
                    defaultValue={user.email}
                    render={({field: {onChange, value}}) => (
                        <TextInput onChange={onChange}
                                   value={value}
                                   placeholder="Enter email"
                                   label="Email"
                                   errorText={errors.email?.message}
                                   classname={errors.email && 'error'}
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
                                   errorText={errors.name?.message}
                                   classname={errors.name && 'error'}
                        />
                    )}
                />
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
                                   classname={errors.newPassword && 'error'}
                                   errorText={errors.newPassword?.message}
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
                                   classname={errors.passwordConfirm && 'error'}
                                   errorText={errors.passwordConfirm?.message}
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
                                   classname={errors.password && 'error'}
                                   errorText={errors.password?.message}
                        />
                    )}
                />
                <div className="d-flex justify-content-center mt-2">
                    <RegularButton disabled={!formState.isValid} type="submit">Save changes</RegularButton>
                </div>
            </form>
        </>
    );
};

export default PrivacySettingsForm;
