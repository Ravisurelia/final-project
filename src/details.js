import React from "react";
/* import Calendar from "react-calendar"; */
import axios from "./axios";
/* import { Link } from "react-router-dom"; */

export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nationality: "",
            dep_date: "",
            dep_time: "",
            arr_date: "",
            arr_time: "",
            flight_name: "",
            flight_number: "",
            seat_number: "",
            arr_place: "",
            error: false,
            date: new Date(),
        };
    }

    onChangeDate(date) {
        this.setState({ date });
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
            .post("/details", {
                nationality: this.state.nationality,
                dep_date: this.state.dep_date,
                dep_time: this.state.dep_time,
                arr_date: this.state.arr_date,
                arr_time: this.state.arr_time,
                flight_name: this.state.flight_name,
                flight_number: this.state.flight_number,
                seat_number: this.state.seat_number,
                arr_place: this.state.arr_place,
            })
            .then((results) => {
                console.log(
                    "This is my results in post axios details: ",
                    results
                );
                location.replace("/");
            })
            .catch((err) => {
                console.log("my err in axios details: ", err);
                this.setState({
                    error: true,
                });
                location.replace("/login");
            });
    }

    render() {
        return (
            <div className="details-info">
                {this.state.error && (
                    <div className="error">ALL FIELDS ARE REQUIRED!!</div>
                )}
                <p id="insert_details">Please insert your details below:</p>
                <form method="POST" className="registration_form">
                    <p id="input-data">Nationality:</p>
                    <input
                        type="text"
                        className="userinput1"
                        name="nationality"
                        placeholder="Nationality"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />

                    <p id="input-data">Departure:</p>
                    <input
                        type="text"
                        className="userinput1"
                        name="dep_date"
                        placeholder="Departure Date"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        type="text"
                        className="userinput1"
                        name="dep_time"
                        placeholder="Departure Time(i.e 23:15)"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />

                    <p id="input-data">Arrival:</p>
                    <input
                        type="password"
                        className="userinput1"
                        name="arr_date"
                        placeholder="Arrival Date"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        type="text"
                        className="userinput1"
                        name="arr_time"
                        placeholder="Arrival Time(i.e 23:15"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />

                    <p id="input-data">Flight details:</p>
                    <input
                        type="text"
                        className="userinput1"
                        name="flight_name"
                        placeholder="Flight Name"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        type="text"
                        className="userinput1"
                        name="flight_number"
                        placeholder="Flight Number"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        type="password"
                        className="userinput1"
                        name="seat_number"
                        placeholder="Seat Number"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        type="password"
                        className="userinput1"
                        name="arr_place"
                        placeholder="Arrival Place"
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
                {/*  <div className="login_page">
                    If you're already registered!
                    <Link to="/login" className="login_page1">
                        Login Here!
                    </Link>
                </div> */}
            </div>
        );
    }
}
