import React, {useState} from 'react';
import {Stepper} from 'react-form-stepper';
import DialForm from "../components/partials/DialForm";
import withUnauthorizedLayout from "../layouts/Unauthorized";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const stepFirst = {
        title: 'Create your account',
        subtitle: 'Create an account to enjoy all the services!',
        fields: [
            {type: 'text', placeholder: 'email', name: 'email'},
            {type: 'text', placeholder: 'username', name: 'username'},
            {type: 'text', placeholder: 'password', name: 'password'},
        ],
        buttons: [
            {
                text: 'Next',
                type: 'submit',
            },
        ],
        onSubmit: (data) => {
            setFormData({...formData, data});
            setActiveStep(activeStep + 1)
        }
    };

    const stepSecond = {
        title: 'Would you like to upload your avatar?',
        fields: [
            {type: 'file', name: 'picture', placeholder: 'Upload picture', dark: true},
        ],
        buttons: [
            {
                text: 'Back',
                type: 'button',
                onClick: (e) => {
                    e.preventDefault();
                    setActiveStep(activeStep - 1);
                }
            },
            {
                text: 'Next',
                type: 'submit',
            }
        ],
        onSubmit: (data) => {
            setFormData({...formData, data});
            setActiveStep(activeStep + 1)
        }
    };

    const stepThird = {
        title: 'Activate your account',
        subtitle: 'After this step you will be sent an activation link to your email. Please, check it and activate your account straightaway',
        buttons: [
            {
                text: 'Back',
                type: 'button',
                onClick: (e) => {
                    e.preventDefault();
                    setActiveStep(activeStep - 1);
                }
            },
            {
                text: 'Sign up',
                type: 'submit',
            },
        ],
        onSubmit: () => {
            const data = formData.data;
            AuthService.register(data)
                .then(() => navigate('/login'))
                .catch(err => console.log(err));
        }
    };

    const stepLabels = [
        {label: 'General information'},
        {label: 'Upload your account picture'},
        {label: 'Activate your account and finish'},
    ];

    const stepClassName = 'stepper';

    const getStep = () => {
        switch (activeStep) {
            case 0:
                return <DialForm {...stepFirst} />;
            case 1:
                return <DialForm {...stepSecond} />;
            case 2:
                return <DialForm {...stepThird} />;
        }
    };

    return (
        <section className="register">
            <Stepper steps={stepLabels} activeStep={activeStep} stepClassName={stepClassName}/>
            {getStep()}
        </section>
    );
};

export default withUnauthorizedLayout(Register);
