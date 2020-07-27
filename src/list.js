import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function List(props) {
    const [myUsers, setMyUsers] = useState([]);
    /* const [searchedName, setSearchedName] = useState(""); */

    useEffect(() => {
        let abort;

        (async () => {
            const { data } = await axios.get("/list");
            if (!abort) {
                setMyUsers(data);
                console.log("data for list of travelers: ", data);
            }
        })();
        return () => {
            abort = true;
        };
    }, []);

    return (
        <div className="search-people">
            <div>
                <h3>List of people</h3>
            </div>

            <div className="search-table">
                <table>
                    <thead>
                        <th>First</th>
                        <th>Last</th>
                        <th>Nationality</th>
                        <th>Dep-Date</th>
                        <th>Dep-Time</th>
                        <th>Arr-Date</th>
                        <th>Arr-Time</th>
                        <th>Fl-name</th>
                        <th>Fl-number</th>
                        <th>Seat-No</th>
                        <th>Arr-Place</th>
                    </thead>
                    <tbody>
                        {myUsers.map((each, key) => (
                            <tr key={key} className="link">
                                <td>{each.first}</td>
                                <td>{each.last}</td>
                                <td>{each.nationality}</td>
                                <td>{each.dep_date}</td>
                                <td>{each.dep_time}</td>
                                <td>{each.arr_date}</td>
                                <td>{each.arr_time}</td>
                                <td>{each.flight_name}</td>
                                <td>{each.flight_number}</td>
                                <td>{each.seat_number}</td>
                                <td>{each.arr_place}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
