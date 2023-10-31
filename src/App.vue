<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-10-31 19:41:11
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-10-31 21:26:59
 * @FilePath: \college-application\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>
<script setup>
import apiFun from './api/try.js'
import { onMounted } from 'vue'
onMounted(()=>{
  apiFun.user.login();
})
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
