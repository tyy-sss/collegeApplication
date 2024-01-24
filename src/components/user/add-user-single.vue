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
                <el-form-item label="姓名:" prop="username">
                  <el-input v-model="form.ruleForm.username" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别:" prop="sex">
                  <el-radio-group v-model="form.ruleForm.sex" class="ml-4">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row  :gutter="15">
              <el-col :span="8">
                <el-form-item label="来源省份:" prop="province">
                  <el-input v-model="form.ruleForm.province" /> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item label="目标学校:" prop="school">
                  <el-input v-model="form.ruleForm.school" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="班级:" prop="className">
                  <el-input v-model="form.ruleForm.className" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="80" v-if="form.isTeacher">
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
                <el-form-item label="选课科目:" prop="subjects">
                  <el-checkbox-group v-model="form.ruleForm.subjects">
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

            <el-row v-if="!form.isTeacher">
              <el-col :span="16">
                <el-form-item label="计划性质:" prop="plan">
                  <el-input v-model="form.ruleForm.plan" /> </el-form-item
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
// 接口
import managerFun from "@/api/manager";
import { onMounted, reactive, ref } from "vue";
import {
  nationList,
  politicsStatusList,
  subjectList,
} from "@/assets/js/data/information-dropdown-data";
import {
  NAME_TEST,
} from "@/constants/regular-expression";
import { ElMessage } from "element-plus";

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
  isTeacher: true,
  dialogVisible: false,
  ruleForm: {
    userNumber: "",
    username: "",
    sex: "",
    className: "",
    school: "",
    province: "",
    subjects: [],
    plan: "",
  },
  rules: {
    userNumber: [{ required: true, message: "请输入", trigger: "blur" }],
    username: [
      { required: true, message: "请输入姓名", trigger: "blur" },
      { pattern: NAME_TEST, message: "请输入正确的姓名", trigger: "blur" },
    ],
    sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
    province: [{ required: true, message: "请输入", trigger: "blur" }],
    school: [{ required: true, message: "请输入", trigger: "blur" }],
    className: [{ required: true, message: "请输入", trigger: "blur" }],
    politicsStatus: [{ required: true, message: "请输入", trigger: "blur" }],
    subjects: [
      { required: true, message: "请输入", trigger: "blur" },
      { validator: validateElectiveSubject, trigger: "blur" },
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
const emit = defineEmits(["getUserList"]);
// 表单验证
const ruleFormRef = ref(null);
// 添加用户
const handleAddUser = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      const addData = [];
      if (form.isTeacher) {
        const teacher = reactive({
          userNumber: form.ruleForm.userNumber,
          username: form.ruleForm.username,
          sex: form.ruleForm.sex,
          politicsStatus: form.ruleForm.politicsStatus,
          nation: form.ruleForm.nation,
          phone: form.ruleForm.phone,
        });
        addData.push(teacher);
        addTeacherList(addData);
      } else {
        // 添加学生
        addData.push(form.ruleForm);
        adduerList(addData);
      }
    }
  });
};
// 上传成功之后
const handleClose = () => {
  // 清空表单验证消息
  new Promise((resolve, reject) => {
    resolve((form.dialogVisible = false));
  }).then(() => {
    ruleFormRef.value.resetFields();
    form.ruleForm.politicsStatus = "";
    emit("getUserList");
  });
};
// 添加用户接口
const adduerList = (val) => {
  // 把学生数据传给后端
  managerFun.user
    .addStudentsByExcel(val)
    .then((res) => {
      ElMessage.success(res);
    })
    .finally(() => {
      handleClose();
    });
};
// 添加老师接口
const addTeacherList = (val) => {
  managerFun.user
    .addTeacherByExcel(val)
    .then((res) => {
      ElMessage.success(res);
    })
    .finally(() => {
      handleClose();
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
  