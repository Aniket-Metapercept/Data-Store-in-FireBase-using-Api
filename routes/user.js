const { getAllUser, createUser, getUserById, updateUserById, deleteUserById } = require('../controller/user')

const router = require('express').Router()

router.get('/',getAllUser)

router.get('/:id',getUserById)
router.post('/',createUser)
router.put('/:id',updateUserById)
router.delete('/:id',deleteUserById)


module.exports = router