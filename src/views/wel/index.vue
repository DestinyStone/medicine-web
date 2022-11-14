<template>
  <div>
    <el-row>
      <el-col :span="24">
        <third-register></third-register>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <basic-container>
          <p style="text-align: center">
            <img src="https://img.shields.io/badge/Release-V2.8.1-green.svg" alt="Downloads"/>
            <img src="https://img.shields.io/badge/JDK-1.8+-green.svg" alt="Build Status"/>
            <img src="https://img.shields.io/badge/Spring%20Cloud-Hoxton.SR11-blue.svg" alt="Coverage Status"/>
            <img src="https://img.shields.io/badge/Spring%20Boot-2.2.13.RELEASE-blue.svg" alt="Downloads"/>
            <a target="_blank" href="https://bladex.vip">
              <img src="https://img.shields.io/badge/Saber%20Author-Small%20Chill-ff69b4.svg" alt="Downloads"/>
            </a>
            <a target="_blank" href="https://bladex.vip">
              <img src="https://img.shields.io/badge/Copyright%20-@BladeX-%23ff3f59.svg" alt="Downloads"/>
            </a>
          </p>
        </basic-container>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <basic-container>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="欢迎使用Saber" name="1">
              <div>1.Saber是BladeX前端UI系统</div>
              <div>2.对现有的avue2.0、element-ui库进行二次封装</div>
              <div>3.100%兼容原生element-ui库</div>
              <div>4.基于json驱动的模块配置，打造最好用的vuejs中后台脚手架</div>
              <div>5.使用Saber可以大幅度提升开发效率，不再为重复工作发愁</div>
            </el-collapse-item>
          </el-collapse>
        </basic-container>
      </el-col>
      <el-col :span="8">
        <el-row>
          <basic-container>
            <div class="el-font-size">
              <span>产品名称</span>
              <el-divider direction="vertical"/>
              <span><el-tag>单位信息资源管理系统</el-tag></span>
            </div>
          </basic-container>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "wel",
    data() {
      return {
        activeNames: ['1', '2', '3', '5'],
        logActiveNames: ['23']
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    methods: {
      handleChange(val) {
        window.console.log(val);
      }
    },
  };
</script>

<style>
  .el-font-size {
    font-size: 14px;
  }
</style>

