const mongoose = require("mongoose");

const supervisorSelection = new mongoose.Schema({
  groupID: {
    type: String,
    required: true,
  },
  supervisorID: {
    type: String,
    required: true,
  },
  co_supervisorID: {
    type: String,
    required: false,
  },
  topic: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    //required: true,
  },
  remarks: {
    type: String,
    //required: true,
  },
});

module.exports = mongoose.model("supervisor.selection", supervisorSelection);
