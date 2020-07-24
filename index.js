const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./bc.js");
const {
    insertingUserDetails,
    gettingPassword,
    insertingTravelDetails,
} = require("./db.js");

//==============================middleware=====================================================================//

app.use(compression());
app.use(express.static(__dirname + "/public"));

//======cookie session middleware=================================//

app.use(
    cookieSession({
        secret: `Ì am always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        //to set the cookies-how long we want cookie to last
    })
);

/* const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
}); */
//======cookie session middleware=================================//

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json());

/* app.use(csurf());
app.use((req, res, next) => {
    res.setHeader("x-frame-option", "deny");
    res.locals.csrfToken = req.csrfToken(); //////for csurf
    next();
}); */

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//==============================middleware=====================================================================//

//for welcome page-------------------------------
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        // if the user is logged in...
        res.redirect("/");
    } else {
        // the user is NOT logged in...
        res.sendFile(__dirname + "/index.html");
    }
});

//for registration page-------------------------------
app.post("/registration", (req, res) => {
    if (
        req.body.firstname != "" &&
        req.body.lastname != "" &&
        req.body.email != "" &&
        req.body.password != ""
    ) {
        hash(req.body.password)
            .then((hashedPass) => {
                console.log("MY HASHED PASSWORD: ", hashedPass);
                insertingUserDetails(
                    req.body.firstname,
                    req.body.lastname,
                    req.body.email,
                    hashedPass
                )
                    .then((results) => {
                        console.log(
                            "MY REQ:BODY IN POST REGISTRATION: ",
                            req.body
                        );
                        console.log(
                            "MY RESULTS IN POST REGISTRATION: ",
                            results
                        );
                        console.log("req.session: ", req.session);
                        req.session.userId = results.rows[0].id;
                        req.session.permission = true;
                        console.log(
                            "REQ.SESSION AFTER SET VALUE: ",
                            req.session
                        );
                        res.json();
                    })
                    .catch((err) => {
                        console.log("MY POST REGISTRATION ERROR : ", err);
                        res.json();
                    });
            })
            .catch((err) => {
                console.log("MY POST REGISTRATION ERROR 1: ", err);
            });
    } else {
        res.json({ error: true });
    }
});

app.get("/login", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/registration");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/login", (req, res) => {
    console.log("THIS IS MY REQ.BODY IN POST LOGIN: ", req.body);
    console.log("THIS IS MY REQ.SESSION IN POST LOGIN: ", req.session.userId);
    //here we are getting the password from the register page and matching it here to see if it is the same
    gettingPassword(req.body.email)
        .then((results) => {
            console.log("my login results: ", results);
            console.log("req.body.email in login : ", req.body.email);
            console.log("this is my 0 pass: ", results.rows[0].password);
            console.log("req.body.password in login: ", req.body.password);
            compare(req.body.password, results.rows[0].password)
                .then((match) => {
                    if (match) {
                        req.session.userId = results.rows[0].id;

                        if (!results.rows[0]) {
                            res.json();
                        } else {
                            res.json("Login Successful");
                        }
                    } else {
                        console.log("it is not equal: ", match);
                        res.json();
                    }
                })
                .catch((err) => {
                    console.log("my post login error: ", err);
                    res.json();
                });
        })
        .catch((err) => {
            console.log("my post login error 2: ", err);
            res.json();
        });
});

app.post("/details", (req, res) => {
    if (req.session.userId) {
        insertingTravelDetails(
            req.body.nationality,
            req.body.dep_date,
            req.body.dep_time,
            req.body.arr_date,
            req.body.arr_time,
            req.body.flight_name,
            req.body.flight_number,
            req.body.seat_number,
            req.body.arr_place
        )
            .then((results) => {
                console.log("MY REQ:BODY IN POST REGISTRATION: ", req.body);
                console.log("MY RESULTS IN POST REGISTRATION: ", results);
                console.log("req.session: ", req.session);

                res.json(results.rows[0]);
            })
            .catch((err) => {
                console.log("MY POST REGISTRATION ERROR : ", err);
                res.json();
            });
    } else {
        res.json({ error: true });
    }
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
