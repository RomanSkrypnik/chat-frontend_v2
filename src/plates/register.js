export default [
    {
        title: 'Register',
        text: 'To sign up a new account, you need to fill out those fields',
        fields: [
            {name: 'email', type: 'text', placeholder: 'Email'},
            {name: 'name', type: 'text', placeholder: 'Name'},
            {name: 'username', type: 'text', placeholder: 'Username'},
        ],
        buttons: [
            {text: 'Next', type: 'submit'}
        ]
    },
    {
        title: 'Create a password',
        fields: [
            {name: 'password', type: 'password', placeholder: 'Password'},
            {name: 'password', type: 'password', placeholder: 'Confirm your password'},
        ],
        buttons: [
            {text: 'Back', type: 'button'},
            {text: 'Next', type: 'submit'},
        ]
    },
    {
        title: 'Confirmation',
        text: 'After this step you will be send a message with account confirmation',
        buttons: [
            {text: 'Back', type: 'button'},
            {text: 'Next', type: 'submit'},
        ]
    }
];
