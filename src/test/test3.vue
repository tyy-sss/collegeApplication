<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-30 22:12:35
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-30 22:40:32
 * @FilePath: \collegeApplication\src\test\test3.vue
 * @Description:电子签名demo
-->
<template>
  <div>
    <div class="hello">
      <p class="text">请在下方区域签名</p>
      <br />
      <!-- 签名组件 -->
      <vueEsign
        ref="esign"
        class="mySign"
        :width="800"
        :height="300"
        :isCrop="isCrop"
        :lineWidth="lineWidth"
        :lineColor="lineColor"
      />
      <br />
      <p class="btn">
        <button type="" @click="reset">清空画板</button>
      </p>
    </div>
    <div class="btnA">
      <button @click="save">生成签字图片</button>
    </div>
  </div>
  <h1 style="margin-top: 40px">生成签字图片:</h1>
  <img v-if="resultImg" :src="resultImg" alt="Signature Image" />
</template>
 
<script setup>
import { ElMessage } from "element-plus";
import vueEsign from "vue-esign";
import { ref } from "vue";
const lineWidth = ref(0);
const lineColor = ref("#000000");
const resultImg = ref("");
const isCrop = ref("");
const esign = ref(null);

// 清空画板
const reset = () => {
  esign.value.reset();
};
// 保存
const save = () => {
  // 可选配置参数 ，在未设置format或quality属性时可在生成图片时配置 例如： {format:'image/jpeg', quality: 0.5}
  esign.value
    .generate()
    .then((res) => {
      //   this.$emit("finsih", res);
      console.log(res);
      resultImg.value = res;
    })
    .catch((err) => {
      console.log(err); // 画布没有签字时会执行这里err= 'Not Signned'
      ElMessage({
        message: "您还未完成签字，请签字完成后保存",
        type: "error",
      });
    });
};
</script>
<style scoped>
.btn button {
  height: 25px;
  width: 80px;
  border: 1px solid #f1860f;
  color: #f1860f;
  border-radius: 15px;
  background: none;
}
.hello {
  border-radius: 8px;
  padding: 20px;
  height: 400px;
  width: 800px;
  box-shadow: 0px 0px 5px #f4f4f4;
  margin: auto;
  margin-top: 25px;
  border: 1px solid #cccccc;
}
.text {
  margin-left: 10px;
  margin-top: 20px;
  font-weight: bold;
}
.btn {
  text-align: right;
  margin-right: 15px;
}
.btnA {
  text-align: center;
  margin-top: 30px;
}
.btnA button {
  height: 35px;
  width: 800px;
  color: white;
  font-size: 16px;
  border-radius: 15px;
  background: #f1860f;
  border: none;
}
.mySign {
  border: 1px solid rgb(199, 198, 198);
}
</style>