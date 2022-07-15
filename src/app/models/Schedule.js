const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`
        SELECT * 
        FROM schedule
        ORDER BY name ASC`, function (err, results) {
            if (err) throw `Database error 1! ${err}`

            callback(results.rows)
        })
    },
    instructorsSelectOptions(callback) {
        db.query(`SELECT id, name FROM instructors`, function (err, results) {
            if (err) throw `Database error 2! ${err}`
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO schedule (
            name,
            schedulepic_url,
            class_datetime,
            instructor_id
        ) VALUES ($1, $2, $3, $4)
        RETURNING id
    `

        const values = [
            data.name,
            data.avatar_url,
            date(data.class_datetime).iso,
            data.instructor
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database error 3! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`
            SELECT schedule.*, instructors.name AS instructor_name
            FROM schedule
            LEFT JOIN instructors ON (instructors.id = schedule.instructor_id)
            WHERE schedule.id = $1`, [id], function (err, results) {
            if (err) throw `Database error 4! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE schedule SET
            name=($1),
            schedulepic_url=($2),
            class_datetime=($3),
            instructor_id=($4)
        WHERE id = $5
        `

        const values = [
            data.name,
            data.avatar_url,
            date(data.class_datetime).iso,
            data.instructor,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database error 5! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM schedule WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database error 6! ${err}`

            callback()
        })
    },
    paginate(params) {
        let { filter, limit, offset, callback } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
            SELECT count(*) FROM schedule
        ) As total`

        if (filter) {
            filterQuery = `
            WHERE schedule.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM schedule
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT schedule.*, ${totalQuery}
        FROM schedule
        ${filterQuery}
        ORDER BY name ASC
        LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function (err, results) {
            if (err) throw `Database error 7! ${err}`

            callback(results.rows)
        })
    }
}