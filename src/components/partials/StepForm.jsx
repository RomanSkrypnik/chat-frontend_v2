import React from 'react';
import {Controller, useForm} from "react-hook-form";
import TextInput from "../inputs/TextInput";
import RegularButton from "../UI/buttons/RegularButton";

const StepForm = ({step, onPrev, onSubmit}) => {

    const {handleSubmit, control} = useForm();

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
