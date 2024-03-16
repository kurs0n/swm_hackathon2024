import * as React from "react";
import axios from "axios";
import Logo from "../loginPageComponents/Logo.js";
import LoginForm from "../loginPageComponents/LoginForm.js";
import {request, setAuthToken} from "../axios_helper.js";
import '../loginPageComponents/loginPageStyles.css';
import {useNavigate} from "react-router-dom";
function LoginPage() {

    const navigate = useNavigate();

    const onLogin = (e, username, password) => {
        e.preventDefault();
        request("POST",
            "/login",
            {login: username, password: password}
            ).then((response) => {
                navigate("/mainapp");
                setAuthToken(response.data.token);
        }).catch((error) => {
            console.error(error)
            navigate("/")
        });
    };

    const onRegister = (e, firstName, lastName, username, password) => {
        e.preventDefault();
        window.localStorage.removeItem("auth_token");
        delete axios.defaults.headers.common['Authorization'];
        request("POST",
            "/register",
            {
                firstName: firstName,
                lastName: lastName,
                login: username,
                password: password
            }
        ).then((response) => {
            navigate("/mainapp")
            setAuthToken(response.data.token);
        }).catch((error) => {
            console.error(error)
            navigate("/")
        });
    };


    return(
        <div className="containerFullScreen gradientBg">
            <div className="containerLoginForm container-md">
                <Logo/>
                <LoginForm onLogin={onLogin} onRegister={onRegister}/>
            </div>
        </div>
    );

}

export default LoginPage;