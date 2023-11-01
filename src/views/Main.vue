<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          text-color="RGB(116,121,140)"
          @select="handleSelect"
        >
          <div v-for="(item, index) in menuDataForVue" :key="index">
            <el-menu-item :index="item.path">
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.menuName }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
  <script setup>
import { onMounted, reactive } from "vue";
import { menuData } from "@/assets/js/data/menu";
import store from "@/store";
import { useRouter } from "vue-router";
const router = useRouter();

const menuDataForVue = reactive(store.state.menu.menuData);

// 跳转界面
const handleSelect = (key, keyPath) => {
  router.push({ path: key });
}

onMounted(() => {
  store.commit("setMenu", menuData);
  store.commit("addMenu");
});
</script>
<style scoped>
</style>