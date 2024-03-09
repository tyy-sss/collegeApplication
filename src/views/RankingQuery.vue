<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:48:59
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-01-26 20:00:11
 * @FilePath: \collegeApplication\src\views\RankingQuery.vue
 * @Description: 学生查询排名页面
-->
<template>
  <div class="show-container">
    <div class="title"><div class="text">查询排名</div></div>
    <hr />
    <div class="box">
      <!-- 条件 -->
      <h4>查询条件</h4>
      <br />
      <div class="condition">
        <!-- 考生省份 -->
        <div class="item">
          <div class="title">
            <span class="tip">考生省份</span
            ><i
              ><el-icon><ArrowRight /></el-icon
            ></i>
          </div>
          <div class="condition_list">
            <div v-if="data.provinces.length < 1">暂无数据</div>
            <div
              v-for="(item, i) in data.provinces"
              :key="i"
              :class="
                item.name == data.curProvince ? 'tag_item select' : 'tag_item'
              "
              @click="selectProvince(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <!-- 报考院校 -->
        <div class="item">
          <div class="title">
            <span class="tip">报考院校</span
            ><i
              ><el-icon><ArrowRight /></el-icon
            ></i>
          </div>
          <div class="condition_list">
            <div v-if="data.schools.length < 1">请选择报考省份</div>
            <div
              v-for="(item, i) in data.schools"
              :key="i"
              :class="
                item.name == data.curSchool ? 'tag_item select' : 'tag_item'
              "
              @click="selectSchool(item)"
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
            <div v-if="data.majors.length < 1">请选择报考院校</div>
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
      <!-- 搜索框 -->
      <div class="searchBox">
        <el-select
          v-model="data.type"
          class="m-2"
          placeholder="Select"
          size="large"
          style="width: 12rem; height: 3rem"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <br />
        <el-input
          v-model="data.score"
          placeholder="请输入您的分数"
          class="input-with-select"
        >
          <template #append>
            <el-button class="search" @click="search">查询</el-button>
          </template>
        </el-input>
        <el-button class="history" @click="data.drawer = true"
          >历史查询</el-button
        >
      </div>
      <!-- 结果 -->
      <h4>查询结果</h4>
      <br />
      <div class="stack-line" v-loading.lock="data.loading">
        <div class="stack-info">
          <div class="gk-score">
            <em><span>高考分数</span>{{ data.gkScore || "-" }}分</em>
          </div>
          <hr />
          <div class="gk-rank">
            <div class="item">
              <span>同分人数</span>{{ data.gkNum || "-" }}人
            </div>
            <div class="item">
              <span>排名区间</span>{{ data.gkLeft }}-{{ data.gkRight }}名
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 抽屉 -->
  <el-drawer v-model="data.drawer" direction="btt" style="min-height: 50%">
    <template #header>
      <h4>历史查询</h4>
    </template>
    <template #default>
      <div>
        <el-table
          :data="data.queryData"
          ref="multipleTableRef"
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
          <el-table-column type="index" width="50" />
          <el-table-column label="时间" sortable prop="date" />
          <el-table-column label="学校" prop="school" />
          <el-table-column label="专业" prop="professional" />
          <el-table-column label="省份" prop="province" />
          <el-table-column label="考生类别" prop="type" />
          <el-table-column label="排名" sortable width="180" prop="num" />
        </el-table>
      </div>
    </template>
  </el-drawer>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import studentFun from "@/api/student";

const data = reactive({
  loading: false,
  drawer: false,
  score: null, //填入分数
  gkScore: null, //高考分数
  gkNum: null, //同分人数
  gkLeft: null, //排名区间左
  gkRight: null, //排名区间右边
  curProvince: "湖南", //选择省份
  curSchool: "吉首大学", //选择学校
  curMajor: "", //选择学校
  type: "", //查询排名类型
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
  schools: [
    { name: "吉首大学" },
    { name: "湘南学院" },
    { name: "湖南文理学院" },
    { name: "湖南工业大学" },
    { name: "长沙学院" },
    { name: "湘潭大学" },
    { name: "中南大学" },
    { name: "湖南师范大学" },
    { name: "湖南中医药大学" },
    { name: "长沙理工大学" },
    { name: "湖南农业大学" },
    { name: "湖南大学" },
  ], //学校列表
  majors: [
    { name: "金融学" },
    { name: "财政学" },
    { name: "国际经济与贸易" },
    { name: "法学" },
    { name: "政治学与行政学" },
    { name: "运动训练" },
    { name: "汉语言文学" },
    { name: "英语" },
    { name: "数学与应用数学" },
    { name: "历史学" },
    { name: "信息与计算科学" },
    { name: "化学" },
    { name: "工程力学" },
    { name: "机械设计制造及其自动化" },
    { name: "车辆工程" },
  ], //专业列表
  queryData: [
    {
      date: "2023.10.4 12:10:23",
      school: "湘南学院",
      professional: "汉语言文学（师范）",
      province: "湖南省",
      num: "56",
      type: "新疆专项",
    },
    {
      date: "2023.10.4 12:10:21",
      school: "湘南学院",
      professional: "秘书学",
      province: "湖南省",
      num: "85",
      type: "新疆专项",
    },
    {
      date: "2023.10.4 12:09:23",
      school: "湘南学院",
      professional: "法学",
      province: "湖南省",
      num: "45",
      type: "新疆专项",
    },
    {
      date: "2023.10.4 12:08:11",
      school: "湖南文理学院",
      professional: "国际经济与贸易",
      province: "湖南省",
      num: "45",
      type: "普通预科",
    },
    {
      date: "2023.10.3 12:10:23",
      school: "湖南文理学院",
      professional: "市场营销",
      province: "湖南省",
      num: "45",
      type: "普通预科",
    },
    {
      date: "2023.10.4 12:10:21",
      school: "湘南学院",
      professional: "秘书学",
      province: "湖南省",
      num: "85",
      type: "普通预科",
    },
    {
      date: "2023.10.4 12:09:23",
      school: "湘南学院",
      professional: "法学",
      province: "湖南省",
      num: "45",
      type: "普通预科",
    },
    {
      date: "2023.10.4 12:08:11",
      school: "湖南文理学院",
      professional: "国际经济与贸易",
      province: "湖南省",
      num: "45",
      type: "普通预科",
    },
    {
      date: "2023.10.3 12:10:23",
      school: "湖南文理学院",
      professional: "市场营销",
      province: "湖南省",
      num: "45",
      type: "普通预科",
    },
  ], //历史查询记录列表
});
//排名类型选择
const options = [
  {
    value: "Option1",
    label: "目标学校排名",
  },
  {
    value: "Option2",
    label: "延保同一个专业的排名",
  },
  {
    value: "Option3",
    label: "所有学生的排名",
  },
  {
    value: "Option4",
    label: "同一个班的排名",
  },
];

