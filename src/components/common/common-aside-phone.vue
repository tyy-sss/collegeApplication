<template>
  <!-- 侧边栏手机端 -->
  <div class="common-aside">
    <div class="menu">
      <div class="middle">
        <div class="user">
          <div class="avatar">
            <img
              src="@/assets/image/jsdxLogo.png"
              :style="{ width: imgWidth, height: imgWidth }"
            />
          </div>
          <div class="name">
            <div class="user-name" v-if="!store.state.menu.isCollapse">
              吉首大学
            </div>
            <div class="collapse" @click="handleCollapse">
              <img src="@/assets/image/collapse.png" />
            </div>
          </div>
          <div class="description" v-if="!store.state.menu.isCollapse">
            Jishou University
          </div>
        </div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          text-color="RGB(125,133,146)"
          :collapse="store.state.menu.isCollapse"
          :collapse-transition="false"
          @select="handleSelect"
        >
          <el-menu-item
            :index="item.path"
            v-for="item in menuDataForVue"
            :key="item.path"
          >
            <el-icon v-if="item.path !== '/information'" class="menu-icon"
              ><component :is="item.icon"
            /></el-icon>
            <template v-if="item.path !== '/information'" #title>{{
              item.menuName
            }}</template>
            <el-badge
              v-if="item.path === '/information'"
              :value="1"
              class="item"
            >
              <el-icon class="menu-icon"><component :is="item.icon" /></el-icon>
              <span>{{ item.menuName }}</span>
            </el-badge>
          </el-menu-item>
          <!-- 消息管理 -->
        </el-menu>
      </div>
      <div class="exit" @click="handleExit">
        <div>
          <img src="@/assets/image/exit.png" />
        </div>
        <div v-if="!store.state.menu.isCollapse">退出登录</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import apiFun from "@/api/user.js";
import store from "@/store";
import { useRouter } from "vue-router";
import {
  removeAccessToken,
  removeRefreshToken,
  removeRole,
} from "@/constants/token";
import apiFun from "@/api/user";
const router = useRouter();
const menuDataForVue = reactive(store.state.menu.menuData);
const imgWidth = ref(null);
// 设置图片展示的大小
const setImgWidth = () => {
  if (store.state.menu.isCollapse) {
    // 收缩
    imgWidth.value = "48px";
  } else {
    imgWidth.value = "70px";
  }
};
// 手动收缩
const handleCollapse = () => {
  store.commit("setIsCollapse");
  setImgWidth();
};
// 跳转界面
const handleSelect = (key, keyPath) => {
  router.push({ path: key });
};
// 退出
const handleExit = () => {
  apiFun.user.loginOut().then(() => {
    // 清除用户信息
    removeAccessToken();
    removeRefreshToken();
    removeRole();
    // 跳转界面
    const href = router.resolve({
      path: "/login",
    });
    window.open(href.href, "_self");
  });
};
onMounted(() => {
  setImgWidth();
});
</script>
<style scoped>
.common-aside {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.menu {
  overflow: hidden;
  /* height: 100vh; */
  background-color: #fff;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
/* 个人信息 */
.user > div {
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
}
.avatar > img {
  height: 5rem;
  width: 5rem;
}
.user-name {
  font-size: 1.5rem;
  font-weight: bolder;
  font-family: "Times New Roman", Times, serif;
}

.collapse {
  display: flex;
  align-items: center;
  justify-content: center;
}
.collapse img {
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.5rem;
}
.description {
  font-family: "Times New Roman", Times, serif;
  font-size: 1rem;
}
/* 菜单样式设置 */
.el-menu {
  border: none !important;
  background-color: #fff;
}
.el-menu-item {
  justify-content: center;
  height: 5rem;
  font-size: 1.2rem;
}
.menu-icon {
  margin-right: 0.5rem;
}
/* 设置菜单触发和点击的样式 */
.el-menu-item:hover,
.el-menu-item.is-active {
  border-right: 0.2rem solid RGB(65, 141, 254);
  color: RGB(63, 140, 255);
  background: RGB(235, 243, 255);
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
}
::v-deep .el-badge__content.is-fixed {
  transform: translateY(-20%) translateX(100%);
}
/* 退出登录 */
.exit {
  display: flex;
  justify-content: center;
  color: RGB(125, 133, 146);
  font-size: 1.1rem;
}
.exit > div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
}
.exit img {
  height: 1.2rem;
  width: 1.2rem;
}
</style>
