<template>
  <div class="container">

    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>

    <!-- 广告栏 -->
    <el-row
      type="flex"
      justify="space-between"
    >

      <div>
        <SearchForm />
      </div>
      <!-- 广告 -->
      <div class="sale-banner">
        <img
          src="http://157.122.54.189:9093/images/pic_sale.jpeg"
          alt=""
        >
      </div>
    </el-row>

    <el-row
      type="flex"
      class="statement"
    >
      <el-col :span='8'>
        <i
          class="iconfont iconweibiaoti-_huabanfuben"
          style="color:#409EFF;"
        ></i>
        <span>100%航协认证</span></el-col>
      <el-col :span='8'>
        <i
          class="iconfont iconbaozheng"
          style="color:green;"
        ></i>
        <span>出行保证</span></el-col>
      <el-col :span='8'>
        <i
          class="iconfont icondianhua"
          style="color:#409EFF;"
        ></i>
        <span>7x24小时服务</span></el-col>
    </el-row>

    <h2 class="air-sale-title">
      <span class="iconfont icontejiajipiao"></span>
      <i>特价机票</i>
    </h2>

    <!-- 特价机票 -->
    <div class="air-sale">
      <el-row
        type="flex"
        justify="space-between"
        class="air-sale-pic"
      >
        <el-col
          :span="6"
          v-for="(item,index) in sales"
          :key="index"
        >
          <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
            <img :src="item.cover" />
            <el-row
              type="flex"
              justify="space-between"
              class="layer-bar"
            >
              <span>{{item.departCity}} - {{item.destCity}}</span>
              <span>￥{{Number(item.price).toFixed(2)}}</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/air/searchForm";
export default {
  data() {
    return {
      sales: []
    };
  },
  components: {
    SearchForm
  },
  mounted() {
    this.$axios({
      url: "/airs/sale"
    }).then(res => {
      // console.log(res.data);
      const { data } = res.data;
      this.sales = data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
.air-title {
  margin: 15px 0;
  color: orange;
  font-weight: normal;
  font-size: 20px;
  .span {
    font-size: 20px;
  }
}
.statement {
  height: 58px;
  border: 1px solid #dddddd;
  margin: 15px 0;
  background: #f5f5f5;
  padding: 10px 0;
  // box-sizing: border-box;
  > div * {
    vertical-align: middle;
  }
  > div {
    text-align: center;
    line-height: 38px;
    border-right: 1px solid #dddddd;
    &:last-child {
      border-right: none;
    }
    i {
      font-size: 30px;
    }
  }
}

.air-sale-title {
  margin: 15px 0;
  font-weight: normal;
  font-size: 20px;
  color: #409eff;
  span {
    font-size: 20px;
  }
}

.air-sale {
  border: 1px solid #dddddd;
  padding: 20px;
  margin-bottom: 50px;
  .air-sale-pic {
    > div {
      width: 225px;
      height: 140px;
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
      }
      .layer-bar {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 30px;
        width: 100%;
        line-height: 30px;
        font-size: 14px;
        padding: 0 15px;
        background: rgba(0, 0, 0, 0.5);
        color: #f5f5f5;
        span:last-child {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
