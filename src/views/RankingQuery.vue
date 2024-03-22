<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:48:59
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-21 21:30:30
 * @FilePath: \collegeApplication\src\views\RankingQuery.vue
 * @Description: 学生查询排名页面
-->
<template>
  <div class="show-container">
    <div class="title"><div class="text">查询排名</div></div>
    <hr />
    <div class="box">
      <!-- 综合排名 -->
      <div style="margin-bottom: 1rem">
        <h3>1️⃣综合排名</h3>
        <br />
        <div>
          <el-table :data="data.numTable" style="width: 100%">
            <el-table-column prop="type" label="排名类型" />
            <el-table-column label="排名结果">
              <el-table-column prop="ranking" label="我的排名 /名" />
              <el-table-column prop="rankings" label="排名总人数 /人" />
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 查询延保同—个专业的排名 -->
      <div>
        <h3>2️⃣查询延保同—个专业的排名</h3>
        <br />
        <div>
          <h4>确认批次</h4>
          <br />
          <div style="color: gray; margin-bottom: 8px">
            💬查询排名的依据为流程已结束的预填报批次情况，请根据时间选择参考的填报批次。
          </div>
          <span>确认批次： </span>
          <div class="searchBox">
            <el-select
              v-model="data.preWishId"
              class="m-2"
              placeholder="请选择预填报批次"
              size="large"
              style="width: 13rem; margin-right: 1rem"
            >
              <el-option
                v-for="item in data.preWishList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <h4>查询条件</h4>
        <br />
        <div class="condition">
          <!-- 考生学校 -->
          <div class="item">
            <div class="title">
              <span class="tip">目标学校 :</span>
            </div>
            <div class="condition_list">
              <div>
                <b>{{ data.schoolName }}</b>
              </div>
            </div>
          </div>
          <!-- 报考学院 -->
          <div class="item">
            <div class="title">
              <span class="tip">报考学院</span
              ><i
                ><el-icon><ArrowRight /></el-icon
              ></i>
            </div>
            <div class="condition_list">
              <div v-if="data.academy.length < 1">没有可选择的学院</div>
              <div
                v-for="(item, i) in data.academy"
                :key="i"
                :class="
                  item.name == data.curAcademy ? 'tag_item select' : 'tag_item'
                "
                @click="selectAcademy(item)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <!-- 报考专业 -->
          <div class="item">
            <div class="title">
              <span class="tip">报考专业</span
              ><i
                ><el-icon><ArrowRight /></el-icon
              ></i>
            </div>
            <div class="condition_list">
              <div v-if="data.majors.length < 1">请先选择报考学院</div>
              <div
                v-for="(item, i) in data.majors"
                :key="i"
                :class="
                  item.name == data.curMajor ? 'tag_item select' : 'tag_item'
                "
                @click="selectMajor(item)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <el-button class="search" @click="search">查询</el-button>
        <!-- 结果 -->
        <h4>查询结果</h4>
        <br />
        <div class="stack-line" v-loading.lock="data.loading">
          <div>
            <div class="gk-score">
              <em><span>查询条件</span> {{ data.curAcademy || "-" }} </em
              ><span> 学院</span> <em>{{ data.curMajor || "-" }} </em
              ><span> 专业 </span>
            </div>
            <hr />
            <div class="gk-rank">
              <div class="item">
                <span>我的排名</span>{{ data.ranking || "-" }} 名
              </div>
              <div class="item">
                <span>排名范围</span>共 {{ data.rankings || "-" }} 人
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import studentFun from "@/api/student";
import volunteerFun from "@/api/volunteer";
import { Search } from "@element-plus/icons-vue";
//数据
const data = reactive({
  loading: false,
  score: null, //填入分数
  ranking: null, //同分人数
  rankings: null, //排名区间
  curProvince: "湖南", //选择省份
  curAcademy: "", //选择学院
  curMajor: "", //选择专业
  curMajorId: "", //选择专业id
  schoolName: "吉首大学", //目标院校
  provinces: [
    { name: "北京" },
    { name: "天津" },
    { name: "河北" },
    { name: "山西" },
    { name: "内蒙古" },
    { name: "辽宁" },
    { name: "吉林" },
    { name: "黑龙江" },
    { name: "上海" },
    { name: "江苏" },
    { name: "浙江" },
    { name: "安徽" },
    { name: "福建" },
    { name: "江西" },
    { name: "山东" },
    { name: "河南" },
    { name: "湖北" },
    { name: "湖南" },
    { name: "广东" },
    { name: "广西" },
    { name: "海南" },
    { name: "重庆" },
    { name: "四川" },
    { name: "贵州" },
    { name: "云南" },
    { name: "陕西" },
    { name: "甘肃" },
    { name: "青海" },
    { name: "宁夏" },
  ], //省份列表
  academy: [
    { name: "软件学院" },
    { name: "医学院" },
    { name: "体育学院" },
    { name: "音乐学院" },
    { name: "文学院" },
    { name: "化学院" },
    { name: "旅游与管理学院" },
    { name: "美术学院" },
    { name: "农业学院" },
    { name: "马克思主义学院" },
    { name: "法学院" },
    { name: "传媒学院" },
    { name: "外国语学院" },
    { name: "信息工程学院" },
    { name: "化学与生物工程学院" },
    { name: "车辆工程学院" },
    { name: "经济与管理学院" },
    { name: "智能制造学院" },
  ], //学院列表
  majors: [
    // { name: "金融学" },
    // { name: "财政学" },
    // { name: "国际经济与贸易" },
    // { name: "法学" },
    // { name: "政治学与行政学" },
    // { name: "运动训练" },
    // { name: "汉语言文学" },
    // { name: "英语" },
    // { name: "数学与应用数学" },
    // { name: "历史学" },
    // { name: "信息与计算科学" },
    // { name: "化学" },
    // { name: "工程力学" },
    // { name: "机械设计制造及其自动化" },
    // { name: "车辆工程" },
  ], //专业列表
  allData: [], //学院专业选择数据
  loading: false,
  preWishId: null,
  preWishList: [
    // {
    //   value: "100001",
    //   label: "2016-05-04",
    // },
    // {
    //   value: "100002",
    //   label: "2016-05-01",
    // },
  ], //查询批次列表
  numTable: [
    {
      type: "年级排名",
      ranking: "",
      rankings: "",
    },
    {
      type: "班级排名",
      ranking: "",
      rankings: "",
    },
    {
      type: "同目标学校排名",
      ranking: "",
      rankings: "",
    },
  ],
});
//组件被挂载到 DOM 后立即调用的钩子函数
onMounted(() => {
  init();
});
//初始化
function init() {
  getVolunteerTable(); //查询志愿列表
  selectStudentMajor(); //查询可选择的学院专业
  getAllNum(); //查询综合排名
}
//查询可选专业
function selectStudentMajor() {
  volunteerFun.options.selectStudentMajor().then((res) => {
    data.allData = res;
    console.log("查询可选专业", data.allData);
    data.academy = res.map((item) => ({ name: item.college }));
  });
}
//查询预填报志愿列表
function getVolunteerTable() {
  volunteerFun.student.getWishTable().then((res) => {
    res.forEach((volunteer) => {
      if (volunteer.state === 2 && volunteer.type === false) {
        data.preWishList.push({
          value: volunteer.id,
          label: volunteer.startTime + "批次",
        });
      }
    });
  });
}
//格式化学院专业数据
function getMajorsByCollege(college) {
  const collegeData = data.allData.find((item) => item.college === college);
  if (collegeData) {
    return collegeData.majors;
  }
  return [];
}
//查询专业排名
function search() {
  console.log(
    `data.curAcademy=${data.curAcademy}, && data.curMajor=${data.curMajor},&&data.preWishId=${data.preWishId}`
  );
  if (data.curAcademy && data.curMajor && data.preWishId) {
    data.loading = true;
    //查询排名
    studentFun.rank
      .getMajorRanking({
        majorId: data.curMajorId,
        timeId: data.preWishId,
      })
      .then((res) => {
        console.log("查询排名结果", res);
        data.ranking = res.ranking;
        data.rankings = res.rankings;
        data.loading = false;
      });
    //模拟查询效果
    // setTimeout(() => {
    //   data.ranking = 13;
    //   data.rankings = 25;
    //   data.loading = false;
    // }, 1000);
  } else {
    ElMessage({
      message: "请选择预填报批次或查询专业",
      type: "warning",
    });
  }
}
//查询综合排名
function getAllNum() {
  studentFun.rank.getAllRanking().then((res) => {
    console.log("查询综合排名", res);
    for (let i = 0; i < 3; i++) {
      data.numTable[i].ranking = res[i].ranking;
      data.numTable[i].rankings = res[i].rankings;
    }
  });
}
//选择学院
let selectAcademy = (item) => {
  data.curMajor = "";
  data.curAcademy = item.name;
  data.majors = getMajorsByCollege(data.curAcademy);
};
//选择专业
let selectMajor = (item) => {
  console.log(item);
  data.curMajor = item.name;
  data.curMajorId = item.majorId;
};

