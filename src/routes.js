const express = require('express')
const routes = express.Router()
const instructors = require('./app/controllers/instructors')
const members = require('./app/controllers/members')
const schedule = require('./app/controllers/schedule')
const plan = require('./app/controllers/plan')

routes.get('/', function (req, res) {
    return res.render('home/index')
})

routes.post('/login', function (req, res) {
    return res.render('home/login')
})

routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.create)
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.post('/instructors', instructors.post)
routes.put('/instructors', instructors.put)
routes.delete('/instructors', instructors.delete)

routes.get('/members', members.index)
routes.get('/members/create', members.create)
routes.get('/members/:id', members.show)
routes.get('/members/:id/edit', members.edit)
routes.post('/members', members.post)
routes.put('/members', members.put)
routes.delete('/members', members.delete)

routes.get('/schedule', schedule.index)
routes.get('/schedule/create', schedule.create)
routes.get('/schedule/:id', schedule.show)
routes.get('/schedule/:id/edit', schedule.edit)
routes.post('/schedule', schedule.post)
routes.put('/schedule', schedule.put)
routes.delete('/schedule', schedule.delete)

routes.get('/plan', plan.index)
routes.get('/plan/create', plan.create)
routes.get('/plan/:id', plan.show)
routes.get('/plan/:id/edit', plan.edit)
routes.post('/plan', plan.post)
routes.put('/plan', plan.put)
routes.delete('/plan', plan.delete)

module.exports = routes