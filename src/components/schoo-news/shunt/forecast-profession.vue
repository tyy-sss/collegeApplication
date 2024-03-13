<template>
  <div class="forecast-profession">
    <div class="top">
      <div class="text">志愿规则选择：</div>
      <div class="choose">
        <el-radio-group
          v-model="data.volunteerRule"
          class="ml-4"
          @change="getVounteerDiversion"
        >
          <el-tooltip
            v-for="(item, index) in data.typeData"
            :key="index"
            class="box-item"
            effect="light"
            placement="bottom"
          >
            <template #content>
              <rule-explain :volunteer-rule="item.volunteerRule" />
            </template>
            <el-radio :label="item.type" size="large">{{
              item.label
            }}</el-radio>
          </el-tooltip>
        </el-radio-group>
      </div>
    </div>
    <div class="middle">
      <div class="left">
        <el-radio-group v-model="data.activeName" size="large">
          <el-radio-button label="全部名单" value="all" />
          <el-radio-button label="录取名单" value="first" />
          <el-radio-button label="未录取名单" value="third" />
        </el-radio-group>
      </div>
    </div>
    <div class="bottom">
      <div class="table">
        <el-table :data="data.tableData" border>
          <el-table-column prop="name" label="目标学校" min-width="90" />
          <el-table-column prop="userName" label="姓名" />
          <el-table-column prop="userNumber" label="学号" min-width="110" />
          <el-table-column prop="sex" label="性别" width="60" />
          <el-table-column prop="province" label="省份" />
          <el-table-column prop="className" label="班级" min-width="130" />
          <el-table-column prop="subjects" label="选考科目" min-width="120" />
          <el-table-column prop="score" label="分流成绩" min-width="90" />
          <el-table-column label="志愿填报" fixed="right">
            <el-table-column prop="firstName" label="一志愿" />
            <el-table-column prop="secondName" label="二志愿" />
            <el-table-column prop="thirdName" label="三志愿" />
            <el-table-column
              prop="majorName"
              label="拟录专业"
              min-width="100"
            />
          </el-table-column>
          <el-table-column label="联系方式" fixed="right">
            <el-table-column prop="phone" label="电话号码" min-width="120" />
            <el-table-column
              prop="parentPhone"
              label="父母电话"
              min-width="120"
            />
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <el-pagination
          :page-size="data.pager.size"
          :pager-count="9"
          layout="prev, pager, next"
          :total="data.pager.total"
          @current-change="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import ruleExplain from "@/components/rule/rule-explain.vue";
import { rangeVolunteer, firstVolunteer } from "@/assets/js/data/rule-explain";
import { getSchoolTimeId } from "@/constants/schoolId-timeId";
// 接口
import volunteerFun from "@/api/volunteer";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
const route = new useRoute();
const schoolId = Number(ref(route.query.schoolId).value);
const data = reactive({
  typeData: [
    {
      label: "第一志愿优先",
      type: 1,
      volunteerRule: firstVolunteer,
    },
    {
      label: "平行志愿",
      type: 2,
      volunteerRule: rangeVolunteer,
    },
  ],
  volunteerRule: "",
  activeName: "first",
  tableData: [],
  timeId: getSchoolTimeId()[0].timeId,
  pager: {
    current: 1,
    size: 10,
    total: 100,
  },
});
// 跳转界面
const handleChangePage = (val) => {
  data.pager.current = val;
  getVounteerDiversion();
};
// 获得最后志愿结果
const getCheckVounteerDiversion = () => {
  volunteerFun.manager
    .checkVolunteerDiversion({
      schoolId: schoolId,
      timeId: data.timeId,
      mateWay: data.volunteerRule,
      current: data.pager.current,
      size: data.pager.size,
    })
    .then((res) => {
      data.pager = {
        size: res.size,
        total: res.total,
        current: res.current,
      };
    });
};
// 根据志愿规则匹配志愿
const getVounteerDiversion = (value) => {
  data.volunteerRule = value;
  volunteerFun.manager
    .volunteerDiversion(schoolId, data.volunteerRule, data.timeId)
    .then((res) => {
      ElMessage.success("志愿匹配成功，正在获取志愿结果");
      getCheckVounteerDiversion();
    })
    .catch((res) => {
      ElMessage.error(res);
    });
};
</script>
<style scoped>
.forecast-profession > div:not(:last-child) {
  margin-bottom: 1rem;
}
.text {
  font-size: 17px;
  margin-bottom: 0.5rem;
  margin: 0;
}
.top {
  display: flex;
  align-items: center;
  height: 30px;
}
.rule-explain {
  max-width: 600px;
}
.bottom > div:not(:last-child) {
  margin-bottom: 1rem;
}
.pager {
  display: flex;
  justify-content: flex-end;
}
</style>
