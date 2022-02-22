import React from 'react';
import {Controller, useForm} from "react-hook-form";
import TextInput from "../inputs/TextInput";
import RegularButton from "../UI/buttons/RegularButton";
import AuthService from "../../services/AuthService";
import FormHelper from "../../helpers/formHelper";

const PrivacySettingsForm = () => {

    const {handleSubmit, control} = useForm();

    const onSubmit = async ({email, name, oldPassword, newPassword, passwordConfirm}) => {
        const passwordMatches = AuthService.checkPasswordIdentity();
        const newPasswordMatches = FormHelper.compareValues(newPassword, passwordConfirm);

        if (passwordMatches && newPasswordMatches) {
            console.log('on submit');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column w-100">
                <Controller
                    control={control}
                    name="email"
                    render={({field: {onChange, value}}) => (
                        <TextInput onChange={onChange} value={value} placeholder="Enter email" label="Email"/>
                    )}
                />
                <Controller
                    control={control}
                    name="name"
                    render={({field: {onChange, value}}) => (
                        <TextInput onChange={onChange} value={value} placeholder="Enter name" label="Name"/>
                    )}
                />
                <Controller
                    control={control}
                    name="oldPassword"
                    render={({field: {onChange, value}}) => (
                        <TextInput onChange={onChange} value={value} placeholder="Enter old password"
                                   label="OldPassword"/>
                    )}
                />
                <Controller
                    control={control}
                    name="newPassword"
                    render={({field: {onChange, value}}) => (
                        <TextInput onChange={onChange} value={value} placeholder="Enter new password" label="New password"/>
                    )}
                />
                <Controller
                    control={control}
                    name="passwordConfirm"
                    render={({field: {onChange, value}}) => (
                        <TextInput onChange={onChange} value={value} placeholder="Enter new password again" label="Confirm your password"/>
                    )}
                />
                <div className="d-flex justify-content-center mt-2">
                    <RegularButton type="submit">Save changes</RegularButton>
                </div>
            </form>
        </>
    );
};

export default PrivacySettingsForm;
