import React from "react";
/* import Calendar from "react-calendar"; */
import axios from "./axios";
/* import { Link } from "react-router-dom"; */

export default class EditDetails extends React.Component {
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
        };
        console.log("this is my props in edit details: ", props);
    }

    componentDidMount() {
        this.setState({
            nationality: this.props.nationality,
            dep_date: this.props.dep_date,
            dep_time: this.props.dep_time,
            arr_date: this.props.arr_date,
            arr_time: this.props.arr_time,
            flight_name: this.props.flight_name,
            flight_number: this.props.flight_number,
            seat_number: this.props.seat_number,
            arr_place: this.props.arr_place,
        });
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
            .post("/editdetails", {
                id: this.state.user_id,
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
                location.replace("/flightdetails");
            })
            .catch((err) => {
                console.log("my err in axios details: ", err);
                this.setState({
                    error: true,
                });
                location.replace("/editdetails");
            });
    }

    render() {
        return (
            <div className="details-info">
                {this.state.error && (
                    <div className="error">ALL FIELDS ARE REQUIRED!!</div>
                )}
                <p id="insert_details">Update your data here:</p>
                <form method="POST" className="details_form">
                    <div className="nationality">
                        <p id="input-data">Nationality:</p>
                        <input
                            type="text"
                            className="userinput1"
                            name="nationality"
                            /*                             placeholder={this.state.nationality}
                             */ value={this.state.nationality}
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>

                    <div className="dep_arr">
                        <p id="input-data">Departure: Date & Time</p>
                        <input
                            type="text"
                            className="userinput1"
                            name="dep_date"
                            /*                             placeholder={this.props.dep_date}
                             */ value={this.state.dep_date}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            type="text"
                            className="userinput1"
                            name="dep_time"
                            /*                             placeholder={this.props.dep_time}
                             */ value={this.state.dep_time}
                            onChange={(e) => this.handleChange(e)}
                        />

                        <p id="input-data">Arrival: Date & Time</p>
                        <input
                            type="text"
                            className="userinput1"
                            name="arr_date"
                            /*                             placeholder={this.props.arr_date}
                             */ value={this.state.arr_date}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            type="text"
                            className="userinput1"
                            name="arr_time"
                            /*                             placeholder={this.props.arr_time}
                             */ value={this.state.arr_time}
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>

                    <div className="flight_details">
                        <p id="input-data">Flight details:</p>
                        <input
                            type="text"
                            className="userinput1"
                            name="flight_name"
                            /*                             placeholder={this.props.flight_name}
                             */ value={this.state.flight_name}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            type="text"
                            className="userinput1"
                            name="flight_number"
                            /*                             placeholder={this.props.flight_number}
                             */ value={this.state.flight_number}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            type="text"
                            className="userinput1"
                            name="seat_number"
                            /*                             placeholder={this.props.seat_number}
                             */ value={this.state.seat_number}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            type="text"
                            className="userinput1"
                            name="arr_place"
                            /*                             placeholder={this.props.arr_place}
                             */ value={this.state.arr_place}
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>

                    <button
                        className="upload_btn"
                        onClick={(e) => this.handleSubmit(e)}
                    >
                        Update
                    </button>
                </form>
            </div>
        );
    }
}
