import * as React from "react";
import "../index.css"
// import { request } from '../axios_helper.js';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SideBar from "../mainAppComponents/SideBar.js";
import {MapContainer,TileLayer} from "react-leaflet";
 
function MainAppPage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // request("GET", "/messages", {})
        //     .then((response) => {
        //         setData(response.data);
        //     });
    }, []);
    const position = [51.505, -0.09]

    return (
        <div>

                <SideBar/>
                    <MapContainer center={position} heigh zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                     </MapContainer>
        </div>
    );
}

export default MainAppPage;