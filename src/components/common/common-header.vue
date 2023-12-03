<template>
  <div class="common-header">
    <div class="left">
      <img src="@/assets/image/jsdxLogo.png" />
      <div class="description">
        <div class="text school">吉首大学</div>
        <div class="text">Jishou University</div>
      </div>
    </div>
    <div class="right">
      <el-dropdown>
        <div class="img">
          <img src="@/assets/image/avatar.png" />
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
import {
  removeAccessToken,
  removeRefreshToken,
  removeRole,
} from "@/config/constants";
// 退出
const handleExit = async () => {
  // 清除用户信息
  removeAccessToken();
  removeRefreshToken();
  removeRole();
  // const data = await apiFun.user.loginOut();
  // 跳转界面
  const href = router.resolve({
    path: "/login",
  });
  window.open(href.href, "_self");
};
</script>
<style scoped>
.common-header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left img,
.right img {
  height: 40px;
  width: 40px;
  margin-right: 1rem;
}
.left {
  display: flex;
  margin-left: 3rem;
}
.description {
  font-family: "Times New Roman", Times, serif;
}
.school {
  font-weight: bold;
}
.right {
  margin-right: 3rem;
}
::v-deep(.el-tooltip__trigger:focus-visible){
  outline: unset;
}

</style>