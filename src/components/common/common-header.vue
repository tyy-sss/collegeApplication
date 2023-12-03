<template>
  <div class="common-header">
    <div class="left">
      <img src="@/assets/image/jsdxLogo.png" />
      <div class="description">
        <div class="text school">吉首大学</div>
        <div class="text">Jishou University</div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>
<script setup>
</script>
<style scoped>
.common-header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left img {
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
</style>