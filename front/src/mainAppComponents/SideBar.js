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

    const starAverage = 3.7;

    const fullStars = Math.floor(starAverage);
    // Gets the number of full stars. starAverage is the rating, for example 
    // if the rating were 4.3, fullStars would now be 4.

    const starArr = [];
    // Create an empty array. We will add 1s, 0s, and a decimal value for the 
    // partial star.

    for(let i = 1; i <= fullStars; i++)
    {
    starArr.push(1);
    }
    // This adds a 1 to the array for each full star in our rating

    if(starAverage < 5) {
    // Wrapped in an if block because the following only needs to occur if 
    // it's not a full 5.

    const partialStar = starAverage - fullStars;
        // Calculates the partial star. For example 4.3 - 4 = 0.3. 0.3 will get 
        // added to the array in the next line to represent the partial star

    starArr.push(partialStar);
        // Adds the partial star to the array

    const emptyStars = 5 - starArr.length;
        // Calculates the number of empty stars

    for(let i=1; i<=emptyStars; i++) {
        starArr.push(0);
    }
        // This for loop adds 0s to the array to represent empty stars
    }

    const stars = starArr.map((val, i) => {
    return <div key={i} 
        className="starBox" 
        style={{background: `linear-gradient(90deg, rgba(11,99,229,255) 
        ${val * 100}%, #bbbac0 ${val * 100}%)`, color: 'white', fontSize: '30px'}}>★</div>
    })
    // This last block is explained in the following paragraphs below



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
                        <img  src={photo} alt="photo" className="photo"/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu lectus vitae tortor iaculis ornare. Sed et mollis justo.</p>
                        <div class="rating">
                            {stars}
                            <p style={{fontSize: "20px", }}><b>3.7</b></p>
                        </div>
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
