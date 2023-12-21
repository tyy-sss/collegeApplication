<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-27 20:45:21
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-21 22:40:12
 * @FilePath: \collegeApplication\src\views\ComprehensiveAssessment.vue
 * @Description: 测评小组综合测评表编辑页面
-->
<template>
  <div class="show-container">
    <div class="title">
      <div class="text">综合测评表编辑</div>
    </div>
    <hr />
    <h1>{{ myclass }}班级综合测评表[{{ month }}]</h1>
    <!-- 顶部，查询按钮，导出按钮 -->
    <div style="height: 40px">
      <span style="float: left">学生姓名: &nbsp;</span>
      <el-input
        style="float: left; width: 20%"
        v-model="search"
        size="small"
        placeholder="输入学生姓名关键字"
      />
      <el-button
        type="warning"
        style="float: right; margin-left: 1rem"
        @click="dialogVisible2 = true"
        ><el-icon><Memo /></el-icon>&nbsp; 错误申报</el-button
      >
      <el-button style="float: right" @click="handleExcelExport"
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
        <el-table-column prop="point1" label="得分" width="90">
          <template #default="scope">
            <div class="item">
              <el-input-number
                style="width: 70px"
                class="item__input"
                v-model="scope.row.point1"
                :min="-100"
                :max="100"
                size="small"
              />
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
        <el-table-column prop="point2" label="得分" width="90">
          <template #default="scope">
            <div class="item">
              <el-input-number
                style="width: 70px"
                class="item__input"
                v-model="scope.row.point2"
                :min="-100"
                :max="100"
                size="small"
              />
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
        <el-table-column prop="point3" label="得分" width="90">
          <template #default="scope">
            <div class="item">
              <el-input-number
                style="width: 70px"
                class="item__input"
                v-model="scope.row.point3"
                :min="-100"
                :max="100"
                size="small"
              />
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
        <el-table-column prop="point4" label="得分" width="90">
          <template #default="scope">
            <div class="item">
              <el-input-number
                style="width: 70px"
                class="item__input"
                v-model="scope.row.point4"
                :min="-100"
                :max="100"
                size="small"
              />
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
        <el-table-column prop="point5" label="得分" width="90">
          <template #default="scope">
            <div class="item">
              <el-input-number
                style="width: 70px"
                class="item__input"
                v-model="scope.row.point5"
                :min="-100"
                :max="100"
                size="small"
              />
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
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :page-size="7"
        :pager-count="5"
        layout="prev, pager, next"
        :total="60"
        style="margin-left: auto"
      />
    </div>
    <!-- 提交按钮 -->
    <div class="submitBtn">
      <el-button type="primary" @click="dialogVisible = true"
        >提交本月测评结果</el-button
      >
    </div>
  </div>
  <!-- 电子签名对话框 -->
  <el-dialog v-model="dialogVisible" title="电子签名" width="50%">
    <div>
      <signatures @finish="finish"></signatures>
    </div>
  </el-dialog>
  <!-- 申诉列表对话框 -->
  <el-dialog v-model="dialogVisible2" title="💬 待申述处理" width="50%">
    <div>
      <el-table :data="complaintData" style="width: 100%">
        <el-table-column type="index" />
        <el-table-column label="申诉学生姓名" prop="name" min-width="120" />
        <el-table-column label="学号" prop="id" min-width="100" />
        <el-table-column label="申诉内容" prop="content" min-width="300" />
        <el-table-column
          label="申诉时间"
          sortable
          prop="date"
          min-width="100"
        />
        <el-table-column label="操作" min-width="150">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >已处理</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import signatures from "@/components/utils/Signatures.vue";
import { comprehensiveAssessmentHeader } from "@/assets/js/excel/format/comprehensive-assessment-style";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import studentFun from "@/api/student";
let myclass = "2023级1班";
let month = "三月";
const assessments = reactive([
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
//编辑
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

// 数据excel导出
const handleExcelExport = () => {
  console.log(comprehensiveAssessmentHeader);
  export_json_to_excel(
    comprehensiveAssessmentHeader,
    assessments,
    `${myclass}班级综合测评表`
  );
};
//签名后提交数据和电子签名
function finish(sign) {
  console.log("签名img的base64", sign);
  studentFun.sign.submitSignature(sign).then((res) => {
    console.log(res);
    ElMessage({
      message: "提交本月综测情况成功",
      type: "success",
    });
  });
}

//电子签名对话框
const dialogVisible = ref(false);
//申诉对话框
const dialogVisible2 = ref(false);
// 申诉列表
const complaintData = [
  {
    date: "2023-05-07",
    id: "2022100030",
    name: "杨世博",
    content: "个人信息性别错误，需要更改为男",
  },
  {
    date: "2023-05-11",
    name: "李珊",
    id: "2022100030",
    content: "综测1月加分计算错误，少加了1分英语竞赛二等奖分",
  },
  {
    date: "2023-05-24",
    name: "涂圆元",
    id: "2022100031",
    content: "个人信息民族错误，需要更改为土家族",
  },
  {
    date: "2023-05-11",
    name: "陈翔",
    id: "2022100032",
    content: "综测1月加分计算错误，少加了3分软件杯全国二等奖分",
  },
  {
    date: "2023-05-12",
    name: "刘橙晨",
    id: "2022100040",
    content: "个人信息目标学校错误，需要修改为‘长沙学院’",
  },
];
//删除申诉项
const handleDelete = (index, row) => {
  console.log("删除申诉项", index, row);
};
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style lang="scss" scoped>
h1 {
  margin-top: 40px;
  text-align: center;
}
.item {
  .item__input {
    display: none;
    width: 100%;
  }
  .item__txt {
    box-sizing: border-box;
    line-height: 24px;
    padding: 0 9px;
  }
}
.pagination {
  display: flex;
}
.submitBtn {
  text-align: center;
  height: 40px;
}
</style>
  