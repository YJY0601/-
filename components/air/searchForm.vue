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
          ref="form"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="出发城市">
            <el-autocomplete
              v-model="form.departCity"
              :fetch-suggestions="queryDepartSearch"
              placeholder="请搜索出发城市"
              @select="handleDepartSelect"
              style="width: 100%;"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="到达城市">
            <el-autocomplete
              v-model="form.destCity"
              :fetch-suggestions="queryDestSearch"
              placeholder="请搜索到达城市"
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
              :picker-options="pickerOptions"
              v-model="form.departDate"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width:100%"
              @click="handleSubmit"
            ><i class="el-icon-search"></i>
              搜索</el-button>
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
import moment from "moment";
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          // console.log(time.getTime() < new Date());
          return time.getTime() < new Date() - 1000 * 60 * 60 * 24;
        }
      },
      currentTab: 0,
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      form: {
        departCity: "", // 出发城市
        destCity: "", // 到达城市
        departDate: "", // 出发日期
        departCode: "", // 出发城市代码
        destCode: "" // 到达城市代码
      }
    };
  },
  methods: {
    // tab栏切换
    handleSearchTab(index) {
      // this.currentTab = index;
      if (index === 1) {
        this.$confirm("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },
    //**出发城市 */
    // 出发城市输入框获得焦点时触发
    async queryDepartSearch(value, cd) {
      const arr = await this.querySearchCity(value);
      if (arr.length > 0) {
        this.form.departCity = arr[0].value;
        this.form.departCode = arr[0].sort;
      }
      cd(arr);
    },
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // console.log(item);
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },

    /** 到达城市 */
    // 目标城市输入框获得焦点时触发
    async queryDestSearch(value, cd) {
      const arr = await this.querySearchCity(value);
      if (arr.length > 0) {
        this.form.destCity = arr[0].value;
        this.form.destCode = arr[0].sort;
      }

      cd(arr);
    },
    //  目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },
    /** 确认选择日期时触发 */
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },
    /** 触发和目标城市切换时触发 */
    handleReverse() {
      const { destCity, destCode, departCity, departCode } = this.form;

      this.form.destCity = departCity;
      this.form.destCode = departCode;

      this.form.departCity = destCity;
      this.form.departCode = destCode;
    },
    /** 提交表时触发 */
    handleSubmit() {
      const rules = {
        departCity: {
          value: this.form.departCity,
          message: "请选择出发城市"
        },
        destCity: {
          value: this.form.destCity,
          message: "请选择到达城市"
        },
        departDate: {
          value: this.form.departDate,
          message: "请选择出发时间"
        }
      };
      let valid = true;

      Object.keys(rules).forEach(v => {
        if (!valid) return;

        if (!rules[v].value) {
          valid = false;
          this.$message.warning(rules[v].message);
        }
      });
      if (valid) {
        this.$router.push({
          path: "/air/flights",
          query: this.form
        });
        // console.log(this.form);
      }

      const airs = JSON.parse(localStorage.getItem("airs ") || `[]`);
      airs.unshift(this.form);
      if (airs.length > 5) {
        airs.length = 5;
      }
      localStorage.setItem("airs ", JSON.stringify(airs));
    },
    querySearchCity(queryString) {
      return new Promise((resolve, reject) => {
        if (!queryString.trim()) {
          resolve([]);
          return;
        }

        this.$axios({
          url: "/airs/city",
          params: {
            name: queryString
          }
        }).then(res => {
          const { data } = res.data;
          const newData = data.map(v => {
            return {
              ...v,
              value: v.name.replace("市", "")
            };
          });

          // this.form.destCity = newData[0].value;
          // this.form.destCode = newData[0].sort;

          resolve(newData);
        });
        // cd(newData);
      });
    }
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
      &:hover {
        cursor: pointer;
      }
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