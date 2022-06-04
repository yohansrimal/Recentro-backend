const supervisorRequest = require("../models/research.topic.model");
const Group = require("../models/student.groups.model");

//Create supervisor request with related group & topic
exports.requestSupervisor = async (req, res) => {
  const { groupID, supervisorID, topic } = req.body;

  const reqSupervisor = new supervisorRequest();
  reqSupervisor.groupID = groupID;
  reqSupervisor.supervisorID = supervisorID;
  reqSupervisor.topic = topic;

  await reqSupervisor.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      data: reqSupervisor.groupID, //return the topic id
    });
  });
};

//
