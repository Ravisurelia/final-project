import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export default function Welcome() {
    return (
        <div className="welcome_main">
            <div className="welcome-nav">
                <img src="yds-logo.png" className="main-logo"></img>
                <h1 className="yatra-font">YOGI DIVINE SOCIETY - Yatra</h1>
            </div>
            <div className="welcome_info">
                <img src="plane.png" className="main-logo1"></img>
                <h2 className="slogan">We Travel As One!</h2>
                {/*                 <h2 className="slogan">Love, Care & Travel</h2>
                 */}{" "}
            </div>

            {/* <section><Registration /></section> */}
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    {/*<Route path="/resetpass" component={ResetPassword} /> */}
                </div>
            </HashRouter>
        </div>
    );
}
