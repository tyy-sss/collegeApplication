<template>
  <div class="profession-limit">
    <div class="context">
      <div class="add">
        <div class="add-item">
          <el-button
            color="#626aef"
            :icon="Plus"
            @click="handleAddProfessionInformation"
            >添加科目</el-button
          >
          <profession-information
            ref="professionInformationRef"
            @get-profession-list="resetProfessionList"
          />
        </div>
        <!-- <div class="add-item">
          <el-button
            type="success"
            :icon="Share"
            @click="handleCheckProfessionAddress"
            >选择志愿地区组合</el-button
          >
          <profession-address ref="professionAddressRef" />
        </div> -->
      </div>
      <div class="top">
        <div class="search">
          <div class="left">
            <div class="search-item">
              <div class="text">
                <el-select
                  v-model="data.searchData.searchType"
                  placeholder="请选择搜索类型"
                >
                  <el-option
                    v-for="item in data.searchData.typeOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </div>
              <div v-if="data.searchData.isSearch" class="input">
                <el-input
                  v-model="data.searchData.searchName"
                  placeholder="请输入具体信息"
                />
              </div>
            </div>
          </div>
          <div class="right">
            <div class="search-button">
              <el-button type="primary" @click="handleSearchProfession"
                >查询</el-button
              >
            </div>
            <div class="search-button">
              <el-button type="primary" @click="resetProfessionList"
                >重置</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="add">
        <div class="add-item">
          <el-button
            type="primary"
            :icon="Download"
            @click="handleExportProfession"
            >导出单页信息</el-button
          >
        </div>
        <div class="add-item">
          <el-button
            type="primary"
            :icon="Download"
            @click="handleExportAllProfeesion"
            >导出所有信息</el-button
          >
        </div>
      </div>
      <div class="middle">
        <el-table :data="data.tableData" border stripe style="width: 100%">
          <el-table-column prop="college" label="教学学院" />
          <el-table-column prop="name" label="专业名称" />
          <el-table-column
            v-for="(item, index) in data.tableHeader"
            :key="index"
            :prop="item.areaId"
            :label="item.name"
            min-width="180"
          >
            <template #default="scope">
              <el-cascader
                ref="cascaderRef"
                v-model="
                  scope.row.subjectRule.filter((element) => {
                    return element.areaId == Number(item.areaId);
                  })[0].strings
                "
                :options="item.options"
                :show-all-levels="false"
                @change="handleChangeChooseValue($event, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="enrollmentNumber" label="限制人数">
            <template #default="scope">
              <el-input-number
                v-model="scope.row.enrollmentNumber"
                class="mx-4"
                :min="0"
                controls-position="right"
                @change="handleChangeEnrollmentNumber(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                type="danger"
                @click="handleDeleteProfession(scope.row)"
                >删除专业</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom">
        <div class="pager">
          <div class="page-news">共{{ data.page.total }}条信息</div>
          <el-pagination
            v-model:current-page="data.page.currentPage"
            v-model:page-size="data.page.nowPageSize"
            :page-sizes="data.page.pageSize"
            :pager-count="data.page.pageCount"
            layout="prev, pager, next,sizes,jumper"
            :total="data.page.total"
            @size-change="getShcoolMajor"
            @current-change="getShcoolMajor"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import professionInformation from "@/components/schoo-news/limit/profession-information.vue";
