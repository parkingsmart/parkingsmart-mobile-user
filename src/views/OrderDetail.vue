<template>
  <div>
    <div class="header">
      <van-icon class="back-icon" name="arrow-left" @click="back" />
      <span class="head">{{ title }}</span>
    </div>
    <div class="content">
      <van-cell-group>
        <van-cell title="车牌号码" size="large" :value="OrderDetail.title" />
        <van-cell title="订单开始时间" size="large" :value="OrderDetail.title" />
        <van-cell title="订单结束时间" size="large" :value="OrderDetail.title" />
      </van-cell-group>
    </div>
    <van-button class="footer-btn" :disabled="!btnStatus" type="info" disa>{{btnText}}</van-button>
  </div>
</template>

<script>
export default {
  name: "OrderDetail",
  data() {
    return {
      btnText: "现在取车",
      btnStatus: true,
      title: "订单详情"
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  computed: {
    OrderDetail() {
      return this.$store.state.orderDetail || {};
    }
  }
};
</script>
<style lang='scss' scoped>
.header {
  text-align: center;
  font-size: 15px;
}
.back {
  position: absolute;
  left: 10px;
}
.back-icon {
  float: left;
  font-size: 15px;
  line-height: 50px;
  color: white;
}
.footer-btn {
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>