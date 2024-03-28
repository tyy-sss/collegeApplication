import { formatDate } from "@/assets/js/utils/format-date";

// 当前年的信息
export const NOW_YEAR = formatDate(new Date()).slice(0, 4);
// 指定年的信息
export const getYearNews = (date) => {
  return formatDate(date).slice(0, 4);
};
// 获得所有的时间消息
export const getAllTimeNews = (date) => {
  return formatDate(date);
}