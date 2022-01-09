import React from 'react';
import TextInput from "../inputs/TextInput";
import RegularButton from "../UI/buttons/RegularButton";
import cn from "classnames";
import { useForm } from "react-hook-form";
import FileInput from "../inputs/FileInput";

const DialForm = ({title, subtitle, fields = [], buttons = [], onSubmit, notice}) => {
    const { register, handleSubmit } = useForm();

    return (
        <div className="dial-form">
            <div className="dial-form__title bold-text bold-text_fz25 text-center">{title}</div>
            <div className="dial-form__caption regular-text text-center mt-2 mb-4">{subtitle}</div>
            <form action="" className="dial-form__form d-flex flex-column align-items-center" onSubmit={handleSubmit((data) => onSubmit(data))}>
                {fields.map((field, index) => {
                    switch(field.type) {
                        case 'file': return <FileInput dark={field.dark} placeholder={field.placeholder} key={index} />;
                        case 'text': return <TextInput register={register} name={field.name} placeholder={field.placeholder} key={index}/>
                    }
                })}
                <div className={cn("d-flex w-50 mt-3", buttons.length < 2 ? 'justify-content-center' : 'justify-content-evenly')}>
                    {buttons.map((button, index) => <RegularButton type={button.type} text={button.text} onClick={button.onClick} key={index}/>)}
                </div>
            </form>
            <div className="dial-form__notice regular-text text-center mt-3">{notice}</div>
        </div>
    );
};

export default DialForm;
