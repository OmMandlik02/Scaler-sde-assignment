const express = require('express');
const router = express.Router();
const userController = require('../middelware/user_controller');
router.post('/user/addStudent', userController.addStudent);
router.post('/user/editMarks', userController.editMarks);
router.put('/user/editStudent', userController.editStudent);
router.delete('/user/deleteStudent', userController.removeStudent)
router.get('/user/lockData', userController.lock);
router.get('/user/fetchStudents', userController.fetchStudent);
router.post('/user/mentorData', userController.addMentor)
module.exports = router;