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
      <van-tabbar route>
        <van-tabbar-item replace to="/order" icon="description" name="立即下单">立即下单</van-tabbar-item>
        <van-tabbar-item replace to="/user-order" icon="description" name="订单">订单</van-tabbar-item>
        <van-tabbar-item replace to="/user-info" icon="friends-o" name="我的">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "common",
  data() {
    return {
      title: "Parking Smart",
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
  background: linear-gradient(to right, #0079c1, rgb(18, 150, 219));
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
