const { age, date } = require('../../lib/utils')
const Plan = require('../models/Plan')

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
            callback(plan) {
                const pagination = {}

                if (plan.length == 0) {
                    pagination.total = 1
                    pagination.page = page
                } else {
                    pagination.total = Math.ceil(plan[0].total / limit)
                    pagination.page = page
                }

                return res.render('plan/index', { plan, filter, pagination })
            }
        }

        Plan.paginate(params)
    },
    create(req, res) {
        return res.render('plan/create')
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '')
                return res.send('Please, fill all fields')
        }

        Plan.create(req.body, function (plan) {
            return res.redirect(`/plan/${plan.id}`)
        })
    },
    show(req, res) {
        Plan.find(req.params.id, function (plan) {
            if (!plan) res.send('Class not found!')

            return res.render('plan/show', { plan })
        })
    },
    edit(req, res) {
        Plan.find(req.params.id, function (plan) {
            if (!plan) res.send('plan not found!')


            return res.render('plan/edit', { plan })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '')
                return res.send('Please, fill all fields')
        }

        Plan.update(req.body, function () {
            return res.redirect(`/plan/${req.body.id}`)
        })
    },
    delete(req, res) {
        Plan.delete(req.body.id, function () {
            return res.redirect('/plan')
        })
    }
}
