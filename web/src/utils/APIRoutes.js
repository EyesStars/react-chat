// 配置api默认端口
export const host = 'http://localhost:6006';

// 注册接口
export const registerRoute = `${host}/api/auth/register`;

// 登录接口
export const loginRoute = `${host}/api/auth/login`;

// 设置用户头像
export const setAvatarRoute = `${host}/api/auth/setAvatar`;

// 获取用户列表
export const allUsersRoute = `${host}/api/auth/allusers`;

// 添加聊天信息
export const sendMessagesRoute = `${host}/api/messages/addmsg`;

// 获取用户聊天
export const getAllMessagesRoute = `${host}/api/messages/getmsg`;