<template>
  <div class="login">
    <div class="index-main">
      <div class="index-right">
        <div class="container">
          <div class="form-container sign-in-container">
            <el-form ref="ruleFormRef" :model="userData" :rules="rules">
              <el-form-item>
                <h1>志愿填报系统</h1>
              </el-form-item>
              <el-form-item prop="userNumber">
                <input
                  type="text"
                  placeholder="账号"
                  v-model="userData.userNumber"
                />
              </el-form-item>
              <el-form-item prop="password">
                <input
                  type="password"
                  placeholder="密码"
                  v-model="userData.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button class="button" type="primary" round @click="login()"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div class="overlay-container"></div>
        </div>
        <div class="index-description">
          让志愿分配更加高效。
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiFun from "@/api/user";
import { reactive, ref } from "vue";
import { throttle } from "@/assets/js/utils/throttle";
import { setRole, setAccessToken, setRefreshToken } from "@/config/constants";
import {
  ACCOUNT_TEST,
  PASSWORD_TEST,
} from "@/assets/js/utils/regular-expression";
import { useRouter } from "vue-router";
const router = useRouter();
// 用户数据
const userData = reactive({
  type: 1,
  userNumber: "",
  password: "",
});
// 验证规则
const rules = reactive({
  userNumber: [
    {
      pattern: ACCOUNT_TEST,
      message: "请输入数字（2~16位）",
      trigger: "blur",
    },
  ],
  password: [
    {
      pattern: PASSWORD_TEST,
      message: "请输入数字或者字母（6~16位）",
      trigger: "blur",
    },
  ],
});
const ruleFormRef = ref(null);
//
const login = throttle(() => {
  ruleFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      // 节流
      const data = await apiFun.user.login(userData);
      // 保存token 还有菜单信息
      setAccessToken(data.token.accessToken);
      setRefreshToken(data.token.refreshToken);
      setRole(data.role);
      // 清空表单信息
      ruleFormRef.value.resetFields();
      const href = router.resolve({
        path: "/",
      });
      window.open(href.href, "_self");
    }
  });
}, 1000);
</script>

<style scoped>
.index-main {
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: row;
  align-items: stretch;
  margin: 0;
}

.index-right {
  width: 100%;
  padding: 6rem 3rem;
  flex: 1;
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  background: url(../assets/image/wallpaper.png) center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.index-description {
  color: aliceblue;
  position: absolute;
  margin: 0 auto;
  padding: 0 20px;
  bottom: 40px;
  left: 0;
  right: 0;
}
h1 {
  font-weight: bold;
  color: white;
}
.container {
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  opacity: 0.8;
}
.form-container form {
  background: rgba(45, 52, 54, 1);
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.form-container input {
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 15px 0;
  width: 100%;
}
input[type="text"],
input[type="password"] {
  text-align: center;
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  font-family: "PLay", sans-serif;
  font-size: 16px;
  font-weight: 200px;
  padding: 10px 0;
  transition: border 0.5s;
  outline: none;
  color: #fff;
  font-weight: bold;
}
.button {
  padding: 1rem 2rem;
}
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  background-image: url(../assets/image/jsdx.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>