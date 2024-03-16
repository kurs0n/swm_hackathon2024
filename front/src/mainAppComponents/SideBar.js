import * as React from "react";
import './mainAppStyles.css';
import logo from '../graphics/logo.png';
import logoutIcon from '../graphics/logout.png'
import {useNavigate} from "react-router-dom";
import { useAtomValue } from "jotai";
import { categoriesAtom } from "./atoms/MainApp.js";
import axios from "axios";

function SideBar() {
    const categories = useAtomValue(categoriesAtom);
    const navigate = useNavigate();

    const logout = () => {
        navigate("/")
        window.localStorage.removeItem("auth_token");
        delete axios.defaults.headers.common['Authorization'];

    };

    return(
        <div className="col-md-3 borderRightSide containerSideBar">
            <div className="containerLogo">
                <div className="containerLogoBackground">
                    <img src={logo} alt="Logo" width={50} height={50}/>
                </div>
                <div>
                    <h1>Wietaminki</h1>
                </div>
            </div> 
            <div className="categoriesDiv">
            {
                categories.map(category=>(
                    <>
                        <label>{category}</label>
                        <input type="checkbox" placeholder={category}/>
                    </>
                ))
            }

            </div>
            <div className="containerOptions">
                <div className="containerHoverBackground">
                    <img src={logoutIcon} alt="Logout" onClick={logout}/>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
