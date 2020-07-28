import React, { useState, useEffect } from "react";
/* import Calendar from "react-calendar"; */
import axios from "./axios";

/* import { Link } from "react-router-dom"; */

export default function Data() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);

    const modalOpen = () => {
        setDeleteModal(true);
    };

    const modalClose = () => {
        setDeleteModal(false);
    };

    const deleteAccount = (e) => {
        e.preventDefault();
        axios
            .post("/deleteAccount")
            .then((res) => {
                console.log("this is my delete res: ", res.data);
                location.replace("/");
            })
            .catch((err) => {
                console.log("this is my delete err:", err);
            });
    };

    useEffect(() => {
        axios
            .get("/flightdata")
            .then((result) => {
                console.log("getting all flight data: ", result.data);
                setData(result.data);
            })
            .catch((err) => {
                console.log("getting all flight data err : ", err);
            });
    }, []);

    return (
        <div className="flightdata-container">
            <h2>Thank you for submitting your flight details! 🎉 </h2>
            {data.map((each, key) => (
                <div className="data" key={key}>
                    <h3 className="thankyou">Your flight details</h3>
                    <div className="travelrs-name">
                        <p className="details">
                            Name: {each.first} {each.last}
                        </p>
                        <p className="details">
                            Nationality: {each.nationality}
                        </p>
                    </div>
                    <div className="date-time">
                        <h5 className="det">-----Dep & Arr-----</h5>
                        <p className="details">
                            Departure: On {each.dep_date}, at {each.dep_time}
                        </p>
                        <p className="details">
                            Arrival: On {each.arr_date}, at {each.arr_time}
                        </p>
                    </div>
                    <div className="flight">
                        <h5 className="det">-----Flight details-----</h5>

                        <p className="details">
                            Flight Name: {each.flight_name}
                        </p>
                        <p className="details">
                            Flight Number: {each.flight_number}
                        </p>
                        <p className="details">
                            Seat Number: {each.seat_number}
                        </p>
                        <p className="details">
                            Arrival Location : {each.arr_place}
                        </p>
                    </div>
                </div>
            ))}
            <button className="sendbtn1" onClick={modalOpen}>
                Delete data
            </button>
            {deleteModal && (
                <div className="deletemodal">
                    <p className="delete-para">
                        Are you sure you want to delete your data Permanently?
                        This will delete all your flight data!
                    </p>
                    <div className="del-modalbtn">
                        <button className="sendbtn2" onClick={deleteAccount}>
                            I agree
                        </button>
                        <button className="sendbtn3" onClick={modalClose}>
                            cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
