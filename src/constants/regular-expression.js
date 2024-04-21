// 正则表达式

// 手机
export const PHONE_TEST = /^(?:\+86|0086)?1[3456789]\d{9}$/;
// 身份证
export const IDENTITY_TEST = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 密码
export const PASSWORD_TEST = /^[@#$%^&+=a-zA-Z0-9]{6,16}$/;
//修改密码
export const PASSWORD_TEST2 = /^[@#$%^&+=a-zA-Z0-9]{6,16}$/;
// 账号
export const ACCOUNT_TEST = /^[@#$%^&+=a-zA-Z0-9]{6,16}$/;
// 姓名
export const NAME_TEST = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/;
// 班级姓名
export const CLASS_NAME_TEST = /^[\u4e00-\u9fa50-9]{5,20}$/;
//搜索框
export const KEYWORD = /^(?:[\u4e00-\u9fa50-9]|""|null|$)+$/;
//学号
export const USERNUMBER = /[0-9]{2,16}$/;
