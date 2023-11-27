<template>
  <div>学校信息</div>
  <div class="router">{{ id }}</div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const id = ref(route.query.id);
</script>
<style scoped>
</style>