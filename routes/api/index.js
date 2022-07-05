const router = require('express').Router();
const ThoughtRoutes = require('./thoughts-routes');
const UsersRoutes = require('./users-routes');

router.use('/thoughts', ThoughtRoutes);
router.use('/users', UsersRoutes);



module.exports = router; 