//查询排名
function search() {
  if (data.curProvince && data.curSchool && data.curMajor) {
    data.loading = true;
    setTimeout(() => {
      data.gkScore = data.score;
      data.gkNum = 745;
      data.gkLeft = 46820;
      data.gkRight = 47564;
      data.loading = false;
    }, 1000);
  } else {
    ElMessage({
      message: "请选择查询条件",
      type: "warning",
    });
  }
}

let selectProvince = (item) => {
  data.curProvince = item.name;
};
let selectSchool = (item) => {
  data.curSchool = item.name;
};
let selectMajor = (item) => {
  data.curMajor = item.name;
};

// 模拟数据
// const provinces = reactive([
//   { name: "北京" },
//   { name: "天津" },
//   { name: "河北" },
//   { name: "山西" },
//   { name: "内蒙古" },
//   { name: "辽宁" },
//   { name: "吉林" },
//   { name: "黑龙江" },
//   { name: "上海" },
//   { name: "江苏" },
//   { name: "浙江" },
//   { name: "安徽" },
//   { name: "福建" },
//   { name: "江西" },
//   { name: "山东" },
//   { name: "河南" },
//   { name: "湖北" },
//   { name: "湖南" },
//   { name: "广东" },
//   { name: "广西" },
//   { name: "海南" },
//   { name: "重庆" },
//   { name: "四川" },
//   { name: "贵州" },
//   { name: "云南" },
//   { name: "陕西" },
//   { name: "甘肃" },
//   { name: "青海" },
//   { name: "宁夏" },
// ]);
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
// const queryData = [
//   {
//     date: "2023.10.4 12:10:23",
//     school: "湘南学院",
//     professional: "汉语言文学（师范）",
//     province: "湖南省",
//     num: "56",
//     type: "新疆专项",
//   },
//   {
//     date: "2023.10.4 12:10:21",
//     school: "湘南学院",
//     professional: "秘书学",
//     province: "湖南省",
//     num: "85",
//     type: "新疆专项",
//   },
//   {
//     date: "2023.10.4 12:09:23",
//     school: "湘南学院",
//     professional: "法学",
//     province: "湖南省",
//     num: "45",
//     type: "新疆专项",
//   },
//   {
//     date: "2023.10.4 12:08:11",
//     school: "湖南文理学院",
//     professional: "国际经济与贸易",
//     province: "湖南省",
//     num: "45",
//     type: "普通预科",
//   },
//   {
//     date: "2023.10.3 12:10:23",
//     school: "湖南文理学院",
//     professional: "市场营销",
//     province: "湖南省",
//     num: "45",
//     type: "普通预科",
//   },
//   {
//     date: "2023.10.4 12:10:21",
//     school: "湘南学院",
//     professional: "秘书学",
//     province: "湖南省",
//     num: "85",
//     type: "普通预科",
//   },
//   {
//     date: "2023.10.4 12:09:23",
//     school: "湘南学院",
//     professional: "法学",
//     province: "湖南省",
//     num: "45",
//     type: "普通预科",
//   },
//   {
//     date: "2023.10.4 12:08:11",
//     school: "湖南文理学院",
//     professional: "国际经济与贸易",
//     province: "湖南省",
//     num: "45",
//     type: "普通预科",
//   },
//   {
//     date: "2023.10.3 12:10:23",
//     school: "湖南文理学院",
//     professional: "市场营销",
//     province: "湖南省",
//     num: "45",
//     type: "普通预科",
//   },
// ];
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
  display: inline-block;
  .input-with-select {
    height: 3.5rem;
    width: 25rem;
  }
  .search {
    height: 3.5rem;
    width: 6rem;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background-color: #77adfe;
    color: #fff;
  }
  .history {
    margin-left: 1rem;
    width: 6rem;
    height: 3.5rem;
    border-radius: 5px;
    border-color: #77adfe;
    color: #77adfe;
    overflow: hidden;
  }
}
.stack-line {
  background: #f2f7ff;
  padding: 1.2rem;
  line-height: 1.2rem;
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
@media (max-width: 600px) {
  /* 当屏幕宽度小于等于800px时 */
  .searchBox {
    .input-with-select {
      width: 22rem;
    }
  }
}
@media (min-width: 600px) and (max-width: 1000px) {
}
@media (min-width: 1000px) {
}
</style>
  