import professionAddress from "@/components/schoo-news/limit/profession-address.vue";
import { Download, Plus } from "@element-plus/icons-vue";
// 接口
import managerFun from "@/api/manager";
// 获得路由显示的学校id
const route = new useRoute();
const schoolId = ref(route.query.schoolId).value;
// 下拉框数据
import {
  optionsChoose,
} from "@/assets/js/profession/address-cascader";
// 数据处理
import {
  handleCascaderData,
  handleCascaderDataForEnrollmentNumber,
} from "@/assets/js/profession/profession-send-data";
import {
  handleProfessionExportData,
  handleAllProfessionExportData,
} from "@/assets/js/excel/profession/profession-export";
import {
  handleTableData,
  handleTableDataForSingle,
} from "@/assets/js/profession/profeesion-receive-data";
import { debounce } from "@/assets/js/utils/throttle";
import { ElMessage, ElMessageBox } from "element-plus";
const data = reactive({
  // 搜索数据
  searchData: {
    searchType: "",
    searchName: "",
    isSearch: false,
    typeOptions: ["学院", "专业名称"],
  },
  // 分页数据
  page: {
    pageSize: [10, 15, 20],
    currentPage: 1,
    nowPageSize: 10,
    pageCount: 5,
    total: 0,
  },
  // 表头数据
  tableHeader: [],
  // 表格数据
  tableData: [],
});
const professionInformationRef = ref(null);
// 添加科目
const handleAddProfessionInformation = () => {
  professionInformationRef.value.data.dialogTableVisible = true;
};
// 搜索
const handleSearchProfession = () => {
  if (!data.searchData.isSearch || data.searchData.searchName == "") {
    ElMessage.error("请输入正确数据");
  } else {
    getShcoolMajor();
  }
};
// 导出信息
const handleExportProfession = () => {
  handleProfessionExportData(data.tableHeader, data.tableData);
};
// 导出所有的专业限制信息
const handleExportAllProfeesion = () => {
  // managerFun.major.allMajor(schoolId).then((res)=>{
  //   handleAllProfessionExportData(data.tableHeader,res)
  // }).catch((err)=>{
  // })
};
// 删除专业
const handleDeleteProfession = (val) => {
  ElMessageBox.confirm("确定删除所选地址组合", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      managerFun.major
        .deleteMajor(val.majorId)
        .then((res) => {
          ElMessage.success("操作成功");
        })
        .catch(() => {})
        .finally(() => {
          getShcoolMajor();
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};
// 修改专业的录取人数
const handleChangeEnrollmentNumber = debounce((val) => {
  changeMajor(handleCascaderDataForEnrollmentNumber(val));
}, 500);
const cascaderRef = ref(null);
// 修改限制专业地区的值
const handleChangeChooseValue = (chooseVal, rowVal) => {
  changeMajor(handleCascaderData(chooseVal, rowVal), rowVal);
};
// 修改单个专业限制信息
const changeMajor = (val, rowVal) => {
  managerFun.major
    .modifyMajor(val)
    .then((res) => {
      // 处理回显数据
      data.tableData = handleTableDataForSingle(res, data.tableData);
    })
    .catch(() => {
      getShcoolMajor();
    })
    .finally(() => {});
};
// 获取要展示的地区组合信息
const getAreaList = () => {
  managerFun.area.selectArea("").then((res) => {
    data.tableHeader = [];
    if (res.length != 0) {
      res.forEach((item) => {
        data.tableHeader.push({
          areaId: String(item.areaId),
          name: item.name,
          options: optionsChoose(
            JSON.parse(item.subjectScope),
            item.areaId,
            item.subjectNumber
          ),
        });
      });
    }
  });
};
// 通过学校id获取专业信息
const getShcoolMajor = () => {
  managerFun.major
    .selectSchoolMajor(
      schoolId,
      data.searchData.searchType,
      data.searchData.searchName,
      data.page.currentPage,
      data.page.nowPageSize
    )
    .then((res) => {
      // 分页数据处理
      data.page.currentPage = res.current;
      data.page.total = res.total;
      data.page.nowPageSize = res.size;
      // 表格数据处理 处理strings数组最后一个元素的strings属性
      data.tableData = handleTableData(res, data.tableHeader);
    })
    .catch(() => {});
};
// 上传成功之后获得专业信息
const resetProfessionList = () => {
  data.page.currentPage = 1;
  data.page.nowPageSize = 10;
  data.searchData.searchType = "";
  data.searchData.searchName = "";
  getShcoolMajor();
};
watch(
  () => data.searchData.searchType,
  (newVal, oldVal) => {
    if (newVal) {
      data.searchData.isSearch = true;
    } else {
      data.searchData.isSearch = false;
    }
    data.searchData.searchName = "";
  }
);
onMounted(() => {
  new Promise((resolve, reject) => {
    resolve(getAreaList());
  }).then(() => {
    getShcoolMajor();
  });
});
// const professionAddressRef = ref(null);
// 选择志愿组合
// const handleCheckProfessionAddress = () => {
//   professionAddressRef.value.data.dialogVisible = true;
// };
</script>
<style src="@/assets/css/utils/table-center.css" scoped />
<style src="@/assets/css/show-container.css" scoped />
<style src="@/assets/css/search-top-left-right.css" scoped />
<style src="@/assets/css/pager.css" scoped />
<style scoped>
.profession-limit {
  display: flex;
  justify-content: center;
  align-items: center;
}
.context {
  width: 100%;
  min-width: 800px;
  /* background-color: RGBA(237, 242, 246, 0.5); */
  border-radius: 1rem;
}
/* 头部样式设置 */
.top > div,
.middle {
  margin-bottom: 1rem;
}
.top .search .right {
  width: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 5rem;
}
.top .search .right > div {
  margin-right: 1rem;
}
.add {
  display: flex;
}
.add-item {
  margin-right: 1rem;
}
</style>
