<template>
  <div class="school">
    <div class="show-container">
      <div class="title">
        <div class="text">学校管理</div>
      </div>
      <div class="context">
        <div class="top">
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
        <div class="bottom">
          <div class="item" @click="checkSchoolNews">
            <div class="first-char">吉</div>
            <div class="school-name">吉首大学</div>
            <div class="school-id">学校编号</div>
            <div>
              <el-button type="warning" @click="changeSchool">修改</el-button>
              <el-button type="danger" @click="deleteSchool">删除</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 学校信息 -->
      <school-table />
      <!-- 志愿地区管理 -->
      <volunteer-address />
      <!-- 志愿规则说明 -->
      <volunteer-rule-explain />
    </div>
    <!-- 对话框 -->
    <el-dialog
      v-model="form.dialogVisible"
      title="添加学校"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleFormRef"
        label-position="top"
        :model="form.ruleForm"
        :rules="form.rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="学校名称" prop="name">
          <el-input v-model="form.ruleForm.name" />
          <div class="prompt">请输入长度在2到20位之间的中英文字母</div>
        </el-form-item>
        <el-form-item label="学校编号" prop="number">
          <el-input v-model="form.ruleForm.number" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleAddSchool"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import schoolTable from "@/components/school/school-table.vue";
import volunteerRuleExplain from "@/components/school/volunteer-rule-explain.vue";
import volunteerAddress from "@/components/school/volunteer-address.vue";
import { useRouter } from "vue-router";
const router = useRouter();

// 接口添加 学校姓名查重，添加学校，修改学校，删除学校，搜索学校
const validateName = (rule, value, callback) => {
  if (
    (form.isChange === false && value) ||
    (form.isChange === true && value != form.oldSchoolName)
  ) {
    // 学校查重
    callback(new Error("学校姓名重复"));
  }
  callback();
};
//   数据
const form = reactive({
  dialogVisible: false,
  isChange: false,
  oldSchoolName: "吉首大学",
  searchData: "",
  ruleForm: {
    name: "",
    number: "",
  },
  rules: {
    // 添加查重学校姓名
    name: [
      { required: true, message: "请输入学校名", trigger: "blur" },
      {
        min: 2,
        max: 20,
        pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
        message: "请输入中文或英文（2~20位）",
        trigger: "blur",
      },
      { validator: validateName, trigger: "blur" },
    ],
  },
});
// 表单验证
const ruleFormRef = ref(null);
// 修改学校
const changeSchool = () => {
  form.isChange = true;
  form.ruleForm = {
    name: "吉首大学",
    number: "学校编号",
  };
  form.oldSchoolName = "吉首大学";
  form.dialogVisible = true;
};
// 删除学校
const deleteSchool = () => {
  ElMessageBox.confirm("确定删除这个学校", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // 删除学校
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};
// 手动添加或者修改学校
const handleAddSchool = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      // 判断还是添加还是修改学校
      // 清空表单验证消息
      ruleFormRef.value.resetFields();
    }
  });
};
// 关闭对话框
const handleClose = () => {
  // 清空表单验证消息
  ruleFormRef.value.resetFields();
  form.dialogVisible = false;
};
// 查看学校的具体消息
const checkSchoolNews = () => {
  // 跳转界面
  const href = router.resolve({
    path: "/school-manager/school-news",
    query: {
      id: "1",
    },
  });
  window.open(href.href, "_blank");
};
// 搜索学校
const onSearch = () => {};
const onReSearch = () => {};
</script>
<style src="@/assets/css/show-container.css" scoped/>
<style src="@/assets/css/search-top-left-right.css" scoped/>
<style scoped>
.bottom {
  display: flex;
  /* 自动换行 */
  flex-flow: wrap;
  align-items: center;
}
/* 学校展示样式 */
.item {
  border: 2px solid RGB(235, 235, 235);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
  margin-bottom: 2rem;
  height: 100%;
}
.item:not(:last-child) {
  padding: 1.5rem;
}
/* 设置item下的div除了最后一个孩子 */
.item > div:not(:last-child) {
  margin-bottom: 1rem;
}
/* 学校具体展示样式 */
.first-char {
  height: 3rem;
  width: 3rem;
  border: 3px solid RGB(104, 164, 252);
  border-radius: 100% 100% 30% 100%;
  box-shadow: 10px 5px 5px RGBA(134, 180, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: cursive;
  font-size: 30px;
  font-weight: bolder;
}
.school-name {
  font-weight: bolder;
  font-size: 18px;
}
.school-id {
  color: RGB(168, 176, 185);
  font-size: 14px;
}
/* 添加学校 */
.item .add img {
  width: 2rem;
  height: 2rem;
}
.item:hover {
  transform: translateY(-2px);
  box-shadow: 10px 5px 5px RGBA(74, 84, 85, 0.2);
}
</style>
  
    