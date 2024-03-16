import * as React from "react";
import './mainAppStyles.css';
import logoutIcon from '../graphics/logout.png'
import {useNavigate} from "react-router-dom";
import { useAtomValue } from "jotai";
import { categoriesAtom } from "./atoms/MainApp.js";
import axios from "axios";
import dumbbell from '../graphics/dumbbell.png'
import leftArrow from '../graphics/left-arrow.png'
import locationMarker from '../graphics/location.png'
import { CSSTransition } from 'react-transition-group';

import photo from '../photos/orlik.png'

function SideBar({ selectedMarker, setSelectedMarker }) {
    const categories = useAtomValue(categoriesAtom);
    const navigate = useNavigate();

    const logout = () => {
        navigate("/")
        window.localStorage.removeItem("auth_token");
        delete axios.defaults.headers.common['Authorization'];

    };

    const handleBackClick = () => {
        setSelectedMarker(null);
    };

    return(
        <div className="col-md-3 borderRightSide">
            <CSSTransition
                in={selectedMarker != null}
                timeout={300}
                classNames="sidebar-transition"
                unmountOnExit
            >
                    <div className="markerInfo">
                        <h4 className="markerName">Stowarzyszenie Siemacha - Centrum Rozwoju Com-Com Zone</h4>
                        <img src={photo} alt="photo" className="photo"/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu lectus vitae tortor iaculis ornare. Sed et mollis justo.</p>
                        <div className="location">
                            <img src={locationMarker} alt="LocationMarker" width={40} height={40}/>
                            <p>ul. Ptaszyckiego 6 31-979 Kraków</p>
                        </div>
                        <div className="category">
                            <p>Kategoria:</p>
                            <p>Piłka nożna</p>
                        </div>
                        <div className="leftArrow">
                        <img src={leftArrow} alt="LeftArrow" width={75} height={75} onClick={handleBackClick}/>
                        </div>
                    </div>
            </CSSTransition>

            <CSSTransition
                in={selectedMarker == null}
                timeout={300}
                classNames="sidebar-transition"
                unmountOnExit
            >
            <div className="containerSideBar">
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
            </CSSTransition>
        </div>
    );
}

export default SideBar;
