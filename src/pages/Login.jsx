import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import withUnauthorizedLayout from "../layouts/Unauthorized";

const Login = () => {
    const router = useParams();

    return (
        <div>
           login
        </div>
    );
};

export default withUnauthorizedLayout(Login);
