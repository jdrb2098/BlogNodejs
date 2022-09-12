const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')
const postServices = require('../posts/posts.http')

router.route('/') //* /api/v1/users/
    .get(userServices.getAll)
    .post(userServices.register)

router.route('/me')
    .put(passport.authenticate('jwt',{session: false}) ,userServices.editMyUser)
    .get(passport.authenticate('jwt',{session: false}) ,userServices.getMyUser)
    .delete(passport.authenticate('jwt',{session: false}) ,userServices.removeMyUser)

router.route('/:id')
    .get(userServices.getById)
    .delete(userServices.remove)
    .put(userServices.edit)

router.route('/me/posts')
    .get(passport.authenticate('jwt', {session: false}), postServices.getByUserId)

router.route('/me/posts/:id')
    .get(passport.authenticate('jwt', {session: false}), postServices.getByIdLogged)
    .put(passport.authenticate('jwt', {session: false}), postServices.edit)
    .delete(passport.authenticate('jwt', {session: false}), postServices.remove)

exports.router = router