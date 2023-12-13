<template>
  <div class="school">
    <div class="show-container">
      <div class="title">
        <div class="text">高考科目管理</div>
      </div>
      <div class="context">
        <el-tag
          v-for="tag in data.tags"
          :key="tag.subjectName"
          :type="tag.type"
          class="mx-1"
          size="large"
          effect="light"
          closable
          @close="handleClose(tag.subjectId)"
        >
          {{ tag.subjectName }}
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
// 接口
import managerFun from "@/api/manager";
import { ElMessage } from "element-plus";

const data = reactive({
  tags: [],
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
    addSubject(data.subjectName);
  }
  data.inputVisible = false;
  data.subjectName = "";
};
// 删除科目
const handleClose = (val) => {
  deleteSubject(val);
};
// 给科目设置type
const postType = () => {
  let tags = [];
  const typeList = ["", "success", "info", "danger", "warning"];
  for (let i = 0; i < data.tags.length; i++) {
    tags.push({
      subjectName: data.tags[i].subjectName,
      subjectId: data.tags[i].subjectId,
      type: typeList[i % 5],
    });
  }
  data.tags = tags;
};
// 添加科目
const addSubject = () => {
  managerFun.subject.addSubject(data.subjectName).then((res) => {
    ElMessage.success("添加成功")
    getSubject();
  }).catch((err)=>{
  });
};
// 删除科目
const deleteSubject = (id) => {
  managerFun.subject.deleteSubject(id).then(() => {
    ElMessage.success("删除成功")
    getSubject();
  });
};
// 获得所有科目
const getSubject = () => {
  managerFun.subject.checkSubject().then((res) => {
    data.tags = res;
    postType();
  });
};
onMounted(() => {
  getSubject();
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
      
        