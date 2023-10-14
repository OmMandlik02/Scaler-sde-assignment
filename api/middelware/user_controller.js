const student_db = require('../models/student');
const mentor_name = require('../models/mentor')
const mailer = require('../Mailers/Student')
module.exports.addStudent = async function (req, res) {
    let mentor_detail = await mentor_name.findById(req.query.mentor_id);
    console.log(req.body)
    if (mentor_detail) {
        if (mentor_detail.students.length <= 4) {
            let student = await student_db.create({
                name: req.body.name,
                mentor: req.query.mentor_id,
                email: req.body.email
                // Ideation: req.body.idea_marks || undefined,
                // Execution: req.body.excute_marks || undefined,
                // viva: req.body.viva_marks || undefined,
            });
            let men = await mentor_name.findByIdAndUpdate(mentor_detail.id, { $push: { students: student.id } });
            return res.status(200).json({
                message: 'Student added sucessfully',
                data: student
            })
        } else {
            return res.json({
                "message": "Only 4 students can be added"
            })
        }
    }
}

module.exports.editMarks = async function (req, res) {
    let student = await student_db.findById(req.body.id);

    if (student && student.editable) {
        console.log(req.body)
        await student_db.findByIdAndUpdate(req.query.id, {
            name: req.body.name ? req.body.name : student.name,
            email: req.body.email && req.body.email != "" ? req.body.email : student.email,
            Ideation: req.body.Ideation ? req.body.Ideation : student.Ideation,
            Execution: req.body.Execution ? req.body.Execution : student.Execution,
            Viva: req.body.Viva ? req.body.Viva : student.Viva
        });
        return res.status(200).json({
            "status": "Success",
            "message": "Marks added sucessFully"
        })
    }
}
module.exports.editStudent = async function (req, res) {
    let student = await student_db.findById(req.query.id);
    if (student && student.editable) {
        await student_db.findByIdAndUpdate(req.query.id, {
            name: req.body.name ? req.body.name : student.name,
            email: req.body.email && req.body.email != "" ? req.body.email : student.email,
            Ideation: req.body.idea_marks ? req.body.idea_marks : student.Ideation,
            Execution: req.body.execute_marks ? req.body.execute_marks : student.Execution,
            Viva: req.body.Viva_marks ? req.body.viva_marks : student.Viva
        });
        return res.status(200).json({
            status: "Success",
            message: "Student details updated successfully"
        })
    }
}

module.exports.removeStudent = async function (req, res) {
    let student = await student_db.findById(req.query.id);
    console.log(student)
    if (student && student.editable) {

        await student_db.findByIdAndDelete(req.query.id);
        await mentor_name.findByIdAndUpdate(student.mentor, { $pull: { students: req.query.id } });

        return res.status(200).json({
            status: "Success",
            message: "Student removed successfully"
        })
    }
}

module.exports.lock = async function (req, res) {

    let students = await student_db.find({ mentor: req.query.mentor_id });

    students.map(element => {
        if (!element.Ideation || !element.Viva || !element.Execution) {
            return res.status(200).json({
                "message": " Marks are not assigned or either less than three members are in classroom",
                "locked": false
            })
        }
    })
    await student_db.updateMany({ mentor: req.query.mentor_id }, { $set: { editable: false } })
    // console.log(students)
    students.map(element => {
        mailer.newComment(element);
    })
    return res.status(200).json({
        "message": "Locked and mail sent successfully to all students",
        "locked": true
    })
}

module.exports.addMentor = async function (req, res) {
    await mentor_name.create({
        name: req.body.name,
        userName: req.body.userName
    })
    return res.status(200).json({
        status: "Success",
        message: "Mentor added successfully"
    })
}

module.exports.fetchStudent = async function (req, res) {
    let students = await student_db.find({ mentor: req.query.mentor_id })
    return res.status(200).json({
        data: students
    })
}