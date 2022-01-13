import React, {useEffect, useState} from 'react';
import withUnauthorizedLayout from "../layouts/Unauthorized";
import DialForm from "../components/partials/DialForm";
import { login } from "../store/slices/auth";
import {useDispatch} from "react-redux";

const Login = () => {
    const dispatch = useDispatch();

    const dialData = {
        title: 'Login',
        subtitle: 'To sign in, please write down your email and password',
        fields: [
            {placeholder: 'email', name: 'email', type: 'text'},
            {placeholder: 'password', name: 'password', type: 'text'}
        ],
        buttons: [
            {
            text: 'Sign in',
            type: 'submit',
        }
        ],
        onSubmit: (formData) => {
            dispatch(login(formData));
        },
        notice: `<div class='regular-text d-flex flex-column align-items-center'>
                    Don't you have an account? Sign up here!
                    <a href="/register">Click here to create new account</Link>
                </div>`,
    };

    return (
        <section className="login">
            <DialForm {...dialData} />
        </section>
    );
};

export default withUnauthorizedLayout(Login);
