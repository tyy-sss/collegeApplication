<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-08 19:08:52
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-27 15:13:34
 * @FilePath: \collegeApplication\src\test\test1.vue
 * @Description:测试vue文件1
-->
<template>
  <div>
    <div class="search">
      <div class="left">
        <div class="search-item">
          <el-button
            type="primary"
            :icon="Plus"
            @click="form.dialogVisible = true"
            min-width="150"
            >添加学校</el-button
          >
        </div>
        <div class="search-item">
          <el-input
            v-model="form.searchData"
            placeholder="请输入"
            min-width="100"
          >
            <template #suffix>
              <el-icon @click="onSearch"><Search /></el-icon>
            </template>
          </el-input>
        </div>
      </div>
      <div class="right">
        <el-icon :size="23" color="#409EFC" @click="onReSearch"
          ><Refresh
        /></el-icon>
      </div>
    </div>
  </div>
  <!-- 三角形实现 -->
  <div class="xx"></div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
//   数据
const form = reactive({
  searchData: "",
});
</script>

<style lang="scss" scoped>
.xx{
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
.search {
  display: flex;
  justify-content: space-between;
}
.search .left,
.search .right {
  display: flex;
  margin-right: 1rem;
}
.search-item {
  display: flex;
  margin-right: 2rem;
  align-items: center;
}

.search-item .text {
  margin-right: 0.5rem;
  min-width: 5rem;
}
</style>