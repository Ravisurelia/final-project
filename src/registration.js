import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            error: false,
        };
    }
    handleChange(e) {
        let name = e.target.name;
        let val = e.target.value;

        this.setState({
            [name]: val,
        });
        console.log("This is my this.state in registration:", this.state);
    }

    handleSubmit(e) {
        e.preventDefault();

        axios
            .post("/registration", {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
            })
            .then((results) => {
                console.log(
                    "This is my results in post axios registration: ",
                    results
                );
                location.replace("/");
            })
            .catch((err) => {
                console.log("my err in axios registration: ", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div className="registration-info">
                {this.state.error && (
                    <div className="error">ALL FIELDS ARE REQUIRED!!</div>
                )}
                <p id="insert_details">Register here</p>
                <form method="POST" className="registration_form">
                    <input
                        type="text"
                        className="userinput"
                        name="firstname"
                        placeholder="First Name"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        type="text"
                        className="userinput"
                        name="lastname"
                        placeholder="Last Name"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        type="text"
                        className="email"
                        name="email"
                        placeholder="email"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        type="password"
                        className="password"
                        name="password"
                        placeholder="password"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />

                    <button
                        className="submit_btn"
                        onClick={(e) => this.handleSubmit(e)}
                    >
                        Submit
                    </button>
                </form>
                <div className="login_page">
                    If you're already registered!
                    <Link to="/login" className="login_page1">
                        Login Here!
                    </Link>
                </div>
            </div>
        );
    }
}
