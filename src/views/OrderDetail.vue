<template>
  <div>
    <div class="header">
      <van-icon class="back-icon" name="arrow-left" @click="back" />
      <span class="head">{{ title }}</span>
    </div>
    <div class="content">
      <van-cell-group>
        <van-cell title="订单号" size="large" :value="OrderDetail.id" />
        <van-cell title="订单开始时间" size="large" :value="OrderDetail.createAt| formatTime" />
        <van-cell title="订单状态" size="large">
          <template slot="default">
            <van-tag round type="success" class="cell-icon">{{ getStatus(orderDetail.status) }}</van-tag>
          </template>
        </van-cell>
        <van-cell title="预约时间" size="large" :value="OrderDetail.appointTime| formatTime" />
        <van-cell title="订单结束时间" size="large" :value="OrderDetail.endAt| formatTime" />
        <van-cell title="预约地点" size="large" :value="OrderDetail.appointAddress" />
        <van-cell title="总金额(元)" size="large" :value="getAllMoney(OrderDetail)" />
        <van-cell title="优惠活动" size="large" :value="getPromotion(integral)?'减免8元':'不参加'" />
        <van-cell title="共支付(元)" size="large" :value="getShouldPay(OrderDetail,integral)" />
        <van-cell title="服务时长" size="large" :value="getServeTime(OrderDetail)" />
      </van-cell-group>
    </div>
    <div class="footer-btn">
      <van-button
        type="info"
        @click="payAnOrder"
        v-if="orderDetail.status!==5"
        :disabled="OrderDetail.status!==4"
      >{{btnText}}
      </van-button>
    </div>
  </div>
</template>

<script>
import userApi from "../apis/user.js";
import requestHandler from "../utils/requestHandler.js";
import moment from "moment";
export default {
  name: "OrderDetail",
  data() {
    return {
      waitMsg: "等待订单完成",
      btnText: "支付订单",
      statusText: ["待接单","停车中","停放完毕","取车中","订单完成，等待支付中","已支付"],
      title: "订单详情",
      orderDetail: {},
      pricePerHour: 10,
      isPromotion: false,
      integral: 20,
      isdisable: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async payAnOrder() {
      await requestHandler
        .invoke(userApi.updateOrderStatus(this.$store.state.userInfo.id, this.orderDetail.id))
        .msg("支付成功", "支付失败")
        .loading()
        .exec();
      this.isdisable = true;
      this.orderDetail.status = 5;
    },
    getTimeDiff(order) {
      let startTime = moment(order.createAt);
      let endTime = moment(order.endAt);
      return endTime.diff(startTime, "minute");
    },
    getServeTime(order) {
      let allMinutes = this.getTimeDiff(order);
      if (order.endAt !== null) {
        return `${Math.floor(allMinutes / 60)}小时 ${allMinutes % 60}分钟`;
      } else return this.waitMsg;
    },
    getAllMoney(order) {
      if (order.endAt !== null) {
        return 10 * Math.ceil(this.getTimeDiff(order) / 60);
      } else return this.waitMsg;
    },
    getShouldPay(order, integral) {
      let allMoney = this.getAllMoney(order);
      if (order.endAt !== null && this.getPromotion(integral)) {
        return allMoney > 8 ? allMoney - 8 : 0;
      }
      return allMoney;
    },
    getPromotion(integral) {
      return integral >= 20 ? true : false;
    },
    getStatus(status) {
      return this.statusText[status];
    }
  },
  created() {
    this.orderDetail = this.$store.state.orderDetail;
  },
  computed: {
    OrderDetail() {
      return this.$store.state.orderDetail || {};
    }
  },
  filters: {
    formatTime: function(time) {
      if (!time) return "";
      return moment(time).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>
<style lang='scss' scoped>
.content {
  margin-bottom: 50px;
}
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
