<template>
  <div>
    <el-row
      type="flex"
      justify="center"
      align="middle"
      class="main"
    >
      <div class="form-wrapper">
        <!-- 表单头部 tabs  -->
        <el-row
          type="flex"
          justify="center"
          class="tabs"
        >
          <span
            v-for="(item,index) in tabs"
            :key="index"
            @click="handleSearchTab(index)"
            :class="{active:currentTab===index}"
          >
            <i :class="item.icon"></i>
            {{item.name}}
          </span>

        </el-row>
        <!-- 组件 -->
        <el-form
          :model="form"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="出发城市"
            prop="pass"
          >
            <el-autocomplete
              v-model="state4"
              :fetch-suggestions="queryDepartSearch"
              placeholder="请输入出发城市"
              @select="handleDepartSelect"
              style="width: 100%;"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item
            label="到达城市"
            prop="checkPass"
          >
            <el-autocomplete
              v-model="state4"
              :fetch-suggestions="queryDestSearch"
              placeholder="请输入到达城市"
              @select="handleDestSelect"
              style="width: 100%;"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="出发时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
              @change="handleDate"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width:100%"
              @click="handleSubmit"
            >提交</el-button>
          </el-form-item>
        </el-form>
        <div class="reverse">
          <span @click="handleReverse">换</span>
        </div>
      </div>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ]
    };
  },
  methods: {
    // tab栏切换
    handleSearchTab(index) {
      this.currentTab = index;
    },
    //**出发城市 */
    // 出发城市输入框获得焦点时触发
    queryDepartSearch(value, cd) {
      cd([{ value: 1 }, { value: 2 }, { value: 3 }]);
    },
    // 出发城市下拉选择时触发
    handleDepartSelect() {},

    /** 到达城市 */
    // 目标城市输入框获得焦点时触发
    queryDestSearch(value, cd) {
      cd([{ value: 1 }, { value: 2 }, { value: 3 }]);
    },
    //  目标城市下拉选择时触发
    handleDestSelect() {},
    /** 确认选择日期时触发 */
    handleDate() {},
    /** 触发和目标城市切换时触发 */
    handleReverse() {},
    /** 提交表单是触发 */
    handleSubmit() {}
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 0 auto;
  position: relative;

  .demo-ruleForm {
    padding: 15px 50px 15px 15px;
  }
  .form-wrapper {
    width: 360px;
    height: 350px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    // border: 2px solid #000;
    overflow: hidden;

    .tabs {
      span {
        display: block;
        width: 50%;
        height: 48px;
        box-sizing: border-box;
        border-top: 2px #eee solid;
        background: #eee;
        line-height: 42px;
        text-align: center;
        cursor: pointer;
        color: #000000;

        &.active {
          // color: orange;
          border-top-color: orange;
          background: #fff;
          font-weight: bold;
        }
        i {
          margin-right: 5px;
          font-size: 18px;
        }
      }
    }
  }
  .reverse {
    &::before,
    &::after {
      display: block;
      position: absolute;
      top: 142px;
      right: 26px;
      width: 25px;
      height: 2px;
      content: "";
      background: #cccccc;
    }
    &::after {
      top: 80px;
    }
    span {
      position: absolute;
      top: 102px;
      right: 17px;
      font-size: 12px;
      color: #ffffff;
      background: #999999;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 2px;
      &::before,
      &::after {
        display: block;
        position: absolute;
        top: 20px;
        left: 10px;
        width: 2px;
        height: 22px;
        content: "";
        background: #cccccc;
      }
      &::after {
        top: -22px;
      }
    }
  }
}
</style>