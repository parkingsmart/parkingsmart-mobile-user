<template>
  <div class="order">
    <van-cell-group>
      <van-field label="车牌号" placeholder="请输入车牌号" v-model="carNum"/>
      <van-field label="地点" placeholder="请输入停车地点" v-model="address"/>
      <van-field label="预约时间" placeholder="请输入预约时间" v-model="appointTime"/>
      <van-button type="info" @click="creatOrder">下单</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import OrderApi from '../apis/order.js';
export default {
  data(){
    return{
      carNum:"",
      address:"",
      appointTime:""
    };
  },
  methods:{
    creatOrder(){
      let order = {
        userId: 1,
        appointTime: this.appointTime,
        carNumber: this.carNum,
        appointAddress: this.address,
        createAt: 1232,
        status:0
      };
      OrderApi.addOrder(order);
    }
  }
};
</script>

