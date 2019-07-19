<template>
  <div class="contianer">
    <el-row
      type="flex"
      justify="space-between"
    >

      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters
          :data="cacheFlightsData"
          @changeDataList="changeDataList"
        />

        <!-- 航班头部布局 -->
        <FlightsListHead />
        <!-- 航班信息 -->
        <FlightsItem
          v-for="(item,index) in dataList"
          :key="index"
          :data="item"
        />
        <!-- 分页布局 -->
        <div
          class="isShow"
          v-if="isShow"
        >
          <span>暂无航班信息！</span>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          v-if="!isShow"
        >
        </el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </div>
</template>
<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";
export default {
  data() {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // dataList: [],
      // 分页
      pageIndex: 1,
      pageSize: 5,
      total: 0,

      isShow: false
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },

  computed: {
    // 当前页面渲染的列表数据
    dataList() {
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
    }
  },
  // 组件内的导航守卫
  beforeRouteUpdate(to, from, next) {
    next();
    this.getData();
  },
  // watch: {
  //   $route() {
  //     this.getData();
  //   }
  // },
  methods: {
    getData() {
      this.$axios({
        url: "airs",
        params: this.$route.query
      }).then(res => {
        this.flightsData = res.data;
        // console.log(res.data);
        // console.log(this.flightsData);
        this.cacheFlightsData = { ...res.data };
        this.total = this.flightsData.flights.length;
      });
    },
    handleSizeChange(value) {
      this.pageSize = value;
    },
    handleCurrentChange(value) {
      this.pageIndex = value;
    },
    changeDataList(arr) {
      this.flightsData.flights = arr;
      this.total = this.flightsData.flights.length;
      this.pageIndex = 1;

      !this.total ? (this.isShow = true) : (this.isShow = false);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.contianer {
  width: 1000px;
  margin: 0 auto;
  .flights-content {
    width: 745px;
    font-size: 14px;
    margin: 20px 0;
  }
  .isShow {
    text-align: center;
    color: #999999;
    margin: 40px 0 60px 0;
  }
  .aside {
    width: 240px;
  }
}
</style>
