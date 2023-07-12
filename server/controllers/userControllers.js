const User = require('../model/userModel');

const bcrypt = require('bcrypt');

// 注册
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // 校验用户名
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: '用户名已被使用', status: false })
    }
    // 校验邮箱
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: '邮箱已被注册', status: false })
    }
    // bcrypt 密码 加盐 加密
    const hashedPassword = await bcrypt.hash(password, 10);
    // 插入数据
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })
    delete user.password;
    return res.json({ status: true, user })
  } catch (err) {
    next(err)
  }
};

// 登录
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // 校验用户名
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: '用户名或密码错误', status: false })
    }
    // bcrypt 密码 加盐 加密
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ msg: '用户名或密码错误', status: false })
    }
    delete user.password;

    return res.json({ status: true, user })
  } catch (err) {
    next(err)
  }
}

// 设置用户头像
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage
    })
    return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })
  } catch (err) {
    next(err)
  }
}

// 获取用户列表
module.exports.getAllusers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'username',
      'avatarImage',
      '_id'
    ]);
    res.json(users)
  } catch (err) {
    next(err)
  }
}

