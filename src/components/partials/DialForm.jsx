import React from 'react';
import TextInput from "../inputs/TextInput";
import RegularButton from "../UI/buttons/RegularButton";

const DialForm = () => {
    return (
        <div className="dial-form">
            <div className="dial-form__title bold-text">Create An Account</div>
            <div className="dial-form__caption regular-text">Create an account to enjoy all the services without any ads for free!</div>
            <form action="" className="dial-form__form">
                <TextInput/>
                <TextInput/>
                <RegularButton/>
            </form>
            <div className="dial-form__notice regular-text">Already Have An Account? Sign In</div>
        </div>
    );
};

export default DialForm;