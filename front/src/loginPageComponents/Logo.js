import * as React from "react";
import logo from '../graphics/logo.png';
import './loginPageStyles.css';

function Logo() {

    return(
            <div className="containerColumn">
                <div className="logoContainer">
                    <img src={logo} alt="Logo" width={100} height={100}/>
                    <p className="display-4">Multiuser Task Manager</p>
                </div>
            </div>
    );
}
export default Logo;