<template>
  <div>
    <div class="index-main">
      <div class="index-right">
        <!--阴影层-->
        <div class="index-shade"></div>
        <div class="index-description">
          让预科志愿分配更加高效。
          <br />
          STATICHIT
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

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
  width: 80%;
  padding: 6rem 3rem;
  flex: 1;
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  background: url(../assets/image/wallpaper.png) center;
  background-size: cover;
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
.index-shade {
  position: absolute;
  left: 0;
  right: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  margin-top: -6rem;
}

</style>