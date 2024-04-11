/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2024-04-12 01:15:03
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-04-12 01:15:14
 * @FilePath: \collegeApplication\src\assets\js\utils\escapeParams.js
 * @Description: 转义处理工具js
 */
function escapeParams(params) {
  // 如果参数是对象类型，则对每个属性进行转义处理
  if (typeof params === 'object' && params !== null) {
    const escapedParams = {};
    for (const key in params) {
      if (Object.hasOwnProperty.call(params, key)) {
        escapedParams[key] = escapeParams(params[key]);
      }
    }
    return escapedParams;
  } else if (typeof params === 'string') {
    // 如果参数是字符串类型，则使用 encodeURIComponent 进行转义处理
    return encodeURIComponent(params);
  } else {
    // 其他类型的参数，不需要转义处理
    return params;
  }
}
export { escapeParams };