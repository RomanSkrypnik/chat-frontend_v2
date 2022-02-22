import React from 'react';
import {Controller, useForm} from "react-hook-form";
import TextInput from "../inputs/TextInput";
import RegularButton from "../UI/buttons/RegularButton";
import AuthService from "../../services/AuthService";
import FormHelper from "../../helpers/formHelper";

const PrivacySettingsForm = () => {

    const {handleSubmit, control} = useForm();

    const onSubmit = async (data) => {
        const {newPassword, passwordConfirm, password} = data;

        const passwordMatches = await AuthService.checkPasswordIdentity(password);
        const newPasswordMatches = FormHelper.compareValues(newPassword, passwordConfirm);

        if (passwordMatches.data.success) {
            if (newPasswordMatches) {
                const newData = {email: data.email, name: data.name, password: data.password};
                await AuthService.changePersonalInfo(newData);
            } else {
                console.log("New passwords don't match");
            }
        } else {
            console.log('Invalid password');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column w-100">
                <Controller
                    control={control}
                    name="email"
                    defaultValue=''
                    render={({field: {onChange, value}}) => (
                        <TextInput onChange={onChange} value={value} placeholder="Enter email" label="Email"/>
                    )}
                />
                <Controller
                    control={control}
                    name="name"
                    defaultValue=''
                    render={({field: {onChange, value}}) => (
                        <TextInput onChange={onChange} value={value} placeholder="Enter name" label="Name"/>
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    defaultValue=''
                    render={({field: {onChange}}) => (
                        <TextInput onChange={onChange} placeholder="Enter current password" label="Current password"/>
                    )}
                />
                <Controller
                    control={control}
                    name="newPassword"
                    defaultValue=''
                    render={({field: {onChange}}) => (
                        <TextInput onChange={onChange} placeholder="Enter new password"
                                   label="New password"/>
                    )}
                />
                <Controller
                    control={control}
                    name="passwordConfirm"
                    defaultValue=''
                    render={({field: {onChange}}) => (
                        <TextInput onChange={onChange} placeholder="Enter new password again" label="Confirm your password"/>
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
