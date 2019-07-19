<template>
  <div class="aside">
    <div class="statement">
      <el-row
        type="flex"
        justify="space-between"
        class="statement-list"
      >
        <el-col :span="8">
          <i
            class="iconfont iconweibiaoti-_huabanfuben"
            style="color:#409EFF;"
          ></i>
          <span>航协认证</span>
        </el-col>
        <el-col :span="8">
          <i
            class="iconfont iconbaozheng"
            style="color:green;"
          ></i>
          <span>出行保证</span>
        </el-col>
        <el-col :span="8">
          <i
            class="iconfont icondianhua"
            style="color:#409EFF;"
          ></i>
          <span>7 x 24</span>
        </el-col>
      </el-row>
      <p>
        免费客服电话:4006345678转2
      </p>
    </div>
    <div class="history">

      <h5>历史查询</h5>
      <nuxt-link
        :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
        v-for="(item,index) in history"
        :key="index"
      >
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          class="history-item"
        >
          <div class="air-info">
            <div>{{item.departCity}} - {{item.destCity}}</div>
            <p>{{item.departDate}}</p>
          </div>
          <span>选择</span>

        </el-row>

      </nuxt-link>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      history: []
    };
  },
  mounted() {
    this.history = JSON.parse(localStorage.getItem("airs ") || `[]`);
    // console.log(this.history);
  }
};
</script>
<style lang="less" scoped>
.aside {
  width: 240px;

  .statement {
    border: 1px solid #dddddd;
    margin: 20px 0 10px 0;
    .statement-list {
      text-align: center;
      font-size: 10px;
      margin: 12px 0;
      i {
        display: block;
        font-size: 40px;
      }
    }
    p {
      text-align: center;
      font-size: 14px;
      background: #f6f6f6;
      height: 32px;
      line-height: 32px;
    }
  }
  .history {
    border: 1px solid #dddddd;
    h5 {
      margin: 10px;
      padding-bottom: 10px;
      font-size: 18px;
      border-bottom: 1px solid #dddddd;
      font-weight: normal;
    }
    .history-item {
      margin: 0 10px;
      font-size: 14px;
      padding-bottom: 15px;
      p {
        font-size: 10px;
        padding: 5px 0;
        color: #666666;
      }
      span {
        width: 50px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        display: block;
        color: #ffffff;
        background: #ffa500;
        border-radius: 4px;
      }
    }
  }
}
</style>
