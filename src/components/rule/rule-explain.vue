<template>
  <div class="rule-explain">
    <div v-for="(item, index) in volunteerRule" :key="index">
      <div class="rule-item">
        <div class="text">
          {{ item.text }}
        </div>
        <div>:</div>
        <div class="context">
          {{ item.context }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ volunteerRule: Array });
const volunteerRule = props.volunteerRule;
</script>
<style scoped>
.rule-explain {
  margin-top: 0.5rem;
}
.rule-item {
  display: flex;
  color: #444;
  margin-bottom: 0.35rem;
  font-size: 14px;
}
.rule-item > div {
  margin-right: 0.6rem;
}
.rule-item .text {
  text-align: center;
  min-width: 56px;
  margin-right: 0.5rem;
  font-weight: bold;
}
</style>