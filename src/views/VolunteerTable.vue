<template>
  <div>
    <el-table
      :data="data.volunteers"
      style="width: 100%"
      v-loading.lock="data.loading"
    >
      <!-- <el-table-column fixed prop="id" label="志愿填报批次ID" width="150" /> -->
      <el-table-column fixed prop="type" label="志愿填报类型" width="150" >
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
      <!-- <el-table-column prop="timeId" label="志愿填报流程Id" width="120"/> -->
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClick(scope.row)"
            :disabled="scope.row.state !== 1"
            >进入填报页面</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <span style="font-size: 12px; color: rgb(161, 161, 161)"
      >志愿填报分为预填报和正式填报</span
    >
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import volunteerFun from "@/api/volunteer";

const router = useRouter();
const data = reactive({
  volunteers: [
    {
      id: "100001",
      startTime: "2016-05-04",
      endTime: "2016-05-04",
      type: false,
      state: 0,
    },
    {
      id: "100002",
      startTime: "2016-05-01",
      endTime: "2016-05-04",
      type: true,
      state: 1,
    },
  ],
  loading: false,
});
onMounted(() => {
  getVolunteerTable();
});
function getVolunteerTable() {
  data.loading = true;
  volunteerFun.student.getWishTable().then((res) => {
    console.log(res);
    data.volunteers = res;
    data.loading = false;
  });
}
const handleClick = (row) => {
  router.replace({ name: "volunteer-check", query: { id: row.id } });
};
</script>

<style lang="scss" scoped>
</style>