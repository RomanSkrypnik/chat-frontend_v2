import React from 'react';
import {Controller, useForm} from "react-hook-form";
import TextInput from "../inputs/TextInput";
import RegularButton from "../UI/buttons/RegularButton";
import {yupResolver} from "@hookform/resolvers/yup";

const StepForm = ({step, onPrev, onSubmit, schema = {}}) => {

    const {handleSubmit, control, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <div className="dial-form">

            {step.title && <h2 className="bold-text bold-text_fz25 text-center mb-3">{step.title}</h2>}

            {step.text && <div className="regular-text text-center mb-3">{step.text}</div>}

            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    step.fields &&
                    step.fields.map(field => (
                            <Controller
                                control={control}
                                name={field.name}
                                key={field.name}
                                render={
                                    ({field: {onChange, value}}) =>
                                        <TextInput
                                            errorText={errors[field.name]?.message}
                                            classname={errors[field.name] && 'error'}
                                            name={field.name}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            onChange={onChange}
                                            value={value}
                                        />
                                }
                            />
                        )
                    )
                }

                <div className="d-flex justify-content-evenly">
                    {
                        step.buttons &&
                        step.buttons.map((button, key) => (

                                button.type === 'submit'
                                    ?
                                    <RegularButton
                                        type={button.type}
                                        key={key}
                                    >{button.text}</RegularButton>
                                    :
                                    <RegularButton
                                        type={button.type}
                                        onClick={onPrev}
                                        key={key}
                                    >{button.text}</RegularButton>
                            )
                        )
                    }
                </div>
            </form>
        </div>
    );
};

export default StepForm;
