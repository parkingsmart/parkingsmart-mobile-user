<template>
  <div>
    <div v-for="order in userOrderList" :key="order.id">
      <van-panel
        :title="order.title"
        :desc="order.desc"
        :status="order.status"
        @click="showDetail(order)"
        class="van-panel"
      ></van-panel>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserOrder",
  data() {
    return {
      OrderDetail: "",
      userOrderList: [
        { id: 1, title: "title", desc: "desc", status: "status" },
        { id: 2, title: "1", desc: "1", status: "0" }
      ]
    };
  },
  methods: {
    showDetail(order) {
      this.OrderDetail = order;
      this.$store.commit("setOrderDetail", order);
      this.$router.push("/order-detail");
    }
  }
};
</script>
<style lang='scss' scoped>
.van-panel {
  margin-bottom: 20px;
}
</style>