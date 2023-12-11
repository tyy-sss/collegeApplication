<template>
  <div class="school">
    <div class="show-container">
      <div class="title">
        <div class="text">高考科目管理</div>
      </div>
      <div class="context">
        <el-tag
          v-for="tag in data.tags"
          :key="tag.name"
          :type="tag.type"
          class="mx-1"
          size="large"
          effect="light"
          closable
          @close="handleClose(tag.name)"
        >
          {{ tag.name }}
        </el-tag>
        <el-input
          v-if="data.inputVisible"
          ref="InputRef"
          v-model="data.subjectName"
          class="ml-1 w-20"
          style="width: 120px"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          :icon="Plus"
          class="button-new-tag ml-1"
          style="width: 120px"
          @click="showInput"
          >添加科目</el-button
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { nextTick, onMounted, reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";

const data = reactive({
  tags: ["物理", "化学", "生物", "政治", "历史", "地理"],
  inputVisible: false,
  subjectName: "",
});
const InputRef = ref(null);
// 显示输入框
const showInput = () => {
  data.inputVisible = true;
  nextTick(() => {
    InputRef.value.input.focus();
  });
};
// 添加科目
const handleInputConfirm = () => {
  if (data.subjectName) {
    data.tags.push(data.subjectName);
  }
  data.inputVisible = false;
  data.subjectName = "";
};
// 删除科目
const handleClose = (val) => {};
// 给科目设置type
const postType = () => {
  var tags = [];
  const typeList = ["", "success", "info", "danger", "warning"];
  for (let i = 0; i < data.tags.length; i++) {
    tags.push({
      name: data.tags[i],
      type: typeList[i % 5],
    });
  }
  data.tags = tags;
};
onMounted(() => {
  postType();
});
</script>
<style src="@/assets/css/show-container.css" scoped/>
<style scoped>
.school > div:not(:last-child) {
  margin-bottom: 2rem;
}
.el-tag.is-closable {
  margin-right: 20px;
}
</style>
      
        