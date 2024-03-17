/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2024-03-15 19:07:05
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-15 19:07:10
 * @FilePath: \collegeApplication\src\assets\js\utils\month.js
 * @Description: 月份转换
 */
export function getMonthName(monthNumber) {
  const monthEnum = {
    0: '本月',
    1: '一月',
    2: '二月',
    3: '三月',
    4: '四月',
    5: '五月',
    6: '六月',
    7: '七月',
    8: '八月',
    9: '九月',
    10: '十月',
    11: '十一月',
    12: '十二月'
  };

  return monthEnum[monthNumber] || '未知月份';
}