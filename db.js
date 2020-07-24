const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUser, dbPass } = require("./secrets.json");
    //console.log(dbUser, dbPass);
    db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/yatra`);
}

exports.insertingUserDetails = (firstname, lastname, email, password) => {
    //inserting user data first, last, email, password
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [firstname, lastname, email, password]
    );
};

exports.gettingPassword = (email) => {
    //password and id to email
    return db.query("SELECT password, id FROM users WHERE email = $1", [email]);
};

exports.insertingTravelDetails = (
    nationality,
    dep_date,
    dep_time,
    arr_date,
    arr_time,
    flight_name,
    flight_number,
    seat_number,
    arr_place
) => {
    return db.query(
        `INSERT INTO travelers (
        nationality,
        dep_date,
        dep_time,
        arr_date,
        arr_time,
        flight_name,
        flight_number,
        seat_number,
        arr_place) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
            nationality,
            dep_date,
            dep_time,
            arr_date,
            arr_time,
            flight_name,
            flight_number,
            seat_number,
            arr_place,
        ]
    );
};
