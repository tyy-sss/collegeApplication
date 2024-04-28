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
                <el-button type="primary" :icon="Plus" @click="addClass">
                  添加班级
                </el-button>
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
            <el-table-column label="班主任账号" property="userNumber" />
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
              @size-change="getClassList"
              @current-change="getClassList"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 对话框 -->
    <el-dialog
      v-model="data.dialogVisible"
      :title="data.isChange ? '修改班级' : '添加班级'"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleFormRef"
        label-position="top"
        :model="data.form"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="班级名称" prop="className">
          <el-input v-model="data.form.className" :disabled="data.isChange" />
          <div class="prompt">请输入长度在5到20位之间的中文数字</div>
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
import { DELAY_TIME } from "@/constants/date";
import { debounce } from "@/assets/js/utils/throttle";
// 接口添加 获得班主任列表，按年搜索班级，班级姓名查重，添加班级，删除班级，搜索学校
import managerFun from "@/api/manager";
//   数据
const data = reactive({
  dialogVisible: false,
  isChange: false,
  oldClassName: "吉首大学",
  searchData: "",
  form: {
    classId: "",
    className: "",
    userNumber: "",
  },
  // 班主任信息数据
  options: [],
  // 分页数据
  page: {
    pageSize: [10, 15, 20],
    currentPage: 1,
    nowPageSize: 10,
    pageCount: 5,
    total: 0,
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
        if (data.form.userNumber == "-1") {
          // 删除班主任
          classAdviser();
        } else {
          changeClassData();
        }
      } else {
        addClassData();
      }
    }
  });
};
// 关闭对话框
const handleClose = () => {
  new Promise((resolve, reject) => {
    resolve((data.dialogVisible = false));
  }).then(() => {
    ruleFormRef.value.resetFields();
    data.isChange = false;
    data.form = {};
  });
};
// 搜索班级
const onSearch = debounce(() => {
  data.searchData = formatDate(data.searchData).slice(0, 4);
  getClassList();
}, DELAY_TIME);
// 重置搜索
const onReSearch = debounce(() => {
  data.searchData = "";
  getClassList();
}, DELAY_TIME);
// 修改班级信息
const handleChangeClass = (val) => {
  new Promise((resolve, reject) => {
    // 获取老师列表
    resolve(getTeacherList());
  }).then(() => {
    if (val.userNumber != null) {
      data.options.push({ userNumber: val.userNumber, username: val.username });
    }
  });
  data.form = Object.assign({}, val);
  // 如果有班主任
  if (val.userNumber != null) {
    data.form.userNumber = val.userNumber;
  }
  data.oldClassName = val.className;
  data.isChange = true;
  data.dialogVisible = true;
};
// 删除班级
const handleDeleteClass = (val) => {
  const classList = [];
  classList.push(val.classId);
  // 删除班级
  deleteClassList(classList);
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
    const classList = [];
    multipleSelection.value.forEach((item) => {
      classList.push(item.classId);
    });
    // 删除班级
    deleteClassList(classList);
  }
};
// 添加班级信息接口
const addClassData = () => {
  managerFun.class
    .addClass(data.form.userNumber, data.form.className)
    .then((res) => {
      ElMessage.success(res);
    })
    .catch(() => {})
    .finally(() => {
      getClassList();
      handleClose();
    });
};
// 修改班级信息接口
const changeClassData = () => {
  managerFun.class
    .changeClass(data.form.classId, data.form.userNumber, data.form.className)
    .then((res) => {
      ElMessage.success(res);
    })
    .catch(() => {})
    .finally(() => {
      getClassList();
      handleClose();
    });
};
// 删除班级信息接口
const deleteClassList = (val) => {
  ElMessageBox.confirm("确定删除所选班级", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      managerFun.class
        .deleteClass(val)
        .then((res) => {
          ElMessage.success(res);
        })
        .catch(() => {})
        .finally(() => {
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
// 删除班主任
const classAdviser = () => {
  managerFun.class
    .adviser(data.form.classId)
    .then((res) => {
      ElMessage.success("操作成功");
    })
    .catch(() => {})
    .finally(() => {
      getClassList();
      handleClose();
    });
};
// 获得老师信息接口
const getTeacherList = () => {
  // 获得老师列表
  managerFun.user.getTeacherList().then((res) => {
    console.log(res);
    data.options = res;
    data.options.push({
      username: "不设置班主任",
      userNumber: "-1",
    });
  });
};
// 获得班级信息接口
const getClassList = () => {
  managerFun.class
    .searchClass(
      Number(data.searchData),
      data.page.currentPage,
      data.page.nowPageSize
    )
    .then((res) => {
      data.page.total = parseInt(res.total);
      data.page.currentPage = res.current;
      data.tableData = res.records;
    })
    .catch((err) => {});
};
onMounted(() => {
  getClassList();
});
</script>
<style src="@/assets/css/utils/table-center.css" scoped />
<style src="@/assets/css/show-container.css" scoped />
<style src="@/assets/css/search-top-left-right.css" scoped />
<style src="@/assets/css/pager.css" scoped />
<style src="@/assets/css/utils/table-empty.css" scoped />
<style scoped>
.middle {
  display: flex;
  /* 自动换行 */
  flex-flow: wrap;
  align-items: center;
}
</style>
