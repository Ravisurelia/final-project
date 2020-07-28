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
        WHERE user_id = users.id AND first ILIKE $1 or last ILIKE $1;`,
        [val + "%"]
    );
};
exports.listOfTravelers = () => {
    return db.query(
        `SELECT  first, last, nationality, dep_date, dep_time, arr_date, arr_time, flight_name, flight_number, seat_number,arr_place, travelers.created_at
        FROM users, travelers
        WHERE user_id = users.id;`
    );
};

exports.getLastTenMessages = () => {
    return db.query(
        `
        SELECT users.id, chats.id AS message_id, first, last, message,  chats.created_at
        FROM chats
        JOIN users ON (sender_id = users.id)
        ORDER BY chats.created_at DESC
        LIMIT  10`
    );
};

exports.insertNewMessage = (id, message) => {
    return db.query(
        `
    INSERT INTO chats (sender_id, message) VALUES($1, $2) RETURNING *
    `,
        [id, message]
    );
};

exports.getMessageInformation = (id) => {
    return db.query(
        `
        SELECT users.id, chats.id AS message_id, first, last, message,  chats.created_at
        FROM chats
        JOIN users ON (sender_id = users.id AND sender_id = $1)
        ORDER BY chats.created_at DESC
        LIMIT  10`,
        [id]
    );
};

exports.deleteAccount = (id) => {
    return db.query(`DELETE FROM users, travelers WHERE (id = $1)`, [id]);
};

exports.editDetails = (
    id,
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
        `UPDATE travelers SET
        nationality=$2,
        dep_date=$3,
        dep_time=$4,
        arr_date=$5,
        arr_time=$6,
        flight_name=$7,
        flight_number=$8,
        seat_number=$9,
        arr_place=$10 
        WHERE travelers.user_id = $1`,
        [
            id,
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

exports.gettingDetails = (id) => {
    return db.query(`SELECT * FROM travelers WHERE user_id=$1`, [id]);
};
