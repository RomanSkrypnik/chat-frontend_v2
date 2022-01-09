import React from 'react';
import withUnauthorizedLayout from "../layouts/Unauthorized";
import DialForm from "../components/partials/DialForm";

const Login = () => {

    const dialData = {
        title: 'Login',
        subtitle: 'To sign in, please write down your email and password',
        fields: [
            {placeholder: 'email', name: 'email'},
            {placeholder: 'password', name: 'password'}
        ],
        buttons: [{
            text: 'Sign in',
            type: 'submit',
        }],
        onSubmit: (e) => {
            e.preventDefault();
        }
    };

    return (
        <section className="login">
            <DialForm
                title={dialData.title}
                subtitle={dialData.subtitle}
                fields={dialData.fields}
                button={dialData.button}
                onSubmit={dialData.onSubmit}
            />
        </section>
    );
};

export default withUnauthorizedLayout(Login);
