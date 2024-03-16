import * as React from "react";
import "../index.css"
// import { request } from '../axios_helper.js';
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SideBar from "../mainAppComponents/SideBar.js";
import {MapContainer,TileLayer} from "react-leaflet";
import { categoriesAtom } from "../mainAppComponents/atoms/MainApp.js";
import { useSetAtom } from "jotai";
import FloatingUsername from "../mainAppComponents/FloatingUsername.js";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";

function MainAppPage() {
    const setCategories = useSetAtom(categoriesAtom);
    const navigate = useNavigate();

    useEffect(() => {
        const getCategories = async ()=>{
            const resp = await axios.get("http://localhost:3000/categories.json",{headers: { // fetch it from api!
                "Content-Type": "application/json"
            }})
    
                    
            setCategories(resp.data.Categories);
        };


        getCategories();
    }, []);
    const position = [50.0614300, 19.9365800]

    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerClick = (markerInfo) => {
        setSelectedMarker(markerInfo);
    };

    return (
        <div className="containerMainApp">
            <SideBar selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker}/>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position} eventHandlers={{ click: () => handleMarkerClick('Marker Info or ID') }}>
                </Marker>

             </MapContainer>
            <FloatingUsername/>
        </div>
    );
}

export default MainAppPage;