<template>
  <div class="add-role">
    <el-drawer
      ref="drawerRef"
      :with-header="false"
      v-model="form.dialogVisible"
      :before-close="handleClose"
      size="45%"
      class="demo-drawer"
    >
      <div class="add-role-show">
        <div class="top">
          <div class="title item">志愿地址</div>
          <el-divider />
        </div>
        <div class="content item">
          <el-form
            ref="ruleFormRef"
            label-position="top"
            :model="form.ruleForm"
            :rules="form.rules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="组合名称" prop="name">
              <el-input v-model="form.ruleForm.name" />
            </el-form-item>
            <el-form-item label="高考科目数量" prop="subjectNumber">
              <el-input-number
                v-model="form.ruleForm.subjectNumber"
                :min="1"
                :max="form.subjectList.length"
              />
            </el-form-item>
            <el-form-item label="所含科目" prop="subjectScope">
              <el-checkbox-group
                v-model="form.ruleForm.subjectScope"
                size="large"
              >
                <el-checkbox
                  v-for="subject in form.subjectList"
                  :key="subject.subjectName"
                  :label="subject.subjectName"
                >
                  {{ subject.subjectName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="涵盖省份" prop="includingProvinces">
              <div
                class="choose-group"
                v-for="(item, index) in cities"
                :key="index"
              >
                <div class="text">{{ item.text }}:</div>
                <div class="choose-item">
                  <el-checkbox-group
                    v-model="form.ruleForm.includingProvinces"
                    size="large"
                  >
                    <el-checkbox
                      v-for="city in item.list"
                      :key="city"
                      :label="city"
                    >
                      {{ city }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="footer">
          <el-divider />
          <span class="button-footer item">
            <el-button type="primary" @click="handleAddAddress">
              确定
            </el-button>
            <el-button @click="handleClose">取消</el-button>
          </span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script setup>
// 添加地址组合,组合姓名查重
import { onMounted, reactive, ref, watch } from "vue";
// 接口
import managerFun from "@/api/manager";
// 省份数据
import { cities } from "@/assets/js/data/province-name.js";
import { ElMessage } from "element-plus";
const props = defineProps({ addressVal: Object });
const form = reactive({
  dialogVisible: false,
  isChange: false,
  oldAddressName: "",
  subjectList: [],
  ruleForm: {
    areaId: "",
    name: "",
    includingProvinces: [],
    subjectScope: [],
    subjectNumber: 3,
  },
  rules: {
    name: [{ required: true, message: "请输入组合名称", trigger: "blur" }],
    includingProvinces: [
      { required: true, message: "至少选择一个省份", trigger: "blur" },
    ],
    subjectScope: [
      { required: true, message: "请选择所含科目", trigger: "blur" },
    ],
  },
});
// 调用父组件的方法
const emit = defineEmits(["handleClose"]);
// 表单验证
const ruleFormRef = ref(null);
// 关闭对话框
const handleClose = () => {
  // 清空表单验证消息
  ruleFormRef.value.resetFields();
  form.dialogVisible = false;
  form.isChange = false;
  form.ruleForm = {};
  form.ruleForm.subjectNumber = 3;
  // 清楚父组件的信息
  emit("handleClose");
};
// 添加组合
const handleAddAddress = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      // 判断还是添加还是修改学校
      if (form.isChange) {
        changeAreaData();
      } else {
        addAreaData();
      }
    }
  });
};
// 添加地址组合
const addAreaData = () => {
  managerFun.area
    .addArea(form.ruleForm)
    .then((res) => {
      ElMessage.success("操作成功");
    })
    .catch(() => {})
    .finally(() => {
      handleClose();
    });
};
// 修改地址组合
const changeAreaData = () => {
  managerFun.area
    .modifyArea(form.ruleForm)
    .then((res) => {
      ElMessage.success("操作成功");
    })
    .catch((err) => {
      ElMessage.error(err);
    })
    .finally(() => {
      handleClose();
    });
};
// 获得所有科目
const getAllSubject = () => {
  managerFun.subject.checkSubject().then((res) => {
    form.subjectList = res;
  });
};
onMounted(() => {
  getAllSubject();
  if (form.isChange == false) {
    form.ruleForm.subjectNumber = 3;
  }
});
defineExpose({
  form,
});
</script>
<style src="@/assets/css/role/role-drawer-footer.css" scoped></style>
<style scoped>
/* 省份选择展示框 */
.choose-group {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border: 1px solid RGB(220, 223, 230);
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
.choose-group:not(:first-child) {
  border-top: 0px;
}
.choose-group .text {
  min-width: 88px;
  color: RGB(17, 17, 17);
  text-align: center;
}
</style>
@/assets/js/data/province-name.js
