<template>
  <el-row
    type="flex"
    justify="space-between"
    class="flight-title"
  >
    <el-col :span="5">航空信息</el-col>
    <el-col :span="5">起飞时间</el-col>
    <el-col :span="5">到底时间</el-col>
    <el-col :span="5">价格</el-col>
  </el-row>

</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.flight-title {
  padding: 0 15px;
  width: 745px;
  height: 38px;
  line-height: 38px;
  background-color: #f6f6f6;
  font-size: 12px;
  color: #666666;
  margin-bottom: 10px;
  border: 1px solid #dddddd;
  > div {
    text-align: center;
  }
}
</style>

