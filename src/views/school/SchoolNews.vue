<template>
  <div class="show-container">
    <div class="title">
      <div class="text">吉首大学</div>
    </div>
    <div class="context">
      <el-tabs type="border-card" class="demo-tabs" v-model="activeName">
        <el-tab-pane label="专业限制" name="first">
          <profession-limit/>
        </el-tab-pane>
        <el-tab-pane label="专业分流" name="third">
          <profession-shunt/>
        </el-tab-pane>
        <el-tab-pane label="志愿填报时间" name="second">
          <volunteer-time />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import volunteerTime from "@/components/schoo-news/volunteer-time.vue";
import professionLimit from "@/components/schoo-news/profession-limit.vue";
import professionShunt from '@/components/schoo-news/profession-shunt.vue'
const route = useRoute();
const id = ref(route.query.id);
let activeName = ref('first')
</script>
<style src="@/assets/css/show-container.css" scoped/>
<style scoped>
.el-divider--horizontal {
  margin: 0;
}
::v-deep .el-tab-pane {
  padding:1rem;
}
/* 设置菜单栏文字显示 */
::v-deep .el-tabs__item {
  font-size: 15px;
  font-size: medium;
}
</style>