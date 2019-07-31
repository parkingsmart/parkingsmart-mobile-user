<template>
  <div id="app">
    <div>
      <router-view />
    </div>
    <div>
      <van-popup v-model="isShowPopup" position="top" :style="{ height: '10%' }">
        <span class="span-style">{{serverMsg}}</span>
      </van-popup>
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  computed: {
    serverMsg() {
      return this.$store.state.webSocketData;
    },
    isShowPopup() {
      return this.$store.state.webSocketData !== null;
    }
  }
};
</script>
<style lang="scss">
@import "./assets/css/styles.css";
</style>
