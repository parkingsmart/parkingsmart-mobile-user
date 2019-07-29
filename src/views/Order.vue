<template>
  <div class="order">
    <van-cell-group>
      <van-field label="车牌号" placeholder="请输入车牌号" v-model="carNum" />
      <van-field label="预约地点" placeholder="请输入停车地点" v-model="address" />
      <van-button type="info" @click="creatOrder" size="large">下单</van-button>
      <van-toast id="van-toast" />
    </van-cell-group>
  </div>
</template>

<script>
import OrderApi from "../apis/order.js";
export default {
  data() {
    return {
      carNum: "",
      address: "",
      appointTime: ""
    };
  },
  methods: {
    creatOrder() {
      if ( this.carNum.trim() === "" || this.address.trim() === "" ) {
        this.$notify("请把信息填写完整");
        return;
      }
      let date = Date.parse(new Date());

      let order = {
        userId: 1,
        carNumber: this.carNum,
        appointAddress: this.address,
        appointTime: date,
        createAt: date,
        status: 0
      };
      OrderApi.addOrder(order);
      this.$toast("下单成功");
    }
  }
};
</script>

<style lang='scss' scoped>
.order {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
