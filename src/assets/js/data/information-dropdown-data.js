// 信息的下拉框数据

import { reactive } from "vue";
// 政治面貌
const politicsStatusList = reactive([
  "中共党员",
  "中共预备党员",
  "共青团员",
  "群众",
]);
// 民族
const nationList = reactive([
  {
    value: "汉族",
  },
  {
    value: "壮族",
  },
  {
    value: "回族",
  },
  {
    value: "满族",
  },
  {
    value: "维吾尔族",
  },
  {
    value: "苗族",
  },
  {
    value: "彝族",
  },
  {
    value: "土家族",
  },
  {
    value: "藏族",
  },
  {
    value: "蒙古族",
  },
  {
    value: "侗族",
  },
  {
    value: "布依族",
  },
  {
    value: "瑶族",
  },
  {
    value: "白族",
  },
  {
    value: "朝鲜族",
  },
  {
    value: "哈尼族",
  },
  {
    value: "哈萨克族",
  },
  {
    value: "黎族",
  },
  {
    value: "傣族",
  },
  {
    value: "畲族",
  },
  {
    value: "傈僳族",
  },
  {
    value: "东乡族",
  },
  {
    value: "仡佬族",
  },
  {
    value: "拉祜族",
  },
  {
    value: "佤族",
  },
  {
    value: "水族",
  },
  {
    value: "纳西族",
  },
  {
    value: "羌族",
  },
  {
    value: "土族",
  },
  {
    value: "仫佬族",
  },
  {
    value: "锡伯族",
  },
  {
    value: "柯尔克孜族",
  },
  {
    value: "景颇族",
  },
  {
    value: "达斡尔族",
  },
  {
    value: "撒拉族",
  },
  {
    value: "布朗族",
  },
  {
    value: "毛南族",
  },
  {
    value: "塔吉克族",
  },
  {
    value: "普米族",
  },
  {
    value: "阿昌族",
  },
  {
    value: "怒族",
  },
  {
    value: "鄂温克族",
  },
  {
    value: "京族",
  },
  {
    value: "基诺族",
  },
  {
    value: "德昂族",
  },
  {
    value: "保安族",
  },
  {
    value: "俄罗斯族",
  },
  {
    value: "裕固族",
  },
  {
    value: "乌孜别克族",
  },
  {
    value: "门巴族",
  },
  {
    value: "鄂伦春族",
  },
  {
    value: "独龙族",
  },
  {
    value: "赫哲族",
  },
  {
    value: "高山族",
  },
  {
    value: "珞巴族",
  },
  {
    value: "塔塔尔族",
  },
  {
    value: "穿青人",
  },
]);
// 考试科目
const subjectList = ["物理", "化学", "生物", "历史", "地理", "政治"];
export { nationList, politicsStatusList,subjectList };
