<template>
  <div class="add-user">
    <el-drawer
      ref="drawerRef"
      :with-header="false"
      v-model="form.dialogVisible"
      :before-close="handleClose"
      class="demo-drawer"
      size="50%"
    >
      <div class="add-user-show add-show">
        <div class="top">
          <div class="title item">添加用户</div>
          <el-divider />
        </div>
        <div class="choose-role">
          <div class="role-text">老师</div>
          <el-switch v-model="form.isTeacher" />
          <div class="role-text">学生</div>
        </div>
        <div class="content item">
          <el-form
            ref="ruleFormRef"
            label-position="right"
            :model="form.ruleForm"
            :rules="form.rules"
            label-width="85px"
          >
            <el-row :gutter="15">
              <el-col :span="8">
                <el-form-item
                  :label="form.isTeacher ? '工号:' : '学号:'"
                  prop="userNumber"
                >
                  <el-input v-model="form.ruleForm.userNumber" /> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item label="姓名:" prop="userName">
                  <el-input v-model="form.ruleForm.userName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别:" prop="sex">
                  <el-radio-group v-model="form.ruleForm.sex" class="ml-4">
                    <el-radio label="man">男</el-radio>
                    <el-radio label="woman">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="!form.isTeacher" :gutter="15">
              <el-col :span="8">
                <el-form-item label="来源省份:" prop="province">
                  <el-input v-model="form.ruleForm.province" /> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item label="目标学校:" prop="targetSchool">
                  <el-input v-model="form.ruleForm.targetSchool" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="班级:" prop="className">
                  <el-input v-model="form.ruleForm.className" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="80">
              <el-col :span="12">
                <el-form-item label="政治面貌:" prop="politicalStatus">
                  <el-select
                    v-model="form.ruleForm.politicsStatus"
                    class="m-2"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in dropDownData.politicsStatusList"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="民族:" prop="nation">
                  <el-autocomplete
                    v-model="form.ruleForm.nation"
                    :fetch-suggestions="queryEthniGroupString"
                    clearable
                    class="inline-input w-50"
                    placeholder="请输入民族"
                    @select="handleSelectEthnicGroup"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="!form.isTeacher">
              <el-col :span="24">
                <el-form-item label="选课科目:" prop="electiveSubject">
                  <el-checkbox-group v-model="form.ruleForm.electiveSubject">
                    <el-checkbox
                      v-for="subject in dropDownData.subjectList"
                      :key="subject"
                      :label="subject"
                    >
                      {{ subject }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item></el-col
              >
            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item
                  v-if="!form.isTeacher"
                  label="身份证号:"
                  prop="idCard"
                >
                  <el-input v-model="form.ruleForm.idCard" /> </el-form-item
              ></el-col>
            </el-row>

            <el-row v-if="!form.isTeacher">
              <el-col :span="16">
                <el-form-item label="计划性质:" prop="plan">
                  <el-input v-model="form.ruleForm.plan" /> </el-form-item
              ></el-col>
            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item
                  v-if="!form.isTeacher"
                  label="家庭地址:"
                  prop="address"
                >
                  <el-input v-model="form.ruleForm.address" /> </el-form-item
              ></el-col>
            </el-row>

            <el-row :gutter="40">
              <el-col :span="12">
                <el-form-item label="联系电话:" prop="phone">
                  <el-input v-model="form.ruleForm.phone" /> </el-form-item
              ></el-col>
              <el-col v-if="!form.isTeacher" :span="12">
                <el-form-item label="父母电话:" prop="parentPhone">
                  <el-input
                    v-model="form.ruleForm.parentPhone"
                  /> </el-form-item
              ></el-col>
            </el-row>
          </el-form>
        </div>
        <div class="footer">
          <el-divider />
          <span class="button-footer item">
            <el-button type="primary" @click="handleAddUser"> 确定 </el-button>
            <el-button @click="handleClose">取消</el-button>
          </span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
  <script setup>
// 添加用户
import { onMounted, reactive, ref } from "vue";
import {
  nationList,
  politicsStatusList,
  subjectList,
} from "@/assets/js/data/information-dropdown-data";
import {
  IDENTITY_TEST,
  PHONE_TEST,
} from "@/assets/js/utils/regular-expression";

// 验证信息
const validateElectiveSubject = (rule, value, callback) => {
  console.log(value);
  if (value.length !== 3) {
    callback(new Error("科目数应该为3个"));
  }
  callback();
};
// 表单数据
const form = reactive({
  // 角色是否是老师
  isTeacher: false,
  dialogVisible: false,
  ruleForm: {
    userNumber: "",
    userName: "",
    sex: "",
    idCard: "",
    politicsStatus: "",
    nation: "",
    className: "",
    school: "",
    province: "",
    subjects: [],
    plan: "",
    address: "",
    phone: "",
    parentPhone: "",
  },
  rules: {
    userNumber: [{ required: true, message: "请输入", trigger: "blur" }],
    userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
    province: [{ required: true, message: "请输入", trigger: "blur" }],
    school: [{ required: true, message: "请输入", trigger: "blur" }],
    className: [{ required: true, message: "请输入", trigger: "blur" }],
    politicsStatus: [{ required: true, message: "请输入", trigger: "blur" }],
    nation: [{ required: true, message: "请输入", trigger: "blur" }],
    subjects: [
      { required: true, message: "请输入", trigger: "blur" },
      { validator: validateElectiveSubject, trigger: "blur" },
    ],
    idCard: [
      { required: true, message: "请输入", trigger: "blur" },
      {
        pattern: IDENTITY_TEST,
        message: "请输入正确的身份证号",
        trigger: "blur",
      },
    ],
    phone: [
      {
        pattern: PHONE_TEST,
        message: "请输入正确的手机号码",
        trigger: "blur",
      },
    ],
    parentPhone: [
      {
        pattern: PHONE_TEST,
        message: "请输入正确的手机号码",
        trigger: "blur",
      },
    ],
  },
});
// 下拉框数据
const dropDownData = reactive({
  politicsStatusList: politicsStatusList,
  nationList: nationList,
  subjectList: subjectList,
});
// 自动补全输入框
const queryEthniGroupString = (nation, cb) => {
  const results = nation
    ? dropDownData.nationList.filter(createFilter(nation))
    : dropDownData.nationList;
  cb(results);
};
const handleSelectEthnicGroup = (val) => {
  form.ruleForm.nation = val.value;
};
// 自动补全输入框过滤信息
const createFilter = (queryString) => {
  return (restaurant) => {
    return restaurant.value.indexOf(queryString) === 0;
  };
};
// 调用父组件的方法
const emit = defineEmits(["handleClose"]);
// 表单验证
const ruleFormRef = ref(null);
// 关闭对话框
const handleClose = () => {
  // 清空表单验证消息
  ruleFormRef.value.resetFields();
  form.dialogVisible = false;
  // 清楚父组件的信息
  emit("handleClose");
};
// 添加角色
const handleAddUser = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      // 判断还是添加还是修改学校
      // 清空表单验证消息
      // 重新刷新角色列表
      ruleFormRef.value.resetFields();
    }
  });
};
onMounted(() => {
  console.log(dropDownData);
});
defineExpose({ form });
</script>
  <style src="@/assets/css/role/role-drawer.css" scoped>
</style>
<style scoped>
.choose-role {
  display: flex;
  align-items: center;
  color: RGB(96, 98, 102);
  margin: 1rem 1rem;
}
.choose-role > div {
  margin-right: 0.5rem;
}
/* 多选框 */
.checkbox-group {
  display: flex;
}
</style>
  