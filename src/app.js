import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Details from "./details";
import Data from "./flightData";
import axios from "./axios";
import SearchPeople from "./searchpeople";
import List from "./list";
import Chat from "./chat";
import EditDetails from "./editdetails";
import PlaceToVisit from "./tour";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        axios
            .get("/editdetails")
            .then((result) => {
                console.log("getting all old details: ", result.data);
                this.setState(result.data);
            })
            .catch((err) => {
                console.log("getting all flight data err : ", err);
            });
        console.log("app mounted");
    }

    render() {
        return (
            <div className="app_main">
                <BrowserRouter>
                    <div className="app-navbar">
                        <Link to="/flightdetails" className="logo_name">
                            <img src="/yds-logo.png" className="app_logo" />
                        </Link>
                        <Link to="/details" className="link2">
                            Form
                        </Link>
                        <Link to="/flightdetails" className="link2">
                            Your Data
                        </Link>
                        <Link to="/edit" className="link2">
                            Edit Data
                        </Link>

                        <Link to="/users" className="link2">
                            Search People
                        </Link>
                        <Link to="/listoftravelers" className="link2">
                            List
                        </Link>
                        <Link to="/tour" className="link2">
                            Place to visit
                        </Link>
                        <Link to="/chat" className="link2">
                            Yatra-chat
                        </Link>
                        <a href="/logout" className="link1">
                            Logout
                        </a>
                    </div>
                    <Route exact path="/details" component={Details} />
                    <Route
                        exact
                        path="/flightdetails"
                        render={() => (
                            <Data
                                id={this.state.id}
                                firstname={this.state.firstname}
                                lastname={this.state.lastname}
                                nationality={this.state.nationality}
                                dep_date={this.state.dep_date}
                                dep_time={this.state.dep_time}
                                arr_date={this.state.arr_date}
                                arr_time={this.state.arr_time}
                                flight_name={this.state.flight_name}
                                flight_number={this.state.flight_number}
                                seat_number={this.state.seat_number}
                                arr_place={this.state.arr_place}
                            />
                        )}
                    />
                    <Route exact path="/users" component={SearchPeople} />
                    <Route exact path="/listoftravelers" component={List} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/tour" component={PlaceToVisit} />

                    <Route
                        exact
                        path="/edit"
                        render={() => (
                            <EditDetails
                                id={this.state.id}
                                firstname={this.state.firstname}
                                lastname={this.state.lastname}
                                nationality={this.state.nationality}
                                dep_date={this.state.dep_date}
                                dep_time={this.state.dep_time}
                                arr_date={this.state.arr_date}
                                arr_time={this.state.arr_time}
                                flight_name={this.state.flight_name}
                                flight_number={this.state.flight_number}
                                seat_number={this.state.seat_number}
                                arr_place={this.state.arr_place}
                            />
                        )}
                    />
                </BrowserRouter>
            </div>
        );
    }
}
