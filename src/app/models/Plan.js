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
        db.query(`SELECT id, name FROM plan`, function (err, results) {
            if (err) throw `Database error 2! ${err}`
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO plan (
            name,
            duration,
            details,
            price
        ) VALUES ($1, $2, $3, $4)
        RETURNING id
    `

        const values = [
            data.name,
            data.duration,
            data.details,
            data.price
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database error 3! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE plan SET
            name=($1),
            duration=($2),
            details=($3),
            price=($4)
        WHERE id = $5
        `

        const values = [
            data.name,
            data.duration,
            data.details,
            data.price,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database error 5! ${err}`

            callback()
        })
    },
    find(id, callback) {
        db.query(`
            SELECT *
            FROM plan
            WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM plan WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database error 6! ${err}`

            callback()
        })
    },
    paginate(params) {
        let { filter, limit, offset, callback } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
            SELECT count(*) FROM plan
        ) As total`

        if (filter) {
            filterQuery = `
            WHERE plan.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM plan
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT plan.*, ${totalQuery}
        FROM plan
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