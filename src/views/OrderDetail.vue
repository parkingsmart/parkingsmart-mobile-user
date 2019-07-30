<template>
  <div>
    <div class="header">
      <van-icon class="back-icon" name="arrow-left" @click="back" />
      <span class="head">{{ title }}</span>
    </div>
    <div class="content">
      <van-cell-group>
        <van-cell title="车牌号码" size="large" :value="OrderDetail.carNumber" />
        <van-cell title="订单开始时间" size="large" :value="OrderDetail.createAt" />
      </van-cell-group>
    </div>
    <van-button
      class="btn register"
      :disabled="!btnStatus"
      type="info"
      @click="ChangeOrderStatus"
    >{{btnText}}</van-button>
  </div>
</template>

<script>
import userApi from "../apis/user.js";
import requestHandler from "../utils/requestHandler.js";
export default {
  name: "OrderDetail",
  data() {
    return {
      btnText: "现在取车",
      btnStatus: true,
      title: "订单详情",
      orderDetail: {}
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async ChangeOrderStatus() {
      await requestHandler
        .invoke(
          userApi.putAnOrder(
            this.$store.state.userInfo.id,
            this.OrderDetail.orderID
          )
        )
        .loading()
        .exec();
      this.btnText = "正在取车";
    }
  },
  created() {
    this.orderDetail = this.$store.state.orderDetail;
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
.btn {
  width: 60vw;
  color: white;
  border-radius: 10vw;
  position: fixed;
  bottom: 0;
}
.register {
  background: linear-gradient(to right, rgb(194, 194, 194), rgb(166, 166, 166));
}
</style>