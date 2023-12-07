<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:48:59
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-07 22:13:47
 * @FilePath: \collegeApplication\src\views\StudentInfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="show-container">
    <div class="title"><div class="text">查询排名</div></div>
    <hr />
    <!-- 旧的 -->
    <!--  <div class="box">
      <div class="left">
        <el-form-item label="学校 ：">
          <el-cascader
            :options="options"
            placeholder="请输入学校名称"
            :show-all-levels="false"
            v-model="object1"
          />
        </el-form-item>
        <el-form-item label="专业 ：">
          <el-cascader
            :options="options"
            placeholder="请输入专业名称"
            :show-all-levels="false"
            v-model="object2"
          />
        </el-form-item>
        <el-form-item label="省份 ：">
          <el-cascader
            :options="options"
            placeholder="请输入省份名称"
            :show-all-levels="false"
            v-model="object3"
          />
        </el-form-item>
        <br />
        <div class="button_box">
          <el-button type="primary">查询排名</el-button>
          <el-button type="danger" @click="drawer = true">历史查询</el-button>
        </div>
      </div>
      <div class="right">
        <br /><br /><br /><br />
        <h3>您的排名是：</h3>
        <br />
        <h2>{{ num }}</h2>
      </div>
    </div>
    <div class="tip_box">
      <div class="tip2">
        <div><b>说明</b></div>
        <br />
        <div><b>查询排名字段</b></div>
        <div>
          您可以限定学校，专业，省份，依据预填报情况查看该限定条件下您的排名。
        </div>
      </div>
  </div> -->
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
            <div
              v-for="(item, i) in provinces"
              :key="i"
              :class="item.name == curProvince ? 'tag_item select' : 'tag_item'"
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
            <div
              v-for="(item, i) in schools"
              :key="i"
              :class="item.name == curSchool ? 'tag_item select' : 'tag_item'"
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
            <div
              v-for="(item, i) in majors"
              :key="i"
              :class="item.name == curMajor ? 'tag_item select' : 'tag_item'"
              @click="selectMajor(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <!-- 考生类别 -->
        <div class="item" style="min-height: 36px">
          <div class="title">
            <span class="tip">考生类别</span
            ><i
              ><el-icon><ArrowRight /></el-icon
            ></i>
          </div>
          <div class="condition_list">
            <div
              v-for="(item, i) in types"
              :key="i"
              :class="item.name == curType ? 'tag_item select' : 'tag_item'"
              @click="selectType(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
      <!-- 搜索框 -->
      <div class="searchBox">
        <el-input
          v-model="score"
          placeholder="请输入您的分数"
          class="input-with-select"
        >
          <template #append>
            <el-button class="search" @click="search">查询</el-button>
          </template>
        </el-input>

        <el-button class="history" @click="drawer = true">历史查询</el-button>
      </div>
      <!-- 结果 -->
      <h4>查询结果</h4>
      <br />
      <div class="stack-line" v-loading.lock="loading">
        <div class="stack-info">
          <div class="gk-score">
            <em><span>高考分数</span>{{ gkScore || "-" }}分</em>
          </div>
          <hr />
          <div class="gk-rank">
            <div class="item"><span>同分人数</span>{{ gkNum || "-" }}人</div>
            <div class="item">
              <span>排名区间</span>{{ gkLeft }}-{{ gkRight }}名
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 抽屉 -->
  <el-drawer v-model="drawer" direction="btt" style="min-height: 50%">
    <template #header>
      <h4>历史查询</h4>
    </template>

    <template #default>
      <div>
        <el-table
          :data="queryData"
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
import studentFun from "@/api/student"
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);
const drawer = ref(false);
function search() {
  if (curProvince.value && curSchool.value && curMajor.value && curType.value) {
    loading.value = true;
    setTimeout(() => {
      gkScore.value = 512;
      gkNum.value = 745;
      gkLeft.value = 46820;
      gkRight.value = 47564;
      loading.value = false;
    }, 1000);
  } else {
    ElMessage({
      message: "请选择查询条件",
      type: "warning",
    });
  }
}
const score = ref();
let gkScore = ref();
let gkNum = ref();
let gkLeft = ref();
let gkRight = ref();
const curProvince = ref("");
let selectProvince = (item) => {
  curProvince.value = item.name;
  console.log(curProvince.value);
};
const provinces = reactive([
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
]);
const curSchool = ref("");
let selectSchool = (item) => {
  curSchool.value = item.name;
  console.log(curSchool.value);
};
const schools = reactive([
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
]);
const curMajor = ref("");
let selectMajor = (item) => {
  curMajor.value = item.name;
  console.log(curMajor.value);
};
const majors = reactive([
  { name: "经济学" },
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
]);
let curType = ref("普通预科");
let selectType = (item) => {
  curType.value = item.name;
  console.log(curType.value);
};
const types = reactive([{ name: "普通预科" }, { name: "新疆专项" }]);
// let object1 = null;
// let object2 = null;
// let object3 = null;
// const options = [
//   {
//     value: "计算机科学与工程学院",
//     label: "计算机科学与工程学院",
//     children: [
//       {
//         value: "软件工程",
//         label: "软件工程",
//       },
//       {
//         value: "物联网工程",
//         label: "物联网工程",
//       },
//       {
//         value: "人工智能",
//         label: "人工智能",
//         disabled: true,
//       },
//       {
//         value: "大数据网络",
//         label: "大数据网络",
//         disabled: true,
//       },
//     ],
//   },
//   {
//     value: "美术学院",
//     label: "美术学院",
//     children: [
//       {
//         value: "服装设计",
//         label: "服装设计",
//       },
//       {
//         value: "视觉传达设计",
//         label: "视觉传达设计",
//       },
//       {
//         value: "漫画设计",
//         label: "漫画设计",
//       },
//     ],
//   },
//   {
//     value: "医学院",
//     label: "医学院",
//     children: [
//       {
//         value: "药物科学",
//         label: "药物科学",
//       },
//       {
//         value: "动物医学",
//         label: "动物医学",
//       },
//       {
//         value: "法医",
//         label: "法医",
//       },
//     ],
//   },
// ];
let num = "?";
// 历史查询记录
const queryData = [
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
];
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style  lang="scss" scoped>
hr {
  border-color: #ebf3ff4d;
}
.box {
  margin-top: 20px;
}
.condition {
  height: 40%;
  padding: 20px;
  border: 1px solid rgb(241, 238, 238);
  margin-bottom: 30px;
}
.item {
  position: relative;
  .title {
    position: absolute;
    left: 0;
    color: #000;
    line-height: 20px;
    .tip {
      vertical-align: bottom;
    }
    i {
      vertical-align: bottom;
    }
  }
  .condition_list {
    padding-left: 107px;
    margin-top: 10px;
    .tag_item {
      padding: 0 20px 12px 0;
      white-space: nowrap;
      display: inline-block;
      color: #000;
      line-height: 24px;
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
  margin-bottom: 30px;
  padding: 10px 0;
  display: inline-block;
  .input-with-select {
    height: 40px;
    width: 400px;
  }
  .search {
    height: 40px;
    width: 100px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background-color: #77adfe;
    color: #fff;
  }
  .history {
    margin-left: 15px;
    width: 103px;
    height: 40px;
    border-radius: 5px;
    border-color: #77adfe;
    color: #77adfe;
    overflow: hidden;
  }
}
.stack-line {
  background: #f2f7ff;
  padding: 20px;
  line-height: 18px;
  span {
    font-size: 17px;
    color: rgb(98, 97, 97);
    margin-right: 10px;
  }
  .gk-score {
    margin-bottom: 15px;
  }
  .gk-rank {
    margin: 15px 0;
  }
  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
  }
}
/* 旧的 */
/* .box {
  width: 60%;
  height: 410px;
  margin: 90px auto;
  border-radius: 15px 15px 15px 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
.left {
  width: 50%;
  padding: 100px;
  height: 410px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(184, 198, 226, 0.041);
  border-radius: 15px 0 0 15px;
  float: left;
}
.right {
  width: 50%;
  padding: 100px;
  height: 410px;
  border-radius: 0 15px 15px 0;
  background-color: rgba(255, 192, 203, 0.144);
  float: left;
  text-align: center;
}
.button_box {
  display: flex;
  justify-content: center;
}
.tip_box {
  display: flex;
  justify-content: center;
}
.tip2 {
  width: 60%;
  color: gray;
  line-height: 25px;
  margin: 20px 0;
  padding: 30px 200px;
  border-top: 1px solid rgba(87, 86, 86, 0.158);
} */
</style>
  