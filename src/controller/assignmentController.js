const AssignmentModel = require("../model/assignmentModel");
const StudentModel = require("../model/studentModel");
const validation = require("../validation/validator")

const assignment = async function(req, res) {
  try {
    const { title, description } = req.body;
    const { studentId } = req.params;


    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    

    if(!title){
      return res.status(400).send({status:false,msg:"title is mendatory"})
  }
  if (!validation.isValidTitle(title)) return res.status(400).send({ status: false, message: "title is not valid" })
    if(!description){
      return res.status(400).send({status:false,msg:"description is mendatory"})
  }
    
    const assignment = new AssignmentModel({
      title,
      description,
      student_id: studentId,
    });

    const savedAssignment = await assignment.save();
    res.json(savedAssignment);
  } catch (err) {
    // Log the error to a file or a monitoring service instead of console.error
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getassignment = async function(req, res) {
  try {
    const assignment = await AssignmentModel.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "Student"
        }
      },
    
    ]);
    res.status(200).send({ assignment });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Server error!" });
  }
}


const deleteassignment = async function(req,res){
  try{
  await AssignmentModel.deleteMany({})
  return res.status(200).send({msg:"deleted"})
  }catch(error){
    console.log(error);
    return res.status(500).send({error:"server error"})
  }
}

module.exports = { assignment, getassignment, deleteassignment };