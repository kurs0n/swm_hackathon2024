import * as React from "react";
import './mainAppStyles.css';
import logoutIcon from '../graphics/logout.png'
import {useNavigate} from "react-router-dom";
import { useAtomValue } from "jotai";
import { categoriesAtom } from "./atoms/MainApp.js";
import axios from "axios";
import dumbbell from '../graphics/dumbbell.png'

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
                    <img src={dumbbell} alt="Logo" width={50} height={50}/>
                </div>
                <div className="companyName">
                    <h1>KrakVenture</h1>
                </div>
            </div> 
            <div className="categoriesDiv">
            {
                categories.map(category=>(
                    <div className="category">
                        <input type="checkbox" placeholder={category}/>
                        <label>{category}</label>
                    </div>
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
