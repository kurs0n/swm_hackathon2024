import './App.css';
import LoginPage from "../pages/LoginPage.js";

function App(){

    return(
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <LoginPage/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;