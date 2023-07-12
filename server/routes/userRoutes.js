const router = require("express").Router();

const { register, login, setAvatar, getAllusers } = require('../controllers/userControllers');


// 注册
router.post('/register', register);

// 登录
router.post('/login', login);

// 设置用户头像
router.post('/setAvatar/:id', setAvatar);

// 获取用户列表
router.get('/allusers/:id', getAllusers);

module.exports = router;