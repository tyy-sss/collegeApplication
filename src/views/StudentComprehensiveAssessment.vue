<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:50:19
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-30 23:08:36
 * @FilePath: \collegeApplication\src\views\StudentComprehensiveAssessment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="show-container">
    <div class="title">
      <div class="text">个人综测查看</div>
    </div>
    <hr />
    <br />
    <div>
      <el-form-item label="本月确认情况 ：">
        {{ state }}
        <span style="color: rgb(167, 167, 167); margin-left: 15px">
          (已确认/正在申报/待确认/未到确认时间)</span
        >
      </el-form-item>
    </div>
    <br />
    <div>
      <div>
        <h4>本月综测情况确认</h4>
        <br />
        <el-table :data="assessment" style="width: 100%">
          <el-table-column prop="id" label="学号" width="120" />
          <el-table-column prop="name" label="姓名" width="150" />
          <el-table-column label="德育">
            <el-table-column prop="add1" label="加分明细" width="120" />
            <el-table-column prop="sub1" label="减分明细" width="120" />
            <el-table-column prop="point1" label="得分" width="60" />
          </el-table-column>
          <el-table-column label="智育">
            <el-table-column prop="add2" label="加分明细" width="120" />
            <el-table-column prop="sub2" label="减分明细" width="120" />
            <el-table-column prop="point2" label="得分" width="60" />
          </el-table-column>
          <el-table-column label="体育">
            <el-table-column prop="add3" label="加分明细" width="120" />
            <el-table-column prop="sub3" label="减分明细" width="120" />
            <el-table-column prop="point3" label="得分" width="60" />
          </el-table-column>
          <el-table-column label="美育">
            <el-table-column prop="add4" label="加分明细" width="120" />
            <el-table-column prop="sub4" label="减分明细" width="120" />
            <el-table-column prop="point4" label="得分" width="60" />
          </el-table-column>
          <el-table-column label="劳动">
            <el-table-column prop="add5" label="加分明细" width="120" />
            <el-table-column prop="sub5" label="减分明细" width="120" />
            <el-table-column prop="point5" label="得分" width="60" />
          </el-table-column>
          <el-table-column label="当月综合测评得分" fixed="right">
            <el-table-column prop="add_total" label="月加分" width="80" />
            <el-table-column prop="sub_total" label="月减分" width="80" />
            <el-table-column prop="pre_total" label="上月得分" width="90" />
            <el-table-column prop="point_total" label="当月总分" width="90" />
          </el-table-column>
        </el-table>
        <br />
      </div>
      <el-button type="primary" @click="dialogVisible = true"
        >前往电子签名</el-button
      >
      <el-button type="danger" @click="dialogVisible2 = true"
        >申报错误</el-button
      >
      <br />
      <span style="color: rgb(167, 167, 167)"
        >⊙综合素质测评成绩 = 德育 x 20% + 智育 x 20% + 体育 x 20% + 美育　x 20%
        +劳动 x 20%</span
      >
      <br /><br />
      <div>
        <h4>总体综测情况</h4>
        <br />
        <el-table :data="assessment" style="width: 77%">
          <el-table-column prop="id" label="学号" width="120" />
          <el-table-column prop="name" label="姓名" width="150" />
          <el-table-column prop="point1" label="德育得分" width="120" />
          <el-table-column prop="point2" label="智育得分" width="120" />
          <el-table-column prop="point3" label="体育得分" width="120" />
          <el-table-column prop="point4" label="美育得分" width="120" />
          <el-table-column prop="point5" label="劳动得分" width="120" />
          <el-table-column label="综合测评得分" fixed="right">
            <el-table-column prop="add_total" label="加分" width="120" />
            <el-table-column prop="sub_total" label="减分" width="120" />
            <el-table-column prop="point_total" label="综测总分" width="120" />
          </el-table-column>
        </el-table>
        <br />
      </div>
    </div>
  </div>
  <!-- 电子签名对话框 -->
  <el-dialog v-model="dialogVisible" title="电子签名" width="50%">
    <div>
      <signatures></signatures>
    </div>
  </el-dialog>
  <!-- 申报错误对话框 -->
  <el-dialog v-model="dialogVisible2" title="申报错误" width="30%">
    <div>
      <el-form-item label="申报接收对象：">
        <el-select
          v-model="target"
          class="m-2"
          placeholder="请选择申报接收对象"
        >
          <el-option
            v-for="item in targets"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="错误申报内容：">
        <el-input
          v-model="textarea"
          :autosize="{ minRows: 6, maxRows: 10 }"
          type="textarea"
          placeholder="请输入错误申报内容"
        />
      </el-form-item>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="commit"> 提交申报 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import signatures from "@/components/utils/Signatures.vue";
import { ref, reactive, computed } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();

const assessment = [
  {
    id: "2021401449",
    name: "付小小",
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
];
let state = "未到确认时间";
//对话框
const dialogVisible = ref(false);
const dialogVisible2 = ref(false);
const target = ref("");

const targets = [
  {
    value: "1",
    label: "班主任",
  },
  {
    value: "2",
    label: "评测小组同学",
  },
];
const textarea = ref("");
//提交申报
function commit() {
  dialogVisible2.value = false;
  ElMessage({
    message: "已申报错误，请耐心等待处理",
    type: "success",
  });
}
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style scoped>
hr {
  border-color: #ebf3ff4d;
}
.box {
  width: 60%;
  height: 410px;
  margin: 0 auto;
  border-radius: 15px 15px 15px 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
.left {
  width: 50%;
  padding: 100px;
  height: 410px;
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
</style>
  