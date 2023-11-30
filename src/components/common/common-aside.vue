<template>
  <div class="common-aside">
    <div class="menu">
      <div>
        <div class="user">
          <div class="avatar">
            <img src="@/assets/image/avatar.png" />
          </div>
          <div class="user-name">Julie bell</div>
        </div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          text-color="RGB(125,133,146)"
          @select="handleSelect"
        >
          <div v-for="(item, index) in menuDataForVue" :key="index">
            <el-menu-item
              :index="item.path"
              v-if="item.path !== '/information'"
            >
              <el-icon class="menu-icon"><component :is="item.icon" /></el-icon>
              <span>{{ item.menuName }}</span>
            </el-menu-item>
            <!-- 消息管理 -->
            <el-menu-item :index="item.path" v-else>
              <el-badge :value="1" class="item">
                <el-icon class="menu-icon"
                  ><component :is="item.icon"
                /></el-icon>
                <span>{{ item.menuName }}</span>
              </el-badge>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
      <div class="exit" @click="handleExit">
        <div>
          <img src="@/assets/image/exit.png" />
        </div>
        <div>退出登录</div>
      </div>
    </div>
  </div>
</template>
    <script setup>
import { reactive } from "vue";
import store from "@/store";
import { useRouter } from "vue-router";
import apiFun from "@/api/user";
import {
  removeAccessToken,
  removeRefreshToken,
  removeRole,
} from "@/config/constants";
const router = useRouter();
const menuDataForVue = reactive(store.state.menu.menuData);
// 跳转界面
const handleSelect = (key, keyPath) => {
  router.push({ path: key });
};
// 退出
const handleExit = async () => {
  // 清除用户信息
  removeAccessToken();
  removeRefreshToken();
  removeRole();
  // const data = await apiFun.user.loginOut();
  // 跳转界面
  const href = router.resolve({
    path:"/login",
  })
  window.open(href.href,"_self")
};
</script>
<style scoped>
.common-aside {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.menu {
  height: 100vh;
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
  font-size: 24px;
  font-weight: 600;
}
/* 菜单样式设置 */
.el-menu {
  border: none !important;
  background-color: #fff;
}
.el-menu-item {
  justify-content: center;
  height: 47px;
}
.menu-icon {
  margin-right: 0.8rem;
}
/* 设置菜单触发和点击的样式 */
.el-menu-item:hover,
.el-menu-item.is-active {
  border-right: 3px solid RGB(65, 141, 254);
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
}
.exit > div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
}
.exit img {
  height: 1.5rem;
  width: 1.5rem;
}
</style>