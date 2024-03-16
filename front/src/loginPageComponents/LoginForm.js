import React from "react";
import classNames from 'classnames';
import './loginPageStyles.css';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            welcomeText: "Welcome Back",
        };
    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    };

    onSubmitLogin = (e) => {
        e.preventDefault();
        this.props.onLogin(e, this.state.login, this.state.password);
    };

    onSubmitRegister = (e) => {
        e.preventDefault();
        this.props.onRegister(
            e,
            this.state.firstName,
            this.state.lastName,
            this.state.login,
            this.state.password
        );
    };

    render() {
        return (
            <div className="containerColumn">
                <div className="containerWelcome">
                    <h1>{this.state.welcomeText}</h1>
                    <p>Please enter your details</p>
                </div>
                <div className="col-md-6">
                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={classNames("nav-link", { active: this.state.active === "login", inactive: this.state.active !== "login" })}
                                id="tab-login"
                                onClick={() => this.setState({ active: "login", welcomeText: "Welcome Back" })}
                            >
                                Sign in
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={classNames("nav-link", { active: this.state.active === "register", inactive: this.state.active !== "register" })}
                                id="tab-register"
                                onClick={() => this.setState({ active: "register", welcomeText: "Welcome" })}
                            >
                                Sign up
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <div className="tab-content">
                        <div className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")} id="pills-login" >
                            <form onSubmit={this.onSubmitLogin}>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="loginName">Username</label>
                                    <input type="login" id="loginName" name= "login" className="form-control" onChange={this.onChangeHandler}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="loginPassword">Password</label>
                                    <input type="password" id="loginPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mb-4 w-100">Continue</button>

                            </form>
                        </div>
                        <div className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")} id="pills-register" >
                            <form onSubmit={this.onSubmitRegister}>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="firstName">First name</label>
                                    <input type="text" id="firstName" name="firstName" className="form-control" onChange={this.onChangeHandler}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="lastName">Last name</label>
                                    <input type="text" id="lastName" name="lastName" className="form-control" onChange={this.onChangeHandler}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="login">Username</label>
                                    <input type="text" id="login" name="login" className="form-control" onChange={this.onChangeHandler}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="registerPassword">Password</label>
                                    <input type="password" id="registerPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mb-3 w-100">Continue</button>
                            </form>
                        </div>
                </div>
                </div>
            </div>
        );
    };
}