import * as React from "react";
import { useEffect } from "react";
import './mainAppStyles.css';
import logoutIcon from '../graphics/logout.png'
import {useNavigate} from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { categoriesAtom,checkedCategoriesAtom, markersAtom } from "./atoms/MainApp.js";
import axios from "axios";
import dumbbell from '../graphics/dumbbell.png'
import leftArrow from '../graphics/left-arrow.png'
import locationMarker from '../graphics/location.png'
import { CSSTransition } from 'react-transition-group';

import photo from '../photos/orlik.png'

function SideBar({ selectedMarker, setSelectedMarker }) {
    const categories = useAtomValue(categoriesAtom);
    const setMarkers = useSetAtom(markersAtom);
    const [checkedCategories,setCheckedCategories] = useAtom(checkedCategoriesAtom);
    const navigate = useNavigate();

    const logout = () => {
        navigate("/")
        window.localStorage.removeItem("auth_token");
        delete axios.defaults.headers.common['Authorization'];

    };

    // useEffect(()=>{
    //     const getCategoriesMarkers = async()=>{
    //         if(checkedCategories.length){
    //             let query ="";
    //             for(let i=0; i<checkedCategories.length; i++){
    //                 if (i==0){
    //                     query = `?categories=${checkedCategories[i]}`;
    //                 }
    //                 else {
    //                     query += `&categories=${checkedCategories[i]}`;
    //                 }
    //             }
    //             const res = await axios.get("http://localhost:8080/markers"+query,{
    //                 headers:{
    //                     "Content-Type": "applcitation/json"
    //                 }
    //             });
    //             console.log(res.data);
    //         }
    //     };
    //     getCategoriesMarkers();
    // },[checkedCategories.length]);

    const handleBackClick =async () => {
        setCheckedCategories([]);
        const res = await axios.get("http://localhost:8080/markers",{
            headers:{
                "Content-Type": "applcitation/json"
            }
        });
        
        setMarkers(res.data.data);
        setSelectedMarker(null);
    };

    const starAverage = 2.7;

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
        style={{background: `linear-gradient(90deg, rgb(140,188,244) 
        ${val * 100}%, #848484 ${val * 100}%)`, color: 'white', fontSize: '30px'}}><img src={dumbbell} width={35} height={35}/></div>
    })
    // This last block is explained in the following paragraphs below


    const onClickCheckbox = async(event)=>{
        const data = checkedCategories;

        if(event.target.checked == true){
            data.push(event.target.name);
            setCheckedCategories(data);
        }
        else if(event.target.checked == false){
            const indexToDelete =data.indexOf(event.target.name)
            data.splice(indexToDelete,1);
            setCheckedCategories(data);
        }

        if(data.length){
            let query ="";
            for(let i=0; i<checkedCategories.length; i++){
                if (i==0){
                    query = `?categories=${checkedCategories[i]}`;
                }
                else {
                    query += `&categories=${checkedCategories[i]}`;
                }
            }
            const res = await axios.get("http://localhost:8080/markers"+query,{
                headers:{
                    "Content-Type": "applcitation/json"
                }
            });
            
            setMarkers(res.data.data);
        }
        else { 
            const res = await axios.get("http://localhost:8080/markers",{
                headers:{
                    "Content-Type": "applcitation/json"
                }
            });
            
            setMarkers(res.data.data);
        }
    };

    const checkIfCategoryIsChecked = (category)=>{
        if(checkedCategories.findIndex(category._id)>=0){
            return true;
        }
        else {
            return false;
        }
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

                        <h4 className="markerName">{selectedMarker?.category.name.toUpperCase()[0]+selectedMarker?.category.name.substring(1)}</h4>
                        <img src={photo} alt="photo" className="photo"/>
                        <p>Trenuj!</p>
                        <div className="location">
                            <img src={locationMarker} alt="LocationMarker" width={40} height={40}/>
                            <p>{selectedMarker?.address}</p>
                        </div>
                        <div className="category">
                            <p>Kategoria:</p>
                            <p>{selectedMarker?.category.name}</p>
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
                            <input type="checkbox" onChange={onClickCheckbox} name={category._id}/>
                            <label>{category.name}</label>
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
