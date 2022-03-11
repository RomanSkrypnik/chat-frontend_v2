import React, {useEffect, useState} from 'react';
import withUnauthorizedLayout from "../layouts/Unauthorized";
import StepForm from "../components/partials/StepForm";
import {useNavigate} from "react-router-dom";
import AuthService from "../services/AuthService";
import registerPlate from '../plates/register';
import validation from '../validation';

const Register = () => {
    const navigate = useNavigate();

    const [collectedData, setCollectedData] = useState({});
    const [step, setStep] = useState(null);
    const [stepNum, setStepNum] = useState(0);

    useEffect(() => {
        setStepComponent();
    }, []);

    useEffect(() => {
        setStepComponent();
    }, [stepNum]);

    const steps = registerPlate;

    const setStepComponent = () => {
        let component;

        switch (stepNum) {
            case 0:
                component = <StepForm
                    step={steps[0]}
                    onSubmit={onSubmit}
                    schema={validation.register.first}
                />;
                break;
            case 1 :
                component = <StepForm
                    step={steps[1]}
                    onSubmit={onSubmit}
                    onPrev={toPrevStep}
                    schema={validation.register.second}
                />;
                break;
            case 2 :
                component = <StepForm
                    step={steps[2]}
                    onSubmit={onSubmit}
                    onPrev={toPrevStep}
                    schema={validation.register.third}
                />;
                break;
        }

        setStep(component);
    };

    const toPrevStep = () => {
        setStepNum(stepNum - 1);
    };

    const onSubmit = (data) => {

        if (stepNum === steps.length - 1) {
            AuthService.register(collectedData)
                .then(() => navigate('/login'))
                .catch(err => console.log(err));
        }

        setCollectedData({...collectedData, ...data});
        setStepNum(stepNum + 1);
    };

    return (
        <section className="register">
            {step}
        </section>
    );
};

export default withUnauthorizedLayout(Register);
