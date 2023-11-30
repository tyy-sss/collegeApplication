<template>
  <div class="volunteer-rule">
    <div class="show-container">
      <div class="title">
      <div class="text">志愿规则说明</div>
    </div>
    <div class="context">
      <div class="choose">
        <div class="explain-item">
          <div class="rule-text">第一志愿优先</div>
          <rule-explain :volunteer-rule="firstVolunteer" />
        </div>
        <div class="explain-item">
          <div class="rule-text">平行志愿</div>
          <rule-explain :volunteer-rule="rangeVolunteer" />
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script setup>
import { rangeVolunteer, firstVolunteer } from "@/assets/js/data/rule-explain";
import ruleExplain from "@/components/rule/rule-explain.vue";
</script>
<style src="@/assets/css/show-container.css" scoped/>
<style scoped>
.volunteer-rule > div:not(:last-child) {
  padding-bottom: 1rem;
}
.choose {
  display: flex;
  align-items: stretch;
}
.choose .explain-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  border: 2px solid RGB(235, 235, 235);
  border-radius: 1rem;
  padding: 1rem;
  margin: 1.5rem;
  margin-top: 0;
}
.choose .explain-item .rule-text {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>