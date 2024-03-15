<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-30 22:12:35
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-15 13:05:46
 * @FilePath: \collegeApplication\src\components\utils\Signatures.vue
 * @Description:电子签名组件
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
        :isCrop="isCrop"
        :lineWidth="lineWidth"
        :lineColor="lineColor"
      />
      <br />
      <p class="btn">
        <button type="" @click="reset">清空签字板</button>
      </p>
    </div>
    <div class="btnA">
      <button @click="save">确认提交</button>
    </div>
  </div>
  <!-- 
  <h1 style="margin-top: 40px">生成签字图片:</h1>
  <img v-if="resultImg" :src="resultImg" alt="Signature Image" /> 
  -->
</template>
 
<script setup>
import { ElMessage } from "element-plus";
import vueEsign from "vue-esign";
import { ref, defineEmits } from "vue";
const emits = defineEmits(["finish"]);
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
    .generate({willReadFrequently:true})
    .then((res) => {
      resultImg.value = res;
      emits("finish", res);
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
  height: 2rem;
  width: 6rem;
  border: 1px solid #5097ff;
  color: #5097ff;
  border-radius: 1rem;
  background: none;
}
.hello {
  border-radius: 0.7rem;
  padding: 1.5rem;
  width: 90%;
  box-shadow: 0px 0px 5px #f4f4f4;
  margin: auto;
  border: 1px solid #cccccc;
}
.text {
  margin-left: .5rem;
  margin-top: 1rem;
  font-weight: bold;
}
.btn {
  text-align: right;
  margin-right: 1rem;
}
.btnA {
  text-align: center;
  margin-top: 1.5rem;
}
.btnA button {
  height: 2rem;
  width: 30%;
  color: white;
  font-size: 1rem;
  border-radius: 1rem;
  background: #5097ff;
  border: none;
}
.mySign {
  border: 1px solid rgb(199, 198, 198);
}
</style>