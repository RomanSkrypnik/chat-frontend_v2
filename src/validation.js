import * as yup from "yup";

export default {

    login: yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    }),

    register: {
        first:
            yup.object().shape({
                email: yup.string().email().required(),
                name: yup.string().required(),
                username: yup.string().required(),

            }),
        second: yup.object().shape({
            password: yup.string().required(),
            passwordConfirm: yup
                .string()
                .required()
                .oneOf([yup.ref('password'), null], "Passwords don't match")
        }),
        third: yup.object().shape({
            notRequired: yup.string().notRequired(),
        })
    },

    home: yup.object().shape({
        text: yup.string().when('media', {
            is: val => val === null || val === undefined,
            then: yup.string().required(),
            otherwise: yup.string(),
        }),
    }),

    privacy: yup.object().shape({
        email: yup.string().email().required(),
        name: yup.string().required(),
        password: yup.string().required().min(8),
        newPassword: yup.lazy(val => {
            if (val === '') {
                return yup.string();
            } else {
                return yup.string().min(8, 'Minimal length of password is 8 letters')
            }
        }),
        passwordConfirm: yup.string().when('newPassword', {
            is: '',
            then: yup.string(),
            otherwise: yup.string().oneOf([yup.ref('newPassword')], "Passwords don't match"),
        })
    })
};
