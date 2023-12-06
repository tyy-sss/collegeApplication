<template>
  <div class="class">
    <div class="show-container">
      <div class="title">
        <div class="text">班级管理</div>
      </div>
      <div class="context">
        <div class="top">
          <div class="search">
            <div class="left">
              <div class="search-item">
                <el-button type="primary" :icon="Plus" @click="addClass">{{
                  data.isChange ? "修改班级" : "添加班级"
                }}</el-button>
              </div>
              <div class="search-item">
                <el-date-picker
                  v-model="data.searchData"
                  type="year"
                  placeholder="请选择年份"
                  @change="onSearch"
                />
              </div>
            </div>
            <div class="right">
              <el-icon :size="23" color="#409EFC" @click="onReSearch"
                ><Refresh
              /></el-icon>
            </div>
          </div>
        </div>
        <div class="middle">
          <el-table
            ref="multipleTableRef"
            :data="data.tableData"
            border
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column label="班级编号" property="classId" />
            <el-table-column label="班级名称" property="className" />
            <el-table-column label="班主任" property="username" />
            <el-table-column label="班主任联系方式" property="phone" />
            <el-table-column label="班级人数" property="size" />
            <el-table-column label="操作" min-width="180px">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  @click="handleChangeClass(scope.row)"
                  >修改班级信息</el-button
                >
                <el-button
                  link
                  type="success"
                  @click="handleDeleteClass(scope.row)"
                  >删除班级</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </div>
        <div class="bottom">
          <div class="button">
            <el-button type="primary" @click="handleBatchDeleteClass"
              >批量删除班级</el-button
            >
          </div>
          <el-divider />
          <div class="pager">
            <div class="page-news">共{{ data.page.total }}条信息</div>
            <el-pagination
              v-model:current-page="data.page.currentPage"
              v-model:page-size="data.page.nowPageSize"
              :page-sizes="data.page.pageSize"
              :pager-count="data.page.pageCount"
              layout="prev, pager, next,sizes,jumper"
              :total="data.page.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 对话框 -->
    <el-dialog
      v-model="data.dialogVisible"
      title="添加班级"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleFormRef"
        label-position="top"
        :model="data.form"
        :rules="data.rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="班级名称" prop="className">
          <el-input v-model="data.form.className" />
          <div class="prompt">请输入长度在2到20位之间的中文数字</div>
        </el-form-item>
        <el-form-item label="选择班主任" prop="number">
          <el-select v-model="data.form.userNumber" placeholder="选择班主任">
            <el-option
              v-for="item in data.options"
              :key="item.userNumber"
              :label="item.username"
              :value="item.userNumber"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleAddClass"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
  <script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { formatDate } from "@/assets/js/utils/format-date";
// 接口添加 获得班主任列表，按年搜索班级，班级姓名查重，添加班级，删除班级，搜索学校
import managerFun from "@/api/manager";
const validateName = async (rule, value, callback) => {
  if (
    (data.isChange === false && value) ||
    (data.isChange === true && value != data.oldClassName)
  ) {
    await managerFun.class
      .existsClass(value)
      .then((res) => {
        callback();
      })
      .catch((err) => {
        callback(new Error(err.msg));
      });
  }
  callback();
};
//   数据
const data = reactive({
  dialogVisible: false,
  isChange: false,
  oldClassName: "吉首大学",
  searchData: "",
  form: {
    className: "",
    userNumber: "",
  },
  rules: {
    // 添加查班级姓名
    className: [
      { required: true, message: "请输入班级名", trigger: "blur" },
      { validator: validateName, trigger: "blur" },
    ],
  },
  // 班主任信息数据
  options: [],
  // 分页数据
  page: {
    pageSize: [10, 15, 20],
    currentPage: 1,
    nowPageSize: 10,
    pageCount: 5,
    total: 700,
  },
  // 表格数据
  tableData: [],
});
// 表单验证
const ruleFormRef = ref(null);
// 打开对话框
const addClass = () => {
  data.dialogVisible = true;
  // 获得老师列表
  managerFun.user.getTeacherList().then((res) => {
    data.options = res;
  });
};
// 手动添加或者修改班级
const handleAddClass = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      if (data.isChange) {
        managerFun.class
          .changeClass(data.form.userNumber, data.form.className)
          .then((res) => {
            ElMessage.success(res);
            getClassList();
            handleClose();
          });
      } else {
        // 判断还是添加还是修改班级
        managerFun.class
          .addClass(data.form.userNumber, data.form.className)
          .then((res) => {
            ElMessage.success(res);
            getClassList();
            handleClose();
          });
      }
    }
  });
};
// 关闭对话框
const handleClose = () => {
  // 清空表单验证消息
  data.dialogVisible = false;
  ruleFormRef.value.resetFields();
  data.isChange = false;
  data.form.userNumber = "";
};
// 搜索班级
const onSearch = () => {
  data.searchData = formatDate(data.searchData).slice(0, 4);
  getClassList();
};
// 重置搜索
const onReSearch = () => {
  data.searchData = "";
  getClassList();
};
// 修改班级信息
const handleChangeClass = (val) => {
  // 获得老师列表
  managerFun.user.getTeacherList().then((res) => {
    data.options = res;
  });
  console.log(val);
  data.form.className = val.className;
  data.form.userNumber = val.userNumber;
  data.oldClassName = val.className;
  data.isChange = true;
  data.dialogVisible = true;
};
// 删除班级
const handleDeleteClass = (val) => {
  ElMessageBox.confirm("确定删除这个班级", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {

      // 删除学校
      const classList = [];
      classList.push(val.classId);
      // 删除班级
      managerFun.class.deleteClass(classList).then((res) => {
        ElMessage.success(res);
        getClassList();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};
// 批量处理
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
// 批量删除班级
const handleBatchDeleteClass = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.error("请至少选择一个班级");
  } else {
    ElMessageBox.confirm("确定删除", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        const classList = [];
        multipleSelection.value.forEach((item) => {
          classList.push(item.classId);
        });
        // 删除班级
        managerFun.class.deleteClass(classList).then((res) => {
          ElMessage.success(res);
          getClassList();
        });
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消删除",
        });
      });
  }
};
// 修改每页的个数
const handleSizeChange = () => {};
// 页码跳转界面
const handleCurrentChange = () => {
  alert(data.page.currentPage);
};
// 获得班级信息
const getClassList = () => {
  managerFun.class
    .searchClass(
      Number(data.searchData),
      data.page.currentPage,
      data.page.nowPageSize
    )
    .then((res) => {
      console.log(res);
      data.tableData = res.records;
      data.page.total = res.total;
      data.page.currentPage = res.current;
    })
    .catch((err) => {});
};
onMounted(() => {
  getClassList();
});
</script>
<style src="@/assets/css/utils/table-center.css" scoped/>
<style src="@/assets/css/show-container.css" scoped/>
<style src="@/assets/css/search-top-left-right.css" scoped/>
<style src="@/assets/css/pager.css" scoped/>
<style scoped>
.middle {
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
    
      