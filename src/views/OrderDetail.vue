<template>
  <div>
    <div class="header">
      <span class="back">
        <van-icon class="back-icon" name="arrow-left" @click="back" />
      </span>
      <span class="head">{{ title }}</span>
    </div>
    <div class="content">
      <van-steps
        v-if="orderDetail.status < 4"
        :active="orderDetail.status"
        active-icon="success"
        active-color="#38f"
      >
        <van-step>用户下单</van-step>
        <van-step>小哥接单</van-step>
        <van-step>用户交车</van-step>
        <van-step>小哥停车</van-step>
      </van-steps>
      <van-steps v-else :active="orderDetail.status % 4" active-icon="success" active-color="#38f">
        <van-step>通知小哥</van-step>
        <van-step>小哥还车</van-step>
        <van-step>完成订单</van-step>
      </van-steps>
      <van-cell-group>
        <van-cell title="订单号" size="large" :value="OrderDetail.id" />
        <van-cell title="订单开始时间" size="large" :value="OrderDetail.createAt| formatTime" />
        <van-cell title="订单状态" size="large">
          <template slot="default">
            <van-tag round type="success" class="cell-icon">{{ statusList[orderDetail.status] }}</van-tag>
          </template>
        </van-cell>
        <van-cell title="预约时间" size="large" :value="OrderDetail.appointTime| formatTime" />
        <van-cell title="订单结束时间" size="large" :value="OrderDetail.endAt| formatTime" />
        <van-cell title="预约地点" size="large" :value="OrderDetail.appointAddress" />
        <van-cell title="停车场" size="large" :value="parkingLot.name" />
        <van-cell
          v-show="OrderDetail.status ===5||OrderDetail.status ===6"
          title="总金额(元)"
          size="large"
          :value="OrderDetail.amount"
        />
        <van-cell v-show="OrderDetail.status ===5||OrderDetail.status ===6">
          <van-dropdown-menu>
            <van-dropdown-item :title="dropdownName" ref="item" :disabled="OrderDetail.status ===6">
              <van-radio-group v-model="chosePromotion.title">
                <van-cell-group>
                  <van-cell
                    v-for="parkingPromotion in promotions"
                    :key="parkingPromotion.id"
                    :title="parkingPromotion.title"
                    clickable
                    @click="choosePromotion(parkingPromotion)"
                  >
                    <van-radio
                      slot="right-icon"
                      :name="parkingPromotion.title"
                      :disabled="integral < 20"
                    />
                  </van-cell>
                  <van-cell title="不使用优惠" clickable @click="choosePromotion(null)">
                    <van-radio slot="right-icon" name="不使用优惠" />
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </van-dropdown-item>
          </van-dropdown-menu>
        </van-cell>
        <van-cell
          title="节约金额"
          size="large"
          :value="getDiscountAmount(OrderDetail, discountMoney.discount)"
          v-show="OrderDetail.status ===5||OrderDetail.status ===6"
        />
        <van-cell
          title="共支付(元)"
          size="large"
          :value="getShouldPay(OrderDetail, discountMoney)"
          v-show="OrderDetail.status ===5||OrderDetail.status ===6"
        />
        <van-cell title="服务时长" size="large" :value="getServeTime(OrderDetail)" />
      </van-cell-group>
    </div>
    <div class="footer-btn">
      <van-submit-bar
        :price="getShouldPay(OrderDetail, discountMoney)*100"
        button-text="支付订单"
        @submit="submitOrder"
        v-if="orderDetail.status === 5"
      >
        <span slot="tip">
          如果您有任何疑问，请联系客服电话(
          <a href="tel://13726267001">13726267001</a>)
        </span>
      </van-submit-bar>
      <div>
        <van-dialog
          v-model="show"
          title="请输入支付密码"
          :overlay="false"
          @confirm="comfirePwd"
          @cancel="cancelPwd"
          close-on-click-overlay
          show-cancel-button
        >
          <van-password-input :value="value" @focus="showKeyboard = true" />
        </van-dialog>
      </div>
      <!-- 数字键盘 -->
      <van-number-keyboard :show="show" @input="onInput" @delete="onDelete" @blur="show= false" />

      <van-overlay :show="show" @click="show = false" />
      <van-dialog
        v-model="showDialog"
        show-cancel-button
        @confirm="dialogConfirm"
        class="dialogContent"
      >
        <img class="icon" src="../assets/warning.png" />
        <p class="warnMess">您还未设置支付密码，是否前往设置？</p>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import userApi from "../apis/user.js";
