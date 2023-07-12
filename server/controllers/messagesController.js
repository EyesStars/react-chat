
const messagesModel = require('../model/messagesModel');

// 添加聊天信息
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messagesModel.create({
      message: { text: message },
      users: [from, to],
      sender: from
    });
    if (data) {
      // return res.json({ msg: '消息添加成功' });
      return;
    }
    // return res.json({ msg: '消息添加失败' });
    return;
  } catch (err) {
    next(err);
  }
};

// 获取聊天信息
module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    // console.log('req.body ==> ', req.body);
    const messages = await messagesModel.find({
      users: {
        $all: [from, to]
      },
    }).sort({ updatedAt: 1 });
    // console.log('messages ==> ', messages);
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message:msg.message.text
      }
    })
    res.json(projectMessages);
  } catch (err) {
    next(err)
  }
};