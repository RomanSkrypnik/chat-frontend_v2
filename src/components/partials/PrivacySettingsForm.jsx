import React from 'react';
import {Controller, useForm} from "react-hook-form";
import TextInput from "../inputs/TextInput";

const PrivacySettingsForm = () => {

    const {handleSubmit, control} = useForm();

    const onSubmit = () => {
        console.log('on submit');
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    render={({field: {onChange, value}}) => (
                        <TextInput onChange={onChange} value={value} placeholder="email"/>
                    )}
                />
                <Controller
                    name="name"
                    render={({field: {onChange, value}}) => (
                        <TextInput onChange={onChange} value={value} placeholder="email"/>
                    )}
                />
                <Controller
                    name="password"
                    render={({field: {onChange, value}}) => (
                        <TextInput onChange={onChange} value={value} placeholder="email"/>
                    )}
                />
                <Controller
                    name="passwordConfirmation"
                    render={({field: {onChange, value}}) => (
                        <TextInput onChange={onChange} value={value} placeholder="email"/>
                    )}
                />
            </form>
        </>
    );
};

export default PrivacySettingsForm;
