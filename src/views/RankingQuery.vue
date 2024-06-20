<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:48:59
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-06-20 21:57:33
 * @FilePath: \collegeApplication\src\views\RankingQuery.vue
 * @Description: 学生查询排名页面
-->
<template>
  <div class="show-container">
    <div class="title"><div class="text">查询排名</div></div>
    <hr />
    <div class="box">
      <!-- 综合排名 -->
      <div class="rank1">
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
      <!-- 查询专业第一志愿排名 -->
      <div>
        <h3>2️⃣查询第一志愿专业排名</h3>
        <br />
        <div>
          <h4>确认批次</h4>
          <br />
          <div class="tip1">
            💬查询排名结果的依据为第一志愿的实时填报情况，请先选择要查询的填报批次。
          </div>
          <span>确认批次： </span>
          <div class="searchBox">
            <el-select
              v-model="data.preWishId"
              class="m-2 selectbox"
              placeholder="请选择预填报批次"
              size="large"
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
                <b>{{ data.schoolName || "暂无信息" }}</b>
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
              <div v-if="data.academy.length < 1">暂无可选择的学院</div>
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
              <div v-if="data.majors.length < 1">暂无可选择的专业</div>
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
                <span>我的排名</span>第 {{ data.ranking || "-" }} 名
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
import { reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import studentFun from "@/api/student";
import volunteerFun from "@/api/volunteer";
//数据
const data = reactive({
  ranking: null, //同分人数
  rankings: null, //排名区间
  curAcademy: "", //选择学院
  curMajor: "", //选择专业
  curMajorId: "", //选择专业id
  schoolName: "", //目标院校
  academy: [], //学院列表
  majors: [], //专业列表
  allData: [], //学院专业选择数据
  loading: false,
  preWishId: null,
  preWishList: [], //查询批次列表
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
  getInformation();
  getVolunteerTable(); //查询志愿列表
  selectStudentMajor(); //查询可选择的学院专业
  getAllNum(); //查询综合排名
}
//获取基本信息
function getInformation() {
  studentFun.user.getInformation().then((res) => {
    data.schoolName = res.school;
  });
}
//查询可选专业
function selectStudentMajor() {
  volunteerFun.options.selectStudentMajor().then((res) => {
    data.allData = res;
    data.academy = res.map((item) => ({ name: item.college }));
  });
}
//查询预填报志愿列表
function getVolunteerTable() {
  volunteerFun.student.getWishTable().then((res) => {
    res.forEach((volunteer) => {
      if (volunteer.state !== 0) {
        let type = volunteer.type ? "正式填报" : "预填报";
        let state = volunteer.state == 1 ? "填报中" : "填报结束";
        data.preWishList.push({
          value: volunteer.id,
          label:
            "【" + type + "】" + volunteer.startTime + "批次（" + state + ")",
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
  if (data.curAcademy && data.curMajor && data.preWishId) {
    data.loading = true;
    //查询排名
    studentFun.rank
      .getMajorRanking({
        majorId: data.curMajorId,
        timeId: data.preWishId,
      })
      .then((res) => {
        data.ranking = res.ranking;
        data.rankings = res.rankings;
        data.loading = false;
      });
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
    for (let i = 0; i < 3; i++) {
      data.numTable[i].ranking = res[i].ranking;
      data.numTable[i].rankings = res[i].rankings;
    }
  });
}
//选择学院
let selectAcademy = (item) => {
  data.ranking = null;
  data.rankings = null;
  data.curMajor = "";
  data.curAcademy = item.name;
  data.majors = getMajorsByCollege(data.curAcademy);
};
//选择专业
let selectMajor = (item) => {
  data.ranking = null;
  data.rankings = null;
  data.curMajor = item.name;
  data.curMajorId = item.majorId;
};
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style src="@/assets/css/student/rankingQuery.scss" lang="scss" scoped/>
  