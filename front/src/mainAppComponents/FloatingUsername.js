import * as React from "react";
import './mainAppStyles.css'
import userPicture from '../graphics/user.png'

function FloatingUsername(){

    return(
        <div className="floatingUsername">
            <img src={userPicture} alt="UserPicture" width={25} height={25}/>
            <p>Patryk Kurek</p>
        </div>
    );

}

export default FloatingUsername;