import orderApi from "../apis/order.js";
import requestHandler from "../utils/requestHandler.js";
import moment from "moment";
import parkingPromotionApi from "../apis/parking_promotion.js";
import parkingLotApi from "../apis/parking_lot.js";
export default {
  name: "OrderDetail",
  data() {
    const statusList = [
      "待接单",
      "已接单",
      "已交车",
      "已停车",
      "待还车",
      "待支付",
      "已完成"
    ];
    return {
      waitMsg: "等待订单完成",
      btnText: "支付订单",
      statusList,
      title: "订单详情",
      orderDetail: {},
      pricePerHour: 10,
      isPromotion: false,
      integral: 0,
      value: "",
      show: false,
      showDialog: false,
      showKeyboard: false,
      dropdownName: "选择优惠",
      promotions: [],
      chosePromotion: { id: -1, title: "不使用优惠" },
      discountMoney: "",
      notUsePromotion: { id: -1, title: "不使用优惠" },
      parkingLot: {name:"未选择"}
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    back() {
      this.$router.go(-1);
    },
    getDiscountAmount(order, discount) {
      if (order.status === 5 && this.chosePromotion.id !== -1) {
        if (this.chosePromotion.type === 0) {
          return (order.amount - this.chosePromotion.amount * order.amount).toFixed(1);
        }
        if (this.chosePromotion.type === 1) {
          return (this.chosePromotion.amount).toFixed(1);
        }
      }
      if (order.status === 6) {
        return (
          order.amount - order.discountAmount
        ).toFixed(1);
      }
      return discount;
    },
    async choosePromotion(parkingPromotion) {
      if (parkingPromotion === null && this.OrderDetail.status !== 6) {
        this.chosePromotion = this.notUsePromotion;
        this.dropdownName = "不使用优惠";
        this.discountMoney = "";
      } else if (this.integral >= 20) {
        this.chosePromotion = parkingPromotion;
        this.dropdownName = parkingPromotion.title;
        this.discountMoney = await parkingPromotionApi.getDiscount(
          parkingPromotion.id,
          this.OrderDetail.amount
        );
      }
    },
    async initData() {
      this.promotions = await parkingPromotionApi.getAllPromotions();
      if (this.orderDetail.status === 5) {
        this.chosePromotion = this.getBestPromotion(
          this.integral,
          this.orderDetail.amount
        );
      }
      if (this.orderDetail.status === 6) {
        let promotionId = this.orderDetail.promotionId;
        this.chosePromotion = this.promotions.find(
          item => item.id === promotionId
        );
        if (this.chosePromotion === undefined) {
          this.chosePromotion = this.notUsePromotion;
        }
        this.dropdownName = this.chosePromotion.title;
      }
    },
    async submitOrder() {
      let user = await userApi.getUserInfo(this.$store.getters.id);
      if (user.payPassword === null) {
        this.showDialog = true;
        this.value = "";
        return;
      }
      this.show = true;
    },
    async comfirePwd() {
      let user = await userApi.getUserInfo(this.$store.getters.id);
      if (this.value === user.payPassword) {
        await requestHandler
          .invoke(
            userApi.finishOrder(
              this.$store.state.userInfo.id,
              this.orderDetail.id,
              this.chosePromotion.id
            )
          )
          .msg(null, "支付失败")
          .loading()
          .exec();
        this.refreshOrder();
        this.$toast.success("支付成功");
      } else {
        this.$toast.fail("密码错误");
      }
      this.value = "";
    },
    async refreshOrder() {
      let user = await userApi.getUserInfo(this.$store.getters.id);
      this.$store.commit("setUserInfo", user);
      this.orderDetail = await orderApi.getOrderById(this.orderDetail.id);
      this.$store.commit("setOrderDetail", this.orderDetail);
    },
    cancelPwd() {
      this.value = "";
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
    getShouldPay(order, discountMoney) {
      if (order.status === 5 && this.chosePromotion.id !== -1) {
        if (this.chosePromotion.type === 0) {
          return (this.chosePromotion.amount * order.amount).toFixed(1);
        }
        if (this.chosePromotion.type === 1) {
          return (order.amount - this.chosePromotion.amount).toFixed(1);
        }
      }
      if (discountMoney === "" && order.status !== 6) {
        return order.amount;
      }
      if (order.status === 6 && this.chosePromotion.id !== -1) {
        return order.discountAmount.toFixed(1);
      } else if (this.chosePromotion.id === -1) {
        return order.amount;
      } else return discountMoney.discountAmount;
    },
    getBestPromotion(integral, amount) {
      if (this.chosePromotion.id !== -1) {
        return this.chosePromotion;
      }
      let promotions = this.promotions;
      let promotion = {};
      let discount = 0;
      if (integral < 20) {
        return this.notUsePromotion;
      }
      for (let i of promotions) {
        if (i.type === 0) {
          if (i.amount * amount > discount) {
            discount = (1 - i.amount) * amount;
            promotion = i;
          }
        } else {
          if (i.amount > discount) {
            discount = i.amount;
            promotion = i;
          }
        }
      }
      this.dropdownName = promotion.title + "（推荐优惠）";
      return promotion;
    },
    dialogConfirm() {
      this.$router.push({
        name: "UserInfo",
        params: { setPayPwd: "setPayPwd" }
      });
    },
    async getParkingLot() {
      this.parkingLot = await parkingLotApi.getParkingLotById(this.orderDetail.parkingLotId);
    }
  },

  created() {
    this.orderDetail = this.$store.state.orderDetail;
    this.integral = this.$store.state.userInfo.integral;
    this.getParkingLot();
    if (this.orderDetail.status >= 5) {
      this.initData();
    }
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
.back {
  position: absolute;
  left: 10px;
}
.back-icon {
  font-size: 28px;
  line-height: 50px;
  color: white;
}
.content {
  margin-bottom: 50px;
}
.header {
  text-align: center;
  font-size: 15px;
  z-index: 2;
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
.dialogContent {
  text-align: center;
  padding-top: 30px;
  & .icon {
    height: 80px;
  }
  & .warnMess {
    margin-top: 10px;
  }
}
</style>
