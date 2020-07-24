import React, { useState, useEffect } from "react";
/* import Calendar from "react-calendar"; */
import axios from "./axios";

/* import { Link } from "react-router-dom"; */

export default function Data() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("/flightdata")
            .then(({ data }) => {
                console.log("getting all flight data: ", data);
                setData(data);
            })
            .catch((err) => {
                console.log("getting all flight data err : ", err);
            });
    }, []);

    return (
        <div className="flightdata-container">
            <h2>Thank you for submitting your flight details!</h2>
            <div className="data">
                <h2>Your flight details</h2>
                <div className="travelrs-name">
                    <p className="details">
                        Name: {data.first} {data.last}
                    </p>
                    <p>Nationality: {data.nationality}</p>
                </div>

                <div className="date-time">
                    <p className="details">
                        Departure: On {data.dep_date}, at {data.dep_time}
                    </p>
                    <p className="details">
                        Arrival: On {data.arr_date}, at {data.arr_time}
                    </p>
                </div>

                <div className="flight">
                    <p className="details">Flight Name: {data.flight_name}</p>
                    <p className="details">
                        Flight Number: {data.flight_number}
                    </p>
                    <p className="details">Seat Number: {data.seat_number}</p>
                    <p className="details">
                        Arrival Location : {data.arr_place}
                    </p>
                </div>
            </div>
        </div>
    );
}
