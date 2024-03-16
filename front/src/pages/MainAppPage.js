import * as React from "react";
import "../index.css"
// import { request } from '../axios_helper.js';
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SideBar from "../mainAppComponents/SideBar.js";
import {MapContainer,TileLayer} from "react-leaflet";
import { categoriesAtom,markersAtom, singleMarkerAtom} from "../mainAppComponents/atoms/MainApp.js";
import { useAtom, useSetAtom } from "jotai";
import FloatingUsername from "../mainAppComponents/FloatingUsername.js";
import { Marker } from "react-leaflet";


function MainAppPage() {
    const setCategories = useSetAtom(categoriesAtom);
    const [markers,setMarkers] = useAtom(markersAtom); 
    const [selectedMarker,setSelectedMarker] = useAtom(singleMarkerAtom);
    const navigate = useNavigate();

    useEffect(() => {
        const getCategories = async ()=>{
            const resp = await axios.get("http://localhost:8080/categories",{headers: { // fetch it from api!
                "Content-Type": "application/json"
            }})
                    
            setCategories(resp.data.data);
        };

        const getMarkers = async()=>{
          const resp = await axios.get("http://localhost:8080/markers",{headers: {
            "Content-Type": "application/json"
          }});
          
          setMarkers(resp.data.data)
        };


        getCategories();
        getMarkers();
    }, []);
    const position = [50.0614300, 19.9365800]


    const handleMarkerClick = (marker) => {
        console.log(marker);
        setSelectedMarker(marker)
    };

    return (
        <div className="containerMainApp">
            <SideBar selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker}/>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {markers?.map(marker=>{ 
                    return (
                        <Marker position={[marker.lat,marker.lng]} eventHandlers={{click: ()=> handleMarkerClick(marker)}}/>
                    )
                })}

             </MapContainer>
            <FloatingUsername/>
        </div>
    );
}

export default MainAppPage;