<template>
  <el-button plain @click="dialogFormVisible = true"> 修改综测 </el-button>

  <el-dialog v-model="dialogFormVisible" title="编辑学生综合测评" width="500">
    <el-form :model="form">
      <el-form-item label="编辑内容" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="全部">
          <el-option label="全部" value="0" />
          <el-option label="德育" value="1" />
          <el-option label="智育" value="2" />
          <el-option label="体育" value="3" />
          <el-option label="美育" value="4" />
          <el-option label="劳动" value="5" />
        </el-select>
      </el-form-item>
      <div v-show="form.type == 1 || form.type == 0">
        <hr style="border-color: rgba(231, 229, 226, 0.459)" />
        <el-form-item label="德育" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="加分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="减分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="德育得分" :label-width="formLabelWidth">
          <el-input-number
            style="width: 100px"
            class="item__input"
            v-model="form.name"
            :min="-100"
            :max="100"
            size="small"
          />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";

const dialogFormVisible = ref(true);
const formLabelWidth = "140px";

const row = reactive({
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
});

const form = reactive({
  type: "",
  add1: "",
  sub1: "",
  point1: "",
  add2: "",
  sub2: "",
  point2: "",
  add3: "",
  sub3: "",
  point3: "",
  add4: "",
  sub4: "",
  point4: "",
  add5: "",
  sub5: "",
  point5: "",
});
</script>
