<template>
  <div>
    <el-table
      :data="data.volunteers"
      style="width: 100%"
      v-loading.lock="data.loading"
    >
      <!-- <el-table-column fixed prop="id" label="志愿填报批次ID" width="150" /> -->
      <el-table-column fixed prop="name" label="志愿填报类型" width="150" />
      <el-table-column prop="date1" label="填报起始时间" width="150" />
      <el-table-column prop="date2" label="填报截止时间" width="150" />
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClick(scope.row)"
            >进入填报页面</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <span style="font-size:12px;color: rgb(161, 161, 161);">志愿填报分为预填报和正式填报</span>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import studentFun from "@/api/student";

const router = useRouter();
const data = reactive({
  volunteers: [
    {
      id: "100001",
      date1: "2016-05-04",
      date2: "2016-05-04",
      name: "预填报",
      state: "填报中",
    },
    {
      id: "100002",
      date1: "2016-05-01",
      date2: "2016-05-04",
      name: "正式填报",
      state: "暂未开放",
    },
  ],
  loading: false,
});
onMounted(() => {
  // getVolunteerTable();
});
function getVolunteerTable() {
  data.loading = true;
  studentFun.getVolunteerTable().then((res) => {
    data.volunteers = res;
    data.loading = false;
  });
}
const handleClick = (row) => {
  console.log(row);
  const myId = row.id;
  router.push({ name: "volunteer-check", query: { id: myId } });
};
</script>

<style lang="scss" scoped>
</style>