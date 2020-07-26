import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Details from "./details";
import Data from "./flightData";
import axios from "./axios";
import SearchPeople from "./searchpeople";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
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
                        <Link to="/details" className="find">
                            Form
                        </Link>
                        <Link to="/flightdetails" className="find">
                            Your Data
                        </Link>

                        <Link to="/users" className="find">
                            Search People
                        </Link>
                        <Link to="/list" className="find">
                            List
                        </Link>
                        <Link to="/chat" className="find">
                            Yatra-chat
                        </Link>
                        <a href="/logout" className="logout">
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
                </BrowserRouter>
            </div>
        );
    }
}
