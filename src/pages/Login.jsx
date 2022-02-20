import React from 'react';
import withUnauthorizedLayout from "../layouts/Unauthorized";
import StepForm from "../components/partials/StepForm";
import loginPlate from '../plates/login';
import {login} from '../store/slices/auth';
import {useDispatch} from "react-redux";

const Login = () => {
    const dispatch = useDispatch();

    const [step] = loginPlate;

    const onSubmit = (data) => {
        dispatch(login(data));
    };

    return (
        <section className="register">
            <StepForm
                step={step}
                onSubmit={onSubmit}
            />
        </section>
    );
};

export default withUnauthorizedLayout(Login);
