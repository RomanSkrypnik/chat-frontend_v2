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
            is: null,
            then: yup.string().required(),
            otherwise: yup.string(),
        }),
    })
};
