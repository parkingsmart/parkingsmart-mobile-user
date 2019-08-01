<template>
  <div id="app">
    <div>
      <router-view />
    </div>
    <div>
      <van-popup v-model="isShowPopup" position="top" class="popup">
        <span>
          <van-icon name="chat" class="icon-style" size="20px" />
          <span class="span-title">通知</span>
        </span>
        <div style="margin-top: 6px;">
          <span class="span-style">{{serverMsg}}</span>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { getToken } from './utils/token';

export default {
  name: "app",
  computed: {
    serverMsg() {
      return this.$store.state.webSocketData;
    },
    isShowPopup() {
      return this.$store.state.webSocketData !== null;
    }
  },
  created() {
    if (getToken()) {
      this.$store.dispatch("getUserInfo");
    }
  }
};
</script>
<style lang="scss">
@import "./assets/css/styles.css";
.popup {
  height: 8%;
  border-bottom-left-radius: 4vw;
  border-bottom-right-radius: 4vw;
  background: #7d7e80;
  border-top-left-radius: 4vw;
  border-top-right-radius: 4vw;
  margin-top: 2px;
  font-size: 14px;
}
.span-title{
  margin-left: 5px;
}
.span-style {
  margin-left: 10px;
  font-size: 14px;
}
.icon-style {
  color: #1296db;
  margin-left: 10px;
  margin-top: 5px;
}
</style>
