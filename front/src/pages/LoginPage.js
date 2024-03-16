import * as React from "react";
import axios from "axios";
import Logo from "../loginPageComponents/Logo.js";
import LoginForm from "../loginPageComponents/LoginForm.js";
import {request, setAuthToken} from "../axios_helper.js";
import '../loginPageComponents/loginPageStyles.css';
import {useNavigate} from "react-router-dom";
function LoginPage() {

    const navigate = useNavigate();

    const onLogin = async (e, username, password) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/users/login",{
                username: username,
                password: password 
            },{headers:{'Content-Type': 'application/json'}});

            localStorage.setItem("access_token",res.data.access_token);
            navigate("/mainapp");
        }
        catch(err){
            console.error(err);
            navigate("/");
        }
        // request("POST",
        //     "http://localhost:8080/users/login",
        //     {username: username, password: password}
        //     ).then((response) => {
        //         navigate("/mainapp");
        //         console.log(response.data.token);
        //         setAuthToken(response.data.token);
        // }).catch((error) => {
        //     console.error(error)
        //     navigate("/")
        // });
    };

    const onRegister = async(e, firstName, lastName, username, password) => {
        e.preventDefault();
        window.localStorage.removeItem("access_token");
        try{
            const res = await axios.post("http://localhost:8080/users",{ 
                firstname: firstName, 
                lastname: lastName,
                username: username,
                password: password
            },{headers: {'Content-Type': 'application/json'}});
            
            alert("Succesfully created user!");
            navigate("/");
        }
        catch(err){
            console.error(err);
            navigate("/");
        }



        // delete axios.defaults.headers.common['Authorization'];
        // request("POST",
        //     "http://localhost:8080/users",
        //     {
        //         firstName: firstName,
        //         lastName: lastName,
        //         username: username,
        //         password: password
        //     }
        // ).then((response) => {
        //     navigate("/");
        //     // navigate("/mainapp")
        //     // setAuthToken(response.data.token);
        // }).catch((error) => {
        //     console.error(error)
        //     navigate("/")
        // });
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