<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="initUserOrder" class="borad">
      <div v-for="order in userOrderList" :key="order.id">
        <van-cell
          :title="order.appointAddress"
          :label="order.appointTime |formatTime"
          class="van-cell"
        >
          <template slot="icon">
            <span class="car-number">{{ order.carNumber }}</span>
          </template>
          <van-button
            size="small"
            type="info"
            @click="ChangeOrderStatus(order)"
            :disabled="order.status!==1 && order.status!==3"
            class="orderBtn"
          >{{ statusList[order.status] }}</van-button>
          <van-button
            size="small"
            type="default"
            @click="showDetail(order)"
            class="orderDetail"
          >订单详情</van-button>
        </van-cell>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import userApi from "../apis/user.js";
import requestHandler from "../utils/requestHandler.js";
import moment from "moment";
import Config from "../config";
import { setTimeout } from "timers";
export default {
  name: "UserOrder",
  data() {
    const statusList = [
      "待接单",
      "已交车",
      "已交车",
      "现在取车",
      "待还车",
      "待支付",
      "已完成"
    ];
    return {
      statusList,
      OrderDetail: "",
      btnStatus: true,
      userOrderList: [],
      isLoading: false
    };
  },
  async created() {
    await this.initUserOrder();
    let webSocket = new WebSocket(
      `${Config.wsUrl()}/api/users/${this.$store.getters.id}/orders`
    );
    webSocket.onmessage = res => {
      this.initUserOrder();
      this.$store.commit("setDot", true);
      this.$store.commit("setWebSocketData", res.data);
      setTimeout(() => {
        this.$store.commit("setWebSocketData", null);
      }, 3000);
    };
    this.$store.commit("setWebSocket", webSocket);
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
      if (order.status === 3 || order.status === 1) {
        this.OrderDetail = order;
        await requestHandler
          .invoke(
            userApi.putAnOrder(
              this.$store.state.userInfo.id,
              order.id,
              order.status + 1
            )
          )
          .msg("操作成功","操作失败")
          .loading()
          .exec();
        this.userOrderList = await requestHandler
          .invoke(userApi.getAllOrders(this.$store.state.userInfo.id))
          .loading()
          .exec();
      }
    },
    async initUserOrder() {
      this.userOrderList = await requestHandler
        .invoke(userApi.getAllOrders(this.$store.state.userInfo.id))
        .loading()
        .exec();
      this.isLoading = false;
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
.orderBtn {
  margin-left: 20px;
  width: 80px;
  margin-bottom: 10px;
}
.orderDetail {
  margin-left: 20px;
  width: 80px;
}
</style>