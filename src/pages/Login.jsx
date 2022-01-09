import React, {useEffect, useState} from 'react';
import withUnauthorizedLayout from "../layouts/Unauthorized";
import DialForm from "../components/partials/DialForm";
import { login } from "../store/slices/auth";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import RegularButton from "../components/UI/buttons/RegularButton";

const Login = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);

    useEffect(() => {
        console.log('rerender');
    }, [value]);

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
        }
    };

    return (
        <section className="login">
            <DialForm {...dialData}/>
        </section>
    );
};

export default withUnauthorizedLayout(Login);
