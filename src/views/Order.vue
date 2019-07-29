<template>
  <div class="order">
    <van-cell-group>
      <van-field label="车牌号" placeholder="请输入车牌号" v-model="carNum"/>
      <van-field label="地点" placeholder="请输入停车地点" v-model="address"/>
      <van-field label="预约时间" placeholder="请输入预约时间" v-model="oppointTime"/>
      <van-button type="info">下单</van-button>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data(){
    return{
      carNum:'',
      address:'',
      oppointTime:''
    };
  },
  methods:{

  }
};
</script>

