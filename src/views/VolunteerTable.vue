<template>
  <div>
    <el-table
      :data="data.volunteers"
      style="width: 100%"
      v-loading.lock="data.loading"
    >
      <el-table-column fixed prop="type" label="志愿填报类型" width="150">
        <template #default="scope">
          <b v-if="scope.row.type == true">正式填报</b>
          <b v-if="scope.row.type == false">预填报</b>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="填报起始时间" width="200" />
      <el-table-column prop="endTime" label="填报截止时间" width="200" />
      <el-table-column prop="state" label="状态" width="120">
        <template #default="scope">
          <span v-if="scope.row.state == 1">填报中</span>
          <span v-if="scope.row.state == 0">暂未开启</span>
          <span v-if="scope.row.state == 2">已关闭</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClick(scope.row)"
            :disabled="scope.row.state !== 1"
            >进入填报页面</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClick2(scope.row)"
            >查询填报历史</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <span style="font-size: 12px; color: rgb(161, 161, 161)"
      >志愿填报分为预填报和正式填报</span
    >
  </div>
  <el-dialog
    v-model="data.dialogVisible"
    title="志愿填报记录"
    width="1000"
    align-center
  >
    <el-table :data="data.historys" style="width: 100%">
      <el-table-column prop="updateTime" label="填报时间" width="180" />
      <el-table-column prop="firstName" label="第一志愿" width="180" />
      <el-table-column prop="secondName" label="第二志愿" width="180" />
      <el-table-column prop="thirdName" label="第三志愿" width="180" />
      <el-table-column prop="signature" label="签名">
        <template #default="scope"
          ><div style="width: 200px; height: 50px; border: 1px solid black">
            <el-image
              style="width: 100%; height: 100%"
              :src="scope.row.signature"
              fit="contain"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <span>最新填报方案为您的当前填报结果</span>
  </el-dialog>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import volunteerFun from "@/api/volunteer";
const router = useRouter();
const data = reactive({
  volunteers: [],
  historys: [],
  dialogVisible: false,
  loading: false,
});
onMounted(() => {
  getVolunteerTable();
});
//获取填报批次列表
function getVolunteerTable() {
  data.loading = true;
  volunteerFun.student.getWishTable().then((res) => {
    data.volunteers = res;
    data.loading = false;
  });
}
//进入填报页面
const handleClick = (row) => {
  router.replace({
    name: "volunteer-check",
    query: { id: row.id },
  });
};
//进入查询填报历史页面
const handleClick2 = (row) => {
  data.historys = row.autographList;
  data.dialogVisible = true;
};
</script>