const express = require("express")
const route = express.Router()
const studentController = require("../controller/studentController")
const assignmentController = require("../controller/assignmentController")
const auth = require("../middleware/auth")


route.post("/register",studentController.createStudent)
route.post("/login",studentController.loginStudent)
route.get("/get",studentController.getAllStudents)
route.post("/assignments/:studentId",assignmentController.assignment)
route.get("/getagg",studentController.aggregateStudents)
route.delete("/delete",studentController.deletestudents)
route.get("/getassignment",assignmentController.getassignment)
route.delete("/deleteasm",assignmentController.deleteassignment)



module.exports = route