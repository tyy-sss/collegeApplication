<template>
  <div class="login">
    <div class="index-main">
      <div class="index-right">
        <div class="container">
          <div class="form-container sign-in-container">
            <el-form
              ref="ruleFormRef"
              :model="data.userData"
              :rules="data.rules"
              class="demo-ruleForm"
            >
              <el-form-item>
                <h1>预科学院综测与专业分流系统</h1>
              </el-form-item>
              <el-form-item prop="userNumber">
                <input
                  type="text"
                  placeholder="账号"
                  v-model="data.userData.userNumber"
                />
              </el-form-item>
              <el-form-item prop="password">
                <input
                  type="password"
                  placeholder="密码"
                  v-model="data.userData.password"
                  autocomplete="off"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import apiFun from "@/api/user";
import { reactive, ref } from "vue";
import { throttle } from "@/assets/js/utils/throttle";
import { setRole, setAccessToken, setRefreshToken } from "@/constants/token";
import { ACCOUNT_TEST, PASSWORD_TEST } from "@/constants/regular-expression";
import { useRouter } from "vue-router";
const router = useRouter();
const data = reactive({
  userData: {
    type: 1,
    userNumber: "",
    password: "",
  },
  rules: {
    userNumber: [
      { required: true, message: "请输入账号", trigger: "blur" },
      {
        pattern: ACCOUNT_TEST,
        message: "请输入正确的账号，数字或者字母（6~16位）",
        trigger: "blur",
      },
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      {
        pattern: PASSWORD_TEST,
        message: "请输入数字或者字母（6~16位）",
        trigger: "blur",
      },
    ],
  },
});
const ruleFormRef = ref(null);
//登录
const login = throttle(() => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      // 节流
      apiFun.user
        .login(data.userData)
        .then((val) => {
          // 保存token 还有菜单信息
          setAccessToken(val.token.accessToken);
          setRefreshToken(val.token.refreshToken);
          setRole(val.role);
          const href = router.resolve({
            path: "/",
          });
          window.open(href.href, "_self");
        })
        .catch((err) => {
          console.log(err);
        });
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
  background: url(../assets/image/bk.jpg) center;
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
