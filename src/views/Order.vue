<template>
  <div class="order">
    <van-cell-group>
      <van-field
        label="车牌号"
        placeholder="请输入车牌号"
        v-model="carNum"
        left-icon="logistics"
        right-icon="arrow-down"
        @click-right-icon="showHistory()"
      />
      <van-picker
        show-toolbar
        v-show="isShowHistory"
        :columns="carNums"
        @confirm="confirmCarNum"
        @cancel="cancelCarNum"
      />
      <van-field label="预约地点" placeholder="请输入停车地点" v-model="address" left-icon="location-o" />
      <van-field
        @click="show=true"
        label="预约时间"
        placeholder="请选择停车时间"
        v-model="currentTime"
        :readonly="true"
        left-icon="underway-o"
      />
      <van-datetime-picker
        @confirm="show=false"
        @cancel="show=false"
        v-show="show"
        v-model="currentTime"
        type="time"
        :min-hour="minHour"
        :max-hour="23"
        :min-minute="minute"
        :item-height="20"
      />
      <van-button type="info" class="order-btn" @click="creatOrder" size="large">下单</van-button>
      <van-toast id="van-toast" />
    </van-cell-group>
  </div>
</template>

<script>
import userApi from "../apis/user.js";
import OrderApi from "../apis/order.js";
import RequestHandler from "../utils/requestHandler";
import Config from "../config";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      carNum: "",
      address: "",
      appointTime: "",
      currentTime: new Date().getHours() + ":" + (Array(2).join(0) +  new Date().getMinutes()).slice(-2),
      show: false,
      isShowPopup: false,
      isShowHistory: false,
      minHour: new Date().getHours(),
      carNums: [],
      ws: null
    };
  },
  async created() {
    let webSocket = new WebSocket(
      `${Config.wsUrl()}/api/users/${this.$store.getters.id}/orders`
    );
    webSocket.onmessage = res => {
      this.$store.commit("setWebSocketData", res.data);
      RequestHandler
        .invoke(userApi.getAllOrders(this.$store.getters.id))
        .loading()
        .exec();
      setTimeout(() => {
        this.$store.commit("setWebSocketData", null);
      }, 3000);
    };
    this.$store.commit("setWebSocket", webSocket);
    this.carNums = await RequestHandler.invoke(
      userApi.getByCarNums(this.$store.state.userInfo.id, "carNums")
    )
      .loading()
      .exec();
  },
  computed: {
    minute() {
      return this.currentTime.split(":")[0] !== new Date().getHours().toString() ? 0 : new Date().getMinutes();
    }
  },
  methods: {
    async creatOrder() {
      this.appointTime = this.dateConverter();
      let date = Date.parse(new Date());
      if (
        this.carNum.trim() === "" ||
        this.address.trim() === "" ||
        this.currentTime === ""
      ) {
        this.$toast("请把信息填写完整");
        return;
      } else if(!this.checkCarNum(this.carNum)) {
        this.$toast("请输入正确的车牌号");
        return;
      }
      let order = {
        userId: this.$store.state.userInfo.id,
        carNumber: this.carNum.replace(/\s*/g,""),
        appointAddress: this.address,
        appointTime: this.appointTime,
        createAt: date,
        status: 0
      };
      try {
        await RequestHandler.invoke(OrderApi.addOrder(order))
          .msg("下单成功")
          .exec();
        this.$router.push("/user-order");
      } catch (e) {
        e;
      }
    },
    dateConverter() {
      let date = new Date();
      let Y = date.getFullYear();
      let M = date.getMonth() + 1;
      let D = date.getDate();
      let timestr = `${Y}-${M}-${D} ${this.currentTime}:00:000`;
      let timestamp = new Date(timestr).getTime();
      return timestamp;
    },

    confirmCarNum(value) {
      if (value.length !== 0) {
        this.carNum = value;
      }
      this.isShowHistory = false;
    },
    cancelCarNum() {
      this.isShowHistory = false;
    },
    showHistory() {
      this.isShowHistory = !this.isShowHistory;
    },
    checkCarNum(carNum) {
      carNum = carNum.replace(/\s*/g,"");
      const re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
      return re.test(carNum);
    }
  }
};
</script>

<style lang='scss' scoped>
.order {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.order-btn {
  border-radius: 10vw;
  background: linear-gradient(to right, #0079c1, rgb(18, 150, 219));
}
</style>
