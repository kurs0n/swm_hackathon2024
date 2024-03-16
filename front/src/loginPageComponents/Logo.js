import * as React from "react";
import dumbbell from '../graphics/dumbbell.png'
import './loginPageStyles.css';

function Logo() {

    return(
            <div className="containerColumn">
                <div className="logoContainer">
                    <div className="logoImage">
                        <img src={dumbbell} alt="Logo" width={50} height={50}/>
                    </div>
                        <h1>KrakVenture</h1>
                </div>
            </div>
    );
}
export default Logo;