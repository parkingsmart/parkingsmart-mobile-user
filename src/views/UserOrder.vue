<template>
  <div>
    <div v-for="order in userOrderList" :key="order.id">
      <van-panel title="订单" :desc="order.carNumber" class="van-panel">
        <div slot="footer">
          <van-button
            size="small"
            type="info"
            @click="ChangeOrderStatus(order)"
            :disabled="order.status!==2"
            class="btn register"
          >{{ getStatus(order) }}</van-button>
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
.van-panel {
  margin-bottom: 20px;
}
</style>