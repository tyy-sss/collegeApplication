<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:50:19
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-21 01:35:52
 * @FilePath: \collegeApplication\src\views\StudentComprehensiveAssessment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="show-container">
    <div class="text">综合测评表编辑</div>
    <hr />
    <h1>{{ myclass }}班级综合测评表[{{ month }}]</h1>
    <div style="height: 40px">
      <el-button style="float: right"
        ><el-icon><Download /></el-icon>&nbsp; 导出</el-button
      >
    </div>
    <!-- 测评编辑表 -->
    <el-table
      :data="assessments"
      style="width: 100%"
      @cell-mouse-enter="handleCellEnter"
      @cell-mouse-leave="handleCellLeave"
    >
      <el-table-column prop="id" label="学号" width="120" />
      <el-table-column prop="name" fixed label="姓名" width="150" />
      <el-table-column label="德育">
        <el-table-column prop="add1" label="加分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.add1"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.add1 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sub1" label="减分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.sub1"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.sub1 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="point1" label="得分" width="80">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.point1"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.point1 }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="智育">
        <el-table-column prop="add2" label="加分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.add2"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.add2 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sub2" label="减分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.sub2"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.sub2 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="point2" label="得分" width="80">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.point2"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.point2 }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="体育">
        <el-table-column prop="add3" label="加分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.add3"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.add3 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sub3" label="减分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.sub3"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.sub3 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="point3" label="得分" width="80">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.point3"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.point3 }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="美育">
        <el-table-column prop="add4" label="加分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.add4"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.add4 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sub4" label="减分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.sub4"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.sub4 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="point4" label="得分" width="80">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.point4"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.point4 }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="劳动">
        <el-table-column prop="add5" label="加分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.add5"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.add5 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sub5" label="减分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.sub5"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.sub5 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="point5" label="得分" width="80">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.point5"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.point5 }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="当月综合测评得分" fixed="right">
        <el-table-column prop="add_total" label="月加分" width="80">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.add_total"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.add_total }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sub_total" label="月减分" width="80">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.sub_total"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.sub_total }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pre_total" label="上月得分" width="90">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.pre_total"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.pre_total }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="point_total" label="当月总分" width="90">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.point_total"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.point_total }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <br />
    <div style="height: 40px; display: flex; justify-content: center">
      <el-button type="primary">提交本月测评结果</el-button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
let myclass = "2023级1班";
let month="三月"
const assessments = ref([
  {
    id: "20222113001",
    name: "吾尔肯·塞里克",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222113002",
    name: "玉苏普·吐荪江",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222113003",
    name: "沙亚拉·江阿努尔",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222113004",
    name: "吐尔逊娜衣·托呼提",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222112006",
    name: "阿合叶尔克·胡瓦提",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222112005",
    name: "米热古丽·吾斯曼",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222112004",
    name: "地娜拉·居帕尔",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222112003",
    name: "沙尔恩高阿·吾日克塔",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222113001",
    name: "吾尔肯·塞里克",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222113002",
    name: "玉苏普·吐荪江",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
]);

const editProp = [
  "add1",
  "sub1",
  "point1",
  "add2",
  "sub2",
  "point2",
  "add3",
  "sub3",
  "point3",
  "add4",
  "sub4",
  "point4",
  "add5",
  "sub5",
  "point5",
  "add_total",
  "sub_total",
  "pre_total",
  "point_total",
];

const handleCellEnter = (row, column, cell, event) => {
  const property = column.property;
  if (editProp.includes(property)) {
    cell.querySelector(".item__input").style.display = "block";
    cell.querySelector(".item__txt").style.display = "none";
  }
};

const handleCellLeave = (row, column, cell, event) => {
  const property = column.property;
  if (editProp.includes(property)) {
    cell.querySelector(".item__input").style.display = "none";
    cell.querySelector(".item__txt").style.display = "block";
  }
};
</script>
<style src="@/assets/css/show-container.css" scoped></style>

<style lang="scss" scoped>
hr {
  border-color: #ebf3ff4d;
}
h1 {
  margin-top: 40px;
  text-align: center;
}
.item {
  .item__input {
    display: none;
    width: 100%;
    /* 调整elementUI中样式 如果不需要调整请忽略 */
    .el-input__inner {
      height: 24px !important;
    }
    /* 调整elementUI中样式 如果不需要调整请忽略 */
    .el-input__suffix {
      i {
        font-size: 12px !important;
        line-height: 26px !important;
      }
    }
  }
  .item__txt {
    box-sizing: border-box;
    line-height: 24px;
    padding: 0 9px;
  }
}
</style>
  