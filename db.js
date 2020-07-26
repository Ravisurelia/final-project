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
    user_id,
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
            user_id,
        nationality,
        dep_date,
        dep_time,
        arr_date,
        arr_time,
        flight_name,
        flight_number,
        seat_number,
        arr_place) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
            user_id,
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

exports.flightData = (id) => {
    return db.query(
        `
    SELECT users.id, travelers.id AS  data_id, first, last, nationality, dep_date, dep_time, arr_date, arr_time, flight_name, flight_number, seat_number,arr_place, travelers.created_at
    FROM users
    JOIN travelers ON (user_id = users.id AND user_id = $1);`,
        [id]
    );
};

exports.searchPeople = (val) => {
    return db.query(
        `SELECT  first, last, nationality, dep_date, dep_time, arr_date, arr_time, flight_name, flight_number, seat_number,arr_place, travelers.created_at
        FROM users, travelers
        WHERE user_id = users.id AND first ILIKE $1 or last ILIKE $1 or flight_number ILike $1;`,
        [val + "%"]
    );
};
