const Chat = require("../models/chat.model");

//Get all chat data
const findAll = async (id) => {
  const chats = await Chat.find({ groupId: id });
  return chats;
};

//
const findByPagination = async (req, res) => {
  const _pageNumber = parseInt(req.params.page);
  const _pageSize = parseInt(req.params.pageSize);
  const client_id = 1;
  console.log(_pageSize);

  Chat.countDocuments({ client_id: client_id }, function (err, count) {
    Chat.find({ client_id: client_id }, null, { sort: { createdAt: -1 } })
      .skip(_pageNumber > 0 ? (_pageNumber - 1) * _pageSize : 0)
      .limit(_pageSize)
      .exec(function (err, docs) {
        if (err) res.json(err);
        else
          res.json({
            Total: count,
            _Data: docs,
          });
      });
  });
};

//
const findById = async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  res.send(chat);
};

//Store chat details
const store = async (data) => {
  const chat = new Chat(data);
  chat.createdAt = Date.now().toString();
  await chat.save();
  return chat;
};

//
const update = async (req, res) => {
  const id = req.params.id;
  let chat = await Chat.findById(id);
  if (chat) {
    await Chat.updateOne(
      { _id: req.params.id },
      { ...req.body, updatedAt: Date.now().toString() }
    );
    chat.save();
    res.send(chat);
  }

  //    throw new NotFound("chat not found by the id: " + id);
};

//
const destroyAll = async () => {
  try {
    await Chat.deleteMany({});
  } catch (e) {
    throw new NotFound("Chat not found ", e);
  }
};

//
const destroy = async (req, res) => {
  let chat = await Chat.findById(req.params.id);
  if (chat) {
    let result = await Chat.deleteOne({ _id: req.params.id });
    res.send(chat);
  }

  throw new NotFound("Chat not found by the id: " + req.params.id);
};

module.exports = {
  findAll,
  findByPagination,
  findById,
  store,
  update,
  destroyAll,
  destroy,
};
