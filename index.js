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
    flightData,
    searchPeople,
    listOfTravelers,
    getLastTenMessages,
    insertNewMessage,
    getMessageInformation,
    deleteAccount,
} = require("./db.js");

//======socket boilerplate=================================//
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080",
});
//======socket boilerplate=================================//

//==============================middleware=====================================================================//

app.use(compression());
app.use(express.static(__dirname + "/public"));

//======cookie session middleware=================================//

/* app.use(
    cookieSession({
        secret: `Ì am always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        //to set the cookies-how long we want cookie to last
    })
); */

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
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
            req.session.userId,
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

                if (results.rows[0].user_id) {
                    res.json(results.rows[0]);
                } else {
                    res.redirect("/details");
                }
            })
            .catch((err) => {
                console.log("MY POST REGISTRATION ERROR : ", err);
                res.json();
            });
    } else {
        res.json({ error: true });
    }
});

app.get("/flightdata", (req, res) => {
    if (req.session.userId) {
        flightData(req.session.userId)
            .then((results) => {
                console.log("MY RESULTS IN GET FLIGHTDATA: ", results);
                res.json(results.rows);
            })
            .catch((err) => {
                console.log("MY GET FLIGHTDATA ERROR : ", err);
            });
    } else {
        res.relocate("/login");
    }
});

app.get("/api/searchpeople", (req, res) => {
    let val = req.query.searchName;
    console.log("query is ", req.query.searchName);
    searchPeople(val)
        .then((results) => {
            console.log(
                "my result in index.js in get search people: ",
                results
            );
            res.json(results.rows);
            console.log("my results.rows: ", results.rows);
        })
        .catch((err) => {
            console.log("This is my search people err: ", err);
        });
});

app.get("/list", (req, res) => {
    listOfTravelers()
        .then((results) => {
            console.log(
                "my result in index.js in get list of  people: ",
                results
            );
            res.json(results.rows);
            console.log("my results.rows: ", results.rows);
        })
        .catch((err) => {
            console.log("This is my get list of people err: ", err);
        });
});

app.get("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
});

app.post("/deleteAccount", (req, res) => {
    console.log("hit delete acc");
    deleteAccount(req.session.userId).then(() => {
        req.session.userId = null;
        res.json({ success: true });
    });
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function () {
    console.log("I'm listening.");
});

io.on("connection", function (socket) {
    console.log(`Socket id ${socket.id} is now connected`);

    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;

    getLastTenMessages().then((results) => {
        console.log("my results in socket.io: ", results.rows);
        io.sockets.emit("chatMessages", results.rows.reverse());
        console.log("last 10 messages : ", results.rows);
    });

    socket.on("My amazing chat message", (newMessage) => {
        console.log("this is coming from chat.js:", newMessage);
        console.log("user who sent newMessage is :", userId);

        insertNewMessage(userId, newMessage).then((results) => {
            console.log("Messages sent to chatBox ", results.rows[0]);
            getMessageInformation(userId).then((results) => {
                console.log("SENDER: ", results.rows[0]);
                io.sockets.emit("chatMessage", results.rows[0]);
            });
        });
    });
});
