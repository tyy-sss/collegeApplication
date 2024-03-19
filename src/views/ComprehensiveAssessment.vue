<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-27 20:45:21
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-19 13:54:57
 * @FilePath: \collegeApplication\src\views\ComprehensiveAssessment.vue
 * @Description: 测评小组综合测评表编辑页面
-->
<template>
  <div class="show-container">
    <div class="title">
      <div class="text">综合测评表编辑</div>
    </div>
    <hr />
    <!-- 可选月份标题 -->
    <div class="checkMonth">
      <el-select
        v-model="data.curMonth"
        placeholder="请选择要查询的综测月份"
        style="width: 200px"
        @change="getAssessmentDetails"
      >
        <el-option
          v-for="item in data.monthes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <h1>{{ data.myclass }}班级综合测评表</h1>
    </div>

    <!-- 顶部，查询按钮，导出按钮 -->
    <div>
      <div class="mt-4">
        <el-input
          v-model="data.search"
          style="max-width: 300px; margin-bottom: -50px"
          placeholder="请输入查询关键字"
          class="input-with-select"
        >
          <template #append>
            <el-button @click="getAssessmentDetails"
              ><el-icon><Search /></el-icon
            ></el-button>
          </template>
        </el-input>
      </div>
      <el-button
        type="warning"
        style="float: right; margin-left: 1rem"
        @click="data.dialogVisible2 = true"
        ><el-icon><Memo /></el-icon>&nbsp; 错误申报</el-button
      >
      <el-button style="float: right" @click="handleExcelExport"
        ><el-icon><Download /></el-icon>&nbsp; 导出</el-button
      >
    </div>
    <br />
    <!-- 测评编辑表 -->
    <!-- <el-table
      :data="data.assessments"
      style="width: 100%"
      @cell-mouse-enter="handleCellEnter"
      @cell-mouse-leave="handleCellLeave"
    >
      <el-table-column prop="id" label="学号" width="120" />
      <el-table-column prop="name" fixed label="姓名" width="150" />
      <el-table-column label="德育">
        <el-table-column prop="add1" label="加分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.add1"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.add1 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sub1" label="减分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.sub1"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.sub1 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="point1" label="得分" width="90">
          <template #default="scope">
            <div class="item">
              <el-input-number
                style="width: 70px"
                class="item__input"
                v-model="scope.row.point1"
                :min="-100"
                :max="100"
                size="small"
              />
              <div class="item__txt">{{ scope.row.point1 }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="智育">
        <el-table-column prop="add2" label="加分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.add2"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.add2 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sub2" label="减分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.sub2"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.sub2 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="point2" label="得分" width="90">
          <template #default="scope">
            <div class="item">
              <el-input-number
                style="width: 70px"
                class="item__input"
                v-model="scope.row.point2"
                :min="-100"
                :max="100"
                size="small"
              />
              <div class="item__txt">{{ scope.row.point2 }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="体育">
        <el-table-column prop="add3" label="加分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.add3"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.add3 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sub3" label="减分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.sub3"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.sub3 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="point3" label="得分" width="90">
          <template #default="scope">
            <div class="item">
              <el-input-number
                style="width: 70px"
                class="item__input"
                v-model="scope.row.point3"
                :min="-100"
                :max="100"
                size="small"
              />
              <div class="item__txt">{{ scope.row.point3 }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="美育">
        <el-table-column prop="add4" label="加分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.add4"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.add4 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sub4" label="减分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.sub4"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.sub4 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="point4" label="得分" width="90">
          <template #default="scope">
            <div class="item">
              <el-input-number
                style="width: 70px"
                class="item__input"
                v-model="scope.row.point4"
                :min="-100"
                :max="100"
                size="small"
              />
              <div class="item__txt">{{ scope.row.point4 }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="劳动">
        <el-table-column prop="add5" label="加分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.add5"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.add5 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sub5" label="减分明细" width="200">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.sub5"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.sub5 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="point5" label="得分" width="90">
          <template #default="scope">
            <div class="item">
              <el-input-number
                style="width: 70px"
                class="item__input"
                v-model="scope.row.point5"
                :min="-100"
                :max="100"
                size="small"
              />
              <div class="item__txt">{{ scope.row.point5 }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="当月综合测评得分" fixed="right">
        <el-table-column prop="add_total" label="月加分" width="50">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.add_total"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.add_total }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sub_total" label="月减分" width="50">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.sub_total"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.sub_total }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pre_total" label="上月得分" width="50">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.pre_total"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.pre_total }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="point_total" label="当月总分" width="50">
          <template #default="scope">
            <div class="item">
              <el-input
                class="item__input"
                v-model="scope.row.point_total"
                placeholder="请输入内容"
              ></el-input>
              <div class="item__txt">{{ scope.row.point_total }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table> -->
    <el-table
      v-loading.lock="data.loading"
      :data="data.assessments"
      style="width: 100%"
    >
      <el-table-column prop="userNumber" label="学号" min-width="120" />
      <el-table-column prop="username" fixed label="姓名" min-width="150" />
      <el-table-column label="德育">
        <el-table-column prop="add1" label="加分明细" min-width="120" />
        <el-table-column prop="sub1" label="减分明细" min-width="120" />
        <el-table-column prop="point1" label="得分" min-width="60" />
      </el-table-column>
      <el-table-column label="智育">
        <el-table-column prop="add2" label="加分明细" min-width="120" />
        <el-table-column prop="sub2" label="减分明细" min-width="120" />
        <el-table-column prop="point2" label="得分" min-width="60" />
      </el-table-column>
      <el-table-column label="体育">
        <el-table-column prop="add3" label="加分明细" min-width="120" />
        <el-table-column prop="sub3" label="减分明细" min-width="120" />
        <el-table-column prop="point3" label="得分" min-width="60" />
      </el-table-column>
      <el-table-column label="美育">
        <el-table-column prop="add4" label="加分明细" min-width="120" />
        <el-table-column prop="sub4" label="减分明细" min-width="120" />
        <el-table-column prop="point4" label="得分" min-width="60" />
      </el-table-column>
      <el-table-column label="劳动">
        <el-table-column prop="add5" label="加分明细" min-width="120" />
        <el-table-column prop="sub5" label="减分明细" min-width="120" />
        <el-table-column prop="point5" label="得分" min-width="60" />
      </el-table-column>
      <el-table-column label="当月综合测评得分" fixed="right">
        <el-table-column prop="add_total" label="月加分" min-width="50" />
        <el-table-column prop="sub_total" label="月减分" min-width="50" />
        <el-table-column prop="pre_total" label="上月得分" min-width="50" />
        <el-table-column
          prop="point_total"
          label="当月总分"
          sortable
          min-width="50"
        />
      </el-table-column>
      <el-table-column label="操作" fixed="right" v-if="(data.isEnd == null || data.isEnd == true)">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        layout="total,sizes,prev,pager,next"
        :page-size="data.page.pageSize"
        :page-sizes="[15, 20, 40, 100]"
        :pager-count="10"
        :total="data.page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-left: auto"
      />
    </div>
    <!-- 提交按钮 -->
    <el-form-item label="本月确认情况 ：">
      <span v-show="data.isEnd == null || data.isEnd == true">未到确认时间</span>
        <span v-show="data.isEnd == false && data.signature">已确认</span>
        <span v-show="data.isEnd == false && data.signature == null"
          >待确认</span
        >
        <span style="color: rgb(167, 167, 167); margin-left: 15px">
          (已确认/待确认/未到确认时间)</span
        >
      <el-button
        type="primary"
        style="margin-left: 1rem"
        @click="data.dialogVisible = true"
        :disabled="!(data.isEnd == false && data.signature == null)"
        >前往电子签名</el-button
      >
    </el-form-item>
  </div>
  <!-- 电子签名对话框 -->
  <el-dialog v-model="data.dialogVisible" title="电子签名" width="50%">
    <div style="margin-left: 2rem">
      当班主任开放本月确认入口时，您可以在本页进行签字确认负责综测内容已编辑核对完成，签字之后无法修改综测内容，请仔细核对后签字。
    </div>
    <br />
    <div>
      <signatures @finish="finish"></signatures>
    </div>
  </el-dialog>
  <!-- 申诉列表对话框 -->
  <el-dialog v-model="data.dialogVisible2" title="💬 待申述处理" width="60%">
    <div>
      <el-table :data="data.complaintData">
        <el-table-column type="index" />
        <el-table-column label="申诉学生姓名" prop="username" min-width="120" />
        <el-table-column label="学号" prop="userNumber" min-width="100" />
        <el-table-column label="申诉内容" prop="content" min-width="300" />
        <el-table-column
          label="申诉时间"
          prop="created"
          min-width="200"
          sortable
        />
        <el-table-column
          label="申诉状态"
          width="100"
          :filters="[
            { text: '待处理', value: '0' },
            { text: '已处理', value: '1' },
            { text: '已撤销', value: '2' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag
              :type="
                scope.row.state === 0
                  ? ''
                  : scope.row.state === 1
                  ? 'success'
                  : 'info'
              "
              disable-transitions
            >
              <span v-if="scope.row.state == 0">待处理</span>
              <span v-if="scope.row.state == 1">已处理</span>
              <span v-if="scope.row.state == 2">已撤销</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              v-if="scope.row.state == 1 || scope.row.state == 2"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="small"
              type="success"
              v-if="scope.row.state == 0"
              @click="handleDeal(scope.$index, scope.row)"
              >完成</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
  <!-- 编辑综测对话框 -->
  <el-dialog
    v-loading.lock="data.loading"
    v-model="data.dialogVisible3"
    :title="data.curTitle"
    width="500"
    lock-scroll
  >
    <el-form :model="data.form">
      <el-form-item label="编辑部分" :label-width="formLabelWidth">
        <el-select
          v-model="data.curType"
          placeholder="请选择需要修改的综测部分"
        >
          <el-option label="德育" value="1" />
          <el-option label="智育" value="2" />
          <el-option label="体育" value="3" />
          <el-option label="美育" value="4" />
          <el-option label="劳动" value="5" />
        </el-select>
      </el-form-item>
      <hr style="border-color: rgba(231, 229, 226, 0.459)" />
      <div v-show="data.curType == 1">
        <el-form-item label="德育" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="加分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.add1"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item label="减分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.sub1"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="德育得分" :label-width="formLabelWidth">
          <el-input-number
            style="width: 100px"
            class="item__input"
            v-model="data.form.point1"
            :min="-100"
            :max="100"
            size="small"
          />
        </el-form-item>
      </div>
      <div v-show="data.curType == 2">
        <el-form-item label="智育" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="加分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.add2"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="减分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.sub2"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="智育得分" :label-width="formLabelWidth">
          <el-input-number
            style="width: 100px"
            class="item__input"
            v-model="data.form.point2"
            :min="-100"
            :max="100"
            size="small"
          />
        </el-form-item>
      </div>
      <div v-show="data.curType == 3">
        <el-form-item label="体育" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="加分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.add3"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="减分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.sub3"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="体育得分" :label-width="formLabelWidth">
          <el-input-number
            style="width: 100px"
            class="item__input"
            v-model="data.form.point3"
            :min="-100"
            :max="100"
            size="small"
          />
        </el-form-item>
      </div>
      <div v-show="data.curType == 4">
        <el-form-item label="美育" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="加分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.add4"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="减分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.sub4"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="美育得分" :label-width="formLabelWidth">
          <el-input-number
            style="width: 100px"
            class="item__input"
            v-model="data.form.point4"
            :min="-100"
            :max="100"
            size="small"
          />
        </el-form-item>
      </div>
      <div v-show="data.curType == 5">
        <el-form-item label="劳动" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="加分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.add5"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="减分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.sub5"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="劳动得分" :label-width="formLabelWidth">
          <el-input-number
            style="width: 100px"
            class="item__input"
            v-model="data.form.point5"
            :min="-100"
            :max="100"
            size="small"
          />
        </el-form-item>
      </div>
      <div class="tip">请注意手动修改单项得分和总加减分,否则可能出现错误</div>
      <hr style="border-color: rgba(231, 229, 226, 0.459)" />
      <br />
      <el-form-item label="总体情况" :label-width="formLabelWidth">
        <span v-show="data.form.isTrue">
          <el-icon color="red" style="margin-left: 0 5px"
            ><WarningFilled
          /></el-icon>
          总加分与减分之和与总得分不匹配。
        </span>
      </el-form-item>
      <el-form-item label="总加分" :label-width="formLabelWidth">
        <el-input-number
          style="width: 100px"
          class="item__input"
          v-model="data.form.add_total"
          :min="0"
          :max="100"
          size="small"
        />
      </el-form-item>
      <el-form-item label="总减分" :label-width="formLabelWidth">
        <el-input-number
          style="width: 100px"
          class="item__input"
          v-model="data.form.sub_total"
          :min="-100"
          :max="0"
          size="small"
        />
      </el-form-item>
      <el-form-item
        label="总得分"
        prop="data.form.point_total"
        :label-width="formLabelWidth"
      >
        <span>{{ data.form.point_total }}</span>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="data.dialogVisible3 = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import signatures from "@/components/utils/Signatures.vue";
import { comprehensiveAssessmentHeader } from "@/assets/js/excel/format/comprehensive-assessment-style";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import { getMonthName } from "@/assets/js/utils/month";
import studentFun from "@/api/student";

const data = reactive({
  myclass: "2023级1班", //班级
  state: null,
  curMonth: 0,
  monthes: [], //可选月份
  isEnd: null, //当前综测签名流程是否开放
  signature: null, //是否签名
  loading: false, //列表加载动画
  assessments: [
    {
      userNumber: "20222113001",
      username: "吾尔肯·塞里克",
      add1: "帮助老师批改作业2分",
      sub1: "旷课1分",
      point1: 1,
      add2: "绩点8分",
      sub2: "挂科1门2分",
      point2: 6,
      add3: "铅球比赛一等奖5分1km二等奖4分",
      sub3: "无",
      point3: 9,
      add4: "捐献书法画1分",
      sub4: "破环草坪1分",
      point4: 0,
      add5: "值日2次4分",
      sub5: "无",
      point5: 4,
      add_total: 24,
      sub_total: 4,
      pre_total: 18,
      point_total: 20,
    },
    {
      userNumber: "20222113002",
      username: "玉苏普·吐荪江",
      add1: "帮助老师批改作业2分",
      sub1: "旷课1分",
      point1: 1,
      add2: "绩点8分",
      sub2: "挂科1门2分",
      point2: 6,
      add3: "铅球比赛一等奖5分1km二等奖4分",
      sub3: "无",
      point3: 9,
      add4: "捐献书法画1分",
      sub4: "破环草坪1分",
      point4: 0,
      add5: "值日2次4分",
      sub5: "无",
      point5: 4,
      add_total: 24,
      sub_total: 4,
      pre_total: 18,
      point_total: 20,
    },
    {
      userNumber: "20222113003",
      username: "沙亚拉·江阿努尔",
      add1: "帮助老师批改作业2分",
      sub1: "旷课1分",
      point1: 1,
      add2: "绩点8分",
      sub2: "挂科1门2分",
      point2: 6,
      add3: "铅球比赛一等奖5分1km二等奖4分",
      sub3: "无",
      point3: 9,
      add4: "捐献书法画1分",
      sub4: "破环草坪1分",
      point4: 0,
      add5: "值日2次4分",
      sub5: "无",
      point5: 4,
      add_total: 24,
      sub_total: 4,
      pre_total: 18,
      point_total: 20,
    },
    {
      userNumber: "20222113004",
      username: "吐尔逊娜衣·托呼提",
      add1: "帮助老师批改作业2分",
      sub1: "旷课1分",
      point1: 1,
      add2: "绩点8分",
      sub2: "挂科1门2分",
      point2: 6,
      add3: "铅球比赛一等奖5分1km二等奖4分",
      sub3: "无",
      point3: 9,
      add4: "捐献书法画1分",
      sub4: "破环草坪1分",
      point4: 0,
      add5: "值日2次4分",
      sub5: "无",
      point5: 4,
      add_total: 24,
      sub_total: 4,
      pre_total: 18,
      point_total: 20,
    },
    {
      userNumber: "20222112006",
      username: "阿合叶尔克·胡瓦提",
      add1: "帮助老师批改作业2分",
      sub1: "旷课1分",
      point1: 1,
      add2: "绩点8分",
      sub2: "挂科1门2分",
      point2: 6,
      add3: "铅球比赛一等奖5分1km二等奖4分",
      sub3: "无",
      point3: 9,
      add4: "捐献书法画1分",
      sub4: "破环草坪1分",
      point4: 0,
      add5: "值日2次4分",
      sub5: "无",
      point5: 4,
      add_total: 24,
      sub_total: 4,
      pre_total: 18,
      point_total: 20,
    },
    {
      userNumber: "20222112005",
      username: "米热古丽·吾斯曼",
      add1: "帮助老师批改作业2分",
      sub1: "旷课1分",
      point1: 1,
      add2: "绩点8分",
      sub2: "挂科1门2分",
      point2: 6,
      add3: "铅球比赛一等奖5分1km二等奖4分",
      sub3: "无",
      point3: 9,
      add4: "捐献书法画1分",
      sub4: "破环草坪1分",
      point4: 0,
      add5: "值日2次4分",
      sub5: "无",
      point5: 4,
      add_total: 24,
      sub_total: 4,
      pre_total: 18,
      point_total: 20,
    },
    {
      userNumber: "20222112004",
      username: "地娜拉·居帕尔",
      add1: "帮助老师批改作业2分",
      sub1: "旷课1分",
      point1: 1,
      add2: "绩点8分",
      sub2: "挂科1门2分",
      point2: 6,
      add3: "铅球比赛一等奖5分1km二等奖4分",
      sub3: "无",
      point3: 9,
      add4: "捐献书法画1分",
      sub4: "破环草坪1分",
      point4: 0,
      add5: "值日2次4分",
      sub5: "无",
      point5: 4,
      add_total: 24,
      sub_total: 4,
      pre_total: 18,
      point_total: 20,
    },
    {
      userNumber: "20222112003",
      username: "沙尔恩高阿·吾日克塔",
      add1: "帮助老师批改作业2分",
      sub1: "旷课1分",
      point1: 1,
      add2: "绩点8分",
      sub2: "挂科1门2分",
      point2: 6,
      add3: "铅球比赛一等奖5分1km二等奖4分",
      sub3: "无",
      point3: 9,
      add4: "捐献书法画1分",
      sub4: "破环草坪1分",
      point4: 0,
      add5: "值日2次4分",
      sub5: "无",
      point5: 4,
      add_total: 24,
      sub_total: 4,
      pre_total: 18,
      point_total: 20,
    },
    {
      userNumber: "20222113001",
      username: "吾尔肯·塞里克",
      add1: "帮助老师批改作业2分",
      sub1: "旷课1分",
      point1: 1,
      add2: "绩点8分",
      sub2: "挂科1门2分",
      point2: 6,
      add3: "铅球比赛一等奖5分1km二等奖4分",
      sub3: "无",
      point3: 9,
      add4: "捐献书法画1分",
      sub4: "破环草坪1分",
      point4: 0,
      add5: "值日2次4分",
      sub5: "无",
      point5: 4,
      add_total: 24,
      sub_total: 4,
      pre_total: 18,
      point_total: 20,
    },
    {
      userNumber: "20222113002",
      username: "玉苏普·吐荪江",
      add1: "帮助老师批改作业2分",
      sub1: "旷课1分",
      point1: 1,
      add2: "绩点8分",
      sub2: "挂科1门2分",
      point2: 6,
      add3: "铅球比赛一等奖5分1km二等奖4分",
      sub3: "无",
      point3: 9,
      add4: "捐献书法画1分",
      sub4: "破环草坪1分",
      point4: 0,
      add5: "值日2次4分",
      sub5: "无",
      point5: 4,
      add_total: 24,
      sub_total: 4,
      pre_total: 18,
      point_total: 20,
    },
  ],
  dialogVisible: false, //电子签名对话框
  dialogVisible2: false, //申诉对话框
  dialogVisible3: false, //编辑综测
  complaintData: [
    {
      create: "2023-05-07",
      userNumber: "2022100030",
      username: "杨世博",
      content: "个人信息性别错误，需要更改为男",
      state: 1,
    },
    {
      create: "2023-05-11",
      username: "李珊",
      userNumber: "2022100030",
      content: "综测1月加分计算错误，少加了1分英语竞赛二等奖分",
      state: 0,
    },
    {
      create: "2023-05-24",
      username: "涂圆元",
      userNumber: "2022100031",
      content: "个人信息民族错误，需要更改为土家族",
      state: 1,
    },
    {
      create: "2023-05-11",
      username: "陈翔",
      userNumber: "2022100032",
      content: "综测1月加分计算错误，少加了3分软件杯全国二等奖分",
      state: 2,
    },
    {
      create: "2023-05-12",
      username: "刘橙晨",
      userNumber: "2022100040",
      content: "个人信息目标学校错误，需要修改为‘长沙学院’",
      state: 0,
    },
  ], // 申诉列表
  curTitle: "", //编辑弹窗标题（锁定学生）
  curType: "1", //修改项
  search: null, //搜索词
  form: {
    add1: null,
    sub1: null,
    point1: null,
    add2: null,
    sub2: null,
    point2: null,
    add3: null,
    sub3: null,
    point3: null,
    add4: null,
    sub4: null,
    point4: null,
    add5: null,
    sub5: null,
    point5: null,
    add_total: null,
    sub_total: null,
    pre_total: null,
    point_total: computed(() => {
      return (
        data.form.point1 +
        data.form.point2 +
        data.form.point3 +
        data.form.point4 +
        data.form.point5
      );
    }),
    isTrue: computed(() => {
      return (
        data.form.add_total + data.form.sub_total !== data.form.point_total
      );
    }),
  }, //修改表单
  page: {
    total: 200, // 总条数
    currentPage: 1, // 当前页
    pageSize: 15, //一页的数据量
  }, //分页
});
const formLabelWidth = "140px";
onMounted(() => {
  init();
});
//初始化
function init() {
  getClassDetials(); //获取班级信息
  getAssessmentMonth(); //获取可选月份
  getAssessmentDetails(); //获取综测信息
  getComplaintsDeatils(); //获取申诉列表数据
}
//获取班级信息
function getClassDetials() {
  studentFun.assess.getInformation().then((res) => {
    data.myclass = res.className;
  });
}
//获取综测信息
function getAssessmentDetails() {
  data.loading = true;
  studentFun.assess
    .getAssessmentsByMonth({
      keyword: data.search,
      month: data.curMonth,
      rank: 0,
      current: data.page.currentPage,
      size: data.page.pageSize,
    })
    .then((res) => {
      console.log("获取综测信息结果：", res);
      console.log("综测流程", res.isEnd);
      data.assessments = [];
      data.page.currentPage = res.current;
      data.page.pageSize = res.size;
      data.page.total = res.total;
      res.records.forEach((item) => {
        data.assessments.push(item.content);
      });
      if (data.curMonth == 0) {
        data.curMonth = res.records[0].month;
      }
      data.isEnd = res.isEnd;
      data.signature = res.signature;
      data.loading = false;
    });
}
//获取综测小组选择月签名情况
function getMonthSign() {
  studentFun.sign
    .assessGetMonthSign({
      month: data.curMonth,
    })
    .then((res) => {
      console.log("获取综测小组选择月签名情况", res);
      data.signature = res;
    });
}
//获取申诉列表数据
function getComplaintsDeatils() {
  studentFun.assess
    .getComplaint({
      state: "",
    })
    .then((res) => {
      console.log("申诉列表", res);
      data.complaintData = res;
    });
}
//获取可选月份方法
function getAssessmentMonth() {
  studentFun.assess.getMonthes().then((res) => {
    console.log("获取可选月份方法:", res);
    res.forEach((item) => {
      console.log(item);
      data.monthes.push({
        value: item,
        label: getMonthName(item),
      });
    });
  });
}
//编辑综测
const handleEdit = (index, row) => {
  if (row) {
    data.curTitle = `编辑学生 ${row.username} 的综合测评`;
    // 遍历row对象的属性和值给form初值，且不影响computed属性
    for (let key in row) {
      if (row.hasOwnProperty(key)) {
        // 根据属性名给form对象赋值
        if (key !== "point_total") {
          data.form[key] = row[key];
        }
      }
    }
    console.log("编辑综测对象处理后", row);
    data.curType = "1"; //启动时默认先展示德育项
    data.dialogVisible3 = true;
  }
};
//确认修改综测
function confirmEdit() {
  console.log("确认修改综测负载内容", data.form);
  if (data.form.isTrue == false) {
    studentFun.assess.submitAssessments([data.form]).then((res) => {
      console.log("确认修改综测结果", res);
      getAssessmentDetails(); //重新获取综测信息
    });
    data.dialogVisible3 = false;
  } else {
    ElMessage.error("请确保分数计算正确");
  }
}
//签名后提交数据和电子签名
function finish(file) {
  console.log("签名img的base64转为file的结果", file);
  const formData = new FormData();
  formData.append("file", file);
  studentFun.sign.assessConfirmSign(data.curMonth, formData).then((res) => {
    console.log(res);
    data.signature = "ABC"; //不为空即可
    data.dialogVisible = false;
    ElMessage({
      message: "提交本月综测情况成功",
      type: "success",
    });
  });
  //模拟提交
  // setTimeout(() => {
  //   data.dialogVisible = false;
  //   ElMessage({
  //     message: "提交本月综测情况成功",
  //     type: "success",
  //   });
  // }, 60);
}
//删除申诉项
const handleDelete = (index, row) => {
  studentFun.assess.deleteComplaint([row.appealId]).then((res) => {
    data.complaintData.splice(index, 1);
    ElMessage.success(res);
  });
};
//处理申诉项
const handleDeal = (index, row) => {
  studentFun.assess.dealComplaint(row.appealId).then((res) => {
    row.state = 1;
    ElMessage.success(res);
  });
};
//筛选器
const filterTag = (value, row) => {
  return row.state == value;
};
//改变分页页数
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
  data.page.currentPage = val;
  getAssessmentDetails();
};
//改变单页数
const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
  data.page.pageSize = val;
  getAssessmentDetails();
};
//导出数据对接
const editProp = [
  "username",
  "userNumber",
  "add1",
  "sub1",
  "point1",
  "add2",
  "sub2",
  "point2",
  "add3",
  "sub3",
  "point3",
  "add4",
  "sub4",
  "point4",
  "add5",
  "sub5",
  "point5",
  "add_total",
  "sub_total",
  "pre_total",
  "point_total",
];
// 数据excel导出
const handleExcelExport = () => {
  console.log(comprehensiveAssessmentHeader);
  export_json_to_excel(
    comprehensiveAssessmentHeader,
    data.assessments,
    `${data.myclass}班级综合测评表`
  );
};
//获取综测流程状态
// function updateState() {
//   if (data.isOpen === null) {
//     data.state = "未到确认时间";
//   } else if (data.isOpen == false) {
//     data.state = "已结束";
//   } else if (data.signature) {
//     data.state = "已确认";
//   } else if (data.signature == null) {
//     data.state = "待确认";
//   }
// }
// const complaintData=[
//     {
//       date: "2023-05-07",
//       id: "2022100030",
//       name: "杨世博",
//       content: "个人信息性别错误，需要更改为男",
//     },
//     {
//       date: "2023-05-11",
//       name: "李珊",
//       id: "2022100030",
//       content: "综测1月加分计算错误，少加了1分英语竞赛二等奖分",
//     },
//     {
//       date: "2023-05-24",
//       name: "涂圆元",
//       id: "2022100031",
//       content: "个人信息民族错误，需要更改为土家族",
//     },
//     {
//       date: "2023-05-11",
//       name: "陈翔",
//       id: "2022100032",
//       content: "综测1月加分计算错误，少加了3分软件杯全国二等奖分",
//     },
//     {
//       date: "2023-05-12",
//       name: "刘橙晨",
//       id: "2022100040",
//       content: "个人信息目标学校错误，需要修改为‘长沙学院’",
//     },
//   ]
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style lang="scss" scoped>
h1 {
  margin-top: 40px;
  text-align: center;
}
.tip {
  color: rgba(128, 128, 128, 0.568);
  margin: 1rem 0 1rem 4.5rem;
}
.item {
  .item__input {
    display: none;
    width: 100%;
  }
  .item__txt {
    box-sizing: border-box;
    line-height: 24px;
    padding: 0 9px;
  }
}
.pagination {
  display: flex;
}
.submitBtn {
  text-align: center;
  height: 40px;
}
.checkMonth {
  margin-top: 30px;
  text-align: center;
  transform: translateX(-7%);
  h1 {
    margin-left: 1rem;
    display: inline-block;
  }
}
</style>
  