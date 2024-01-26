<template>
  <div class="forecast-profession">
    <div class="top">
      <div class="text">志愿规则选择：</div>
      <div class="choose">
        <el-radio-group v-model="volunteerRule" class="ml-4">
          <el-tooltip class="box-item" effect="light" placement="bottom">
            <template #content>
              <rule-explain :volunteer-rule="firstVolunteer" />
            </template>
            <el-radio label="firstVolunteer" size="large"
              >第一志愿优先</el-radio
            >
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" placement="bottom">
            <template #content>
              <rule-explain :volunteer-rule="rangeVolunteer" />
            </template>
            <el-radio label="rangeVolunteer" size="large">平行志愿</el-radio>
          </el-tooltip>
        </el-radio-group>
      </div>
    </div>
    <div class="middle">
      <div class="left">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="录取名单" name="first">
            <admission-list class="tab-item" />
          </el-tab-pane>
          <el-tab-pane label="未录取名单" name="third">
            <conflict-list />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import ruleExplain from "@/components/rule/rule-explain.vue";
import { rangeVolunteer, firstVolunteer } from "@/assets/js/data/rule-explain";
import admissionList from "@/components/schoo-news/shunt/forecast/admission-list.vue";
import conflictList from "@/components/schoo-news/shunt/forecast/disadmission-list.vue";
const volunteerRule = ref(null);
const activeName = ref("first");
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
</style>