
const express= require('express');
const { authenticate, getAll, getById, update } = require('./user.service');
const router= express.Router();
const userService= require('./user.service');

router.post('/authenticate',authenticate);
router.post('/register',register);
router.get('/',getAll);
//router.get('/current',getCurrent);
router.get('/:id',getById);
router.put('/:id',update);
//router.delete('/:id',_delete);

module.exports=router;

 function authenticateUser(req,res,next){
     userService.authenticate(req.body)
            .then(user => user ? res.json(user): res.status (400).json({message: 'username or password is incorrect'}))
            .catch(err => next(err));
}

function register (req,res,next){
    userService.create(req.body)
           .then(() => res.json({}))
           .catch(err => next(err));
}
<<<<<<< HEAD
function getAllUsers (req,res,next){
=======

function getAll (req,res,next){
>>>>>>> d3d5253aabf0d1031a87cccb363248644e052233
    userService.getAll(req.body)
           .then(users => res.json(users))
           .catch(err => next(err));
}
<<<<<<< HEAD
function getCurrentUser (req,res,next){
=======

function getCurrent (req,res,next){
>>>>>>> d3d5253aabf0d1031a87cccb363248644e052233
    userService.getById(req.user.sub)
           .then(user =>  user ? res.json(user): res.sendStatus(404))
           .catch(err => next(err));
}

function getUserById (req,res,next){
    userService.getById(req.params.id)
           .then(user =>  user ? res.json(user): res.sendStatus(404))
           .catch(err => next(err));
}

function updateUser (req,res,next){
    userService.update(req.params.id, req.body)
           .then(()=> res.json())
           .catch(err => next(err));
}

function _deleteUser(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}



