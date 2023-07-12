const router = require("express").Router();

const { addMessage, getAllMessage } = require('../controllers/messagesController');

// 添加聊天信息
router.post('/addmsg', addMessage);

// 获取聊天信息
router.post('/getmsg', getAllMessage);


module.exports = router;