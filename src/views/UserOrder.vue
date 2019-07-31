<template>
  <div>
    <div v-for="order in userOrderList" :key="order.id">
      <van-cell
        :title="order.appointAddress"
        :label="order.appointTime |formatTime"
        class="van-cell"
      >
      <template slot="title">
        <span style="">{{order.appointAddress}}</span>
      </template>
        <template slot="icon">
          <span class="car-number">{{ order.carNumber }}</span>
        </template>
      <van-button
        size="small"
        type="info"
        @click="ChangeOrderStatus(order)"
        :disabled="order.status!==2"
        class="orderBtn"
      >{{ getStatus(order) }}</van-button>
      <van-button
        size="small"
        type="default"
        @click="showDetail(order)"
        class="orderDetail"
      >订单详情</van-button>
      </van-cell>

    </div>
  </div>
</template>

<script>
import userApi from "../apis/user.js";
import requestHandler from "../utils/requestHandler.js";
import moment from "moment";
export default {
  name: "UserOrder",
  data() {
    return {
      btnText: [],
      OrderDetail: "",
      btnStatus: true,
      userOrderList: [],
      isdisable: false
    };
  },
  async created() {
    this.userOrderList = await requestHandler
      .invoke(userApi.getAllOrders(this.$store.state.userInfo.id))
      .loading()
      .exec();

    if (this.userOrderList[0].status === 3) {
      this.btnText = "现在取车";
    }
  },
  filters: {
    formatTime: function(value) {
      if (!value) return "";
      return "预约时间: " + moment(value).format("HH:mm");
    },
    formatAddress: function(value) {
      if (!value) return "";
      return "停车地点: " + value;
    }
  },
  methods: {
    showDetail(order) {
      this.OrderDetail = order;
      this.$store.commit("setOrderDetail", order);
      this.$router.push("/order-detail");
    },
    async ChangeOrderStatus(order) {
      if (order.status === 2) {
        this.OrderDetail = order;
        await requestHandler
          .invoke(userApi.putAnOrder(this.$store.state.userInfo.id, order.id))
          .loading()
          .exec();
        this.userOrderList = await requestHandler
          .invoke(userApi.getAllOrders(this.$store.state.userInfo.id))
          .loading()
          .exec();
      }
    },
    getStatus(order) {
      let result;
      switch (order.status) {
      case 0:
        result = "待接单";
        this.isdisable = false;
        break;
      case 1:
        result = "接单中";
        this.isdisable = false;
        break;
      case 2:
        result = "现在取车";
        this.isdisable = false;
        break;
      case 3:
        result = "取车中";
        this.isdisable = true;
        break;
      default:
        result = "订单已完成";
        this.isdisable = false;
        break;
      }
      return result;
    }
  }
};
</script>
<style lang='scss' scoped>
.car-number {
  font-weight: 500;
  display: inline-block;
  padding-right: 20px;
  min-width: 70px;
  color: #4595e6;
}
.van-cell {
  margin-bottom: 10px;
  margin-top: 20px;
}
.orderBtn{
  margin-left: 20px;
  width: 80px;
  margin-bottom: 10px;
}
.orderDetail{
  margin-left: 20px;
  width: 80px;
}
</style>