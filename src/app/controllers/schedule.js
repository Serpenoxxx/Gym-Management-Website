const { age, date } = require('../../lib/utils')
const Schedule = require('../models/Schedule')

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(schedule) {
                const pagination = {}

                if (schedule.length == 0) {
                    pagination.total = 1
                    pagination.page = page
                } else {
                    pagination.total = Math.ceil(schedule[0].total / limit)
                    pagination.page = page
                }

                return res.render('schedule/index', { schedule, filter, pagination })
            }
        }

        Schedule.paginate(params)
    },
    create(req, res) {
        Schedule.instructorsSelectOptions(function (instructorsOptions) {
            return res.render('schedule/create', { instructorsOptions })
        })
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '')
                return res.send('Please, fill all fields')
        }

        Schedule.create(req.body, function (schedule) {
            return res.redirect(`/schedule/${schedule.id}`)
        })
    },
    show(req, res) {
        Schedule.find(req.params.id, function (schedule) {
            if (!schedule) res.send('Class not found!')

            return res.render('schedule/show', { schedule })
        })
    },
    edit(req, res) {
        Schedule.find(req.params.id, function (schedule) {
            if (!schedule) res.send('Class not found!')

            schedule.class_datetime = date(schedule.class_datetime).iso

            Schedule.instructorsSelectOptions(function (instructorsOptions) {
                return res.render('schedule/edit', { schedule, instructorsOptions })
            })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '')
                return res.send('Please, fill all fields')
        }

        Schedule.update(req.body, function () {
            return res.redirect(`/schedule/${req.body.id}`)
        })
    },
    delete(req, res) {
        Schedule.delete(req.body.id, function () {
            return res.redirect('/schedule')
        })
    }
}
