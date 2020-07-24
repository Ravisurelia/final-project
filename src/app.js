import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Details from "./details";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="app_main">
                <BrowserRouter>
                    {/* <div className="navbar">
                        <Link to="/">
                            <img src="/yds-logo.png" className="tree_logo" />
                        </Link>
                        <Link to="/" className="nav-name">
                            <p>Hey, {this.state.firstname}</p>
                        </Link>
                    </div> */}
                    <Route exact path="/details" component={Details} />
                </BrowserRouter>
            </div>
        );
    }
}
