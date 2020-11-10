<template lang="pug">
  Navigator(:defaultRoute="'/home'")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class App extends Vue {
  msg = "OIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII";
}
</script>

<style scoped lang="scss">
.page {
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .title {
    text-align: left;
    padding-left: 16;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }

  .drawer-header {
    padding: 50 16 16 16;
    margin-bottom: 16;
    background-color: #53ba82;
    color: #ffffff;
    font-size: 24;
  }

  .drawer-item {
    padding: 8 16;
    color: #333333;
    font-size: 16;
  }
}
</style>