// 模拟数据
// const schools = reactive([
//   { name: "吉首大学" },
//   { name: "湘南学院" },
//   { name: "湖南文理学院" },
//   { name: "湖南工业大学" },
//   { name: "长沙学院" },
//   { name: "湘潭大学" },
//   { name: "中南大学" },
//   { name: "湖南师范大学" },
//   { name: "湖南中医药大学" },
//   { name: "长沙理工大学" },
//   { name: "湖南农业大学" },
//   { name: "湖南大学" },
// ]);
// const majors = reactive([
//   { name: "金融学" },
//   { name: "财政学" },
//   { name: "国际经济与贸易" },
//   { name: "法学" },
//   { name: "政治学与行政学" },
//   { name: "运动训练" },
//   { name: "汉语言文学" },
//   { name: "英语" },
//   { name: "数学与应用数学" },
//   { name: "历史学" },
//   { name: "信息与计算科学" },
//   { name: "化学" },
//   { name: "工程力学" },
//   { name: "机械设计制造及其自动化" },
//   { name: "车辆工程" },
// ]);
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style  lang="scss" scoped>
.box {
  margin-top: 1.5rem;
}
.condition {
  height: 40%;
  padding: 2rem;
  border: 0.1rem solid rgb(241, 238, 238);
  margin-bottom: 30px;
}
.item {
  position: relative;
  .title {
    position: absolute;
    left: 0;
    color: #000;
    line-height: 1rem;
    .tip {
      vertical-align: middle;
    }
    i {
      vertical-align: middle;
    }
  }
  .condition_list {
    padding-left: 6.5rem;
    margin-top: 0.7rem;
    .tag_item {
      padding: 0 1.2rem 1rem 0;
      white-space: nowrap;
      display: inline-block;
      color: #000;
      line-height: 1.6rem;
      cursor: pointer;
    }
    .tag_item:hover {
      color: #4287ef;
    }
    .select {
      color: #4287ef;
    }
  }
}

.searchBox {
  margin-bottom: 2rem;
  padding: 0.5rem 0;
  display: inline;
}
.search {
  height: 2.5rem;
  width: 6rem;
  background-color: #77adfe;
  color: #fff;
  margin-bottom: 1rem;
}
.history {
  margin-left: 1rem;
  width: 6rem;
  height: 2.5rem;
  border-radius: 5px;
  border-color: #77adfe;
  color: #77adfe;
  overflow: hidden;
}
.stack-line {
  background: #f2f7ff;
  padding: 1.2rem;
  line-height: 1.2rem;
  margin-bottom: 1rem;
  span {
    font-size: 17px;
    color: rgb(98, 97, 97);
    margin-right: 10px;
  }
  .gk-score {
    margin-bottom: 1rem;
  }
  .gk-rank {
    margin: 1rem 0;
  }
  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
  }
}
</style>
  