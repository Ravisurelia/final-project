import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function SearchPeople(props) {
    /*     const [latestUsers, setLatestUsers] = useState([]);*/

    const [myUsers, setMyUsers] = useState([]);
    const [searchedName, setSearchedName] = useState("");

    /* useEffect(() => {
        if (searchedName == "") {
            axios.get("/latestusers").then(({ data }) => {
                console.log("data from getting last 3 profiles: ", data);
                setLatestUsers(data.rows);
            });
        }
    }, []); */

    useEffect(() => {
        let abort;
        if (searchedName != "") {
            (async () => {
                const { data } = await axios.get(
                    `/api/searchpeople?searchName=${searchedName}`
                );
                if (!abort) {
                    setMyUsers(data);
                    console.log("data from getting match profiles: ", data);
                    console.log("search names: ", searchedName);
                }
            })();
        } else {
            setMyUsers([]);
        }
        return () => {
            abort = true;
        };
    }, [searchedName]);

    return (
        <div className="search-people">
            <h3 className="search-people">Search People</h3>
            <input
                type="text"
                onChange={(e) => setSearchedName(e.target.value)}
                placeholder="Enter Name"
                className="entername"
            />
            <div>
                {searchedName == "" && (
                    <h3>Search with 'First' or 'Last' name</h3>
                )}
            </div>

            <div>
                <table>
                    {myUsers.map((each, key) => (
                        <Link to={`/flightdetails`} key={key} className="link">
                            <tr>
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
                            </tr>
                            <tr>
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
                        </Link>
                    ))}
                </table>
            </div>
        </div>
    );
}
