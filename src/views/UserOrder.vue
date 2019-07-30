<template>
  <div>
    <div v-for="order in userOrderList" :key="order.id">
      <van-panel title="订单" :desc="order.carNumber" :status="order.status+''" class="van-panel" >
        <div slot="footer">
          <van-button
            size="small"
            type="info"
            @click="ChangeOrderStatus(order)"
            :disabled="!btnStatus"
            class="btn register"
          >{{order.status}}</van-button>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
import userApi from "../apis/user.js";
import requestHandler from "../utils/requestHandler.js";
export default {
  name: "UserOrder",
  data() {
    return {
      btnText: [],
      OrderDetail: "",
      btnStatus: true,
      userOrderList: []
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
  methods: {
    showDetail(order) {
      this.OrderDetail = order;
      this.$store.commit("setOrderDetail", order);
      this.$router.push("/order-detail");
    },
    async ChangeOrderStatus(order) {
      this.OrderDetail = order;
      await requestHandler
        .invoke(userApi.putAnOrder(this.$store.state.userInfo.id, order.id))
        .loading()
        .exec();
    }
  }
};
</script>
<style lang='scss' scoped>
.van-panel {
  margin-bottom: 20px;
}
</style>