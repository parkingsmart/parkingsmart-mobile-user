<template>
  <div class="order">
    <van-cell-group>
      <van-field label="车牌号" placeholder="请输入车牌号" v-model="carNum" />
      <van-field label="预约地点" placeholder="请输入停车地点" v-model="address" />
      <van-field
        @click="show=true"
        label="预约时间"
        placeholder="请选择停车时间"
        v-model="currentTime"
        :readonly="true"
      />
      <van-datetime-picker
        @confirm="show=false"
        v-show="show"
        v-model="currentTime"
        type="time"
        :min-hour="minHour"
        :max-hour="23"
      />
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
      appointTime: "",
      currentTime: "",
      show: false,
      minHour: new Date().getHours() - 1
    };
  },
  methods: {
    creatOrder() {
      if (this.carNum.trim() === "" || this.address.trim() === "") {
        this.$notify("请把信息填写完整");
        return;
      }
      let date = Date.parse(new Date());

      let order = {
        userId: 1,
        carNumber: this.carNum,
        appointAddress: this.address,
        appointTime: this.dateConverter(),
        createAt: date,
        status: 0
      };
      OrderApi.addOrder(order);
      this.$toast("下单成功");
    },

    dateConverter() {
      let date = new Date();
      let Y = date.getFullYear();
      let M = date.getMonth() + 1;
      let D = date.getDate();
      let timestr = `${Y}-0${M}-${D} ${this.currentTime}:00:000`;
      let timestamp = new Date(timestr).getTime();
      return timestamp;
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
