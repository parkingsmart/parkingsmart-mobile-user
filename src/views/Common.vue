<template>
  <div>
    <div class="header">
      <span v-show="isShowIcon" class="back">
        <van-icon class="back-icon" name="arrow-left" @click="back" />
      </span>
      <span class="head">{{ title }}</span>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <van-tabbar route v-model="title">
        <van-tabbar-item replace to="/user-order" icon="description" name="我的订单">我的订单</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "common",
  data() {
    return {
      title: "我的订单",
      isShowIcon: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='scss' scoped>
.header {
  text-align: center;
}
.back {
  position: absolute;
  left: 10px;
}
.back-icon {
  font-size: 28px;
  line-height: 50px;
  color: white;
}
</style>
