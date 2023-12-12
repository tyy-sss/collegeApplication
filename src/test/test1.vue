<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-08 19:08:52
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-03 11:50:25
 * @FilePath: \collegeApplication\src\test\test1.vue
 * @Description:测试vue文件1
-->
<template>
  <div class="box">
    <!-- 条件 -->
    <div class="condition">
      <div class="item">
        <div class="title">
          <span class="tip">所在地区</span
          ><i
            ><el-icon><ArrowRight /></el-icon
          ></i>
        </div>
        <div class="condition_list">
          <span class="tag_item">北京</span><span class="tag_item">天津</span
          ><span class="tag_item">河北</span><span class="tag_item">山西</span
          ><span class="tag_item">内蒙古</span><span class="tag_item">辽宁</span
          ><span class="tag_item">吉林</span><span class="tag_item">黑龙江</span
          ><span class="tag_item">上海</span><span class="tag_item">江苏</span
          ><span class="tag_item">浙江</span><span class="tag_item">安徽</span
          ><span class="tag_item">福建</span
          ><span class="tag_item active">江西</span
          ><span class="tag_item">山东</span><span class="tag_item">河南</span
          ><span class="tag_item">湖北</span><span class="tag_item">湖南</span
          ><span class="tag_item">广东</span><span class="tag_item">广西</span
          ><span class="tag_item">海南</span><span class="tag_item">重庆</span
          ><span class="tag_item">四川</span><span class="tag_item">贵州</span
          ><span class="tag_item">云南</span><span class="tag_item">陕西</span
          ><span class="tag_item">甘肃</span><span class="tag_item">青海</span
          ><span class="tag_item">宁夏</span>
        </div>
      </div>
      <div class="item" style="min-height: 36px">
        <div class="title">
          <span class="tip">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份</span
          ><i
            ><el-icon><ArrowRight /></el-icon
          ></i>
        </div>
        <div class="condition_list">
          <span class="tag_item">2023</span><span class="tag_item">2022</span
          ><span class="tag_item active">2021</span
          ><span class="tag_item">2020</span><span class="tag_item">2019</span
          ><span class="tag_item">2018</span>
        </div>
      </div>
      <div class="item" style="min-height: 36px">
        <div class="title">
          <span class="tip">考生类别</span
          ><i
            ><el-icon><ArrowRight /></el-icon
          ></i>
        </div>
        <div class="condition_list">
          <span class="tag_item active">理科</span
          ><span class="tag_item">文科</span>
        </div>
      </div>
      <div class="item" style="min-height: 36px">
        <div class="title">
          <span class="tip">成绩类型</span
          ><i
            ><el-icon><ArrowRight /></el-icon
          ></i>
        </div>
        <div class="condition_list">
          <span class="tag_item active">本科</span>
        </div>
      </div>
    </div>
    <!-- 搜索框 -->
    <div class="searchBox">
      <el-input
        v-model="input3"
        placeholder="请输入您的分数"
        class="input-with-select"
      >
        <template #append>
          <el-button class="search">查询</el-button>
        </template>
      </el-input>

      <el-button class="history">历史查询</el-button>
    </div>
    <!-- 结果 -->
    <div class="stack-line">
      <div class="stack-info">
        <div class="gk-score">
          <em><span>高考分数</span>{{ gkScore || "-" }}分</em>
        </div>
        <hr />
        <div class="gk-rank">
          <div class="item"><span>同分人数</span>{{ gkNum || "-" }}人</div>
          <div class="item">
            <span>排名区间</span>{{ gkLeft }}-{{ gkRight }}名
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
let gkScore = ref(521);
let gkNum = ref(745);
let gkLeft = ref(46820);
let gkRight = ref(47564);
</script>

<style lang="scss" scoped>
hr {
  border-color: #ebf3ff4d;
}
.box {
  padding: 40px;
  width: 70%;
}
.condition {
  height: 40%;
  padding: 20px;
  border: 1px solid rgb(241, 238, 238);
  margin-bottom: 30px;
}
.item {
  position: relative;
  .title {
    position: absolute;
    left: 0;
    color: #000;
    line-height: 15px;
    .tip {
      vertical-align: bottom;
    }
    i {
      vertical-align: middle;
    }
  }
  .condition_list {
    padding-left: 107px;
    .tag_item {
      padding: 0 20px 12px 0;
      white-space: nowrap;
      display: inline-block;
      color: #000;
      line-height: 24px;
      cursor: pointer;
    }
    .active {
      color: #ff6602;
    }
  }
}

.searchBox {
  margin-bottom: 30px;
  padding: 10px 0;
  display: inline-block;
  .input-with-select {
    height: 40px;
    width: 400px;
  }
  .search {
    height: 40px;
    width: 100px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background-color: #ff9202;
    color: #fff;
  }
  .history {
    margin-left: 15px;
    width: 103px;
    height: 40px;
    border-radius: 5px;
    border-color: #ff6602;
    color: #ff6602;
    overflow: hidden;
  }
}
.stack-line {
  background: #fff9f2;
  padding: 20px;
  line-height: 18px;
  span {
    font-size: 17px;
    color: rgb(98, 97, 97);
    margin-right: 10px;
  }
  .gk-score {
    margin-bottom: 15px;
  }
  .gk-rank {
    margin: 15px 0;
  }
  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
  }
}
</style>