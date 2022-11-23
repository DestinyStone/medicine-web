<template>
  <basic-container style="height: 100%;">
    组方, 功能未开发
    <div style="padding: 10px; display: flex; justify-content: center;">
      <el-button type="warning" @click="handlerBack">上一步</el-button>
      <el-button type="primary" @click="handlerNext">下一步</el-button>
    </div>
  </basic-container>
</template>

<script>
  export default {
    name: "check-component",
    methods: {
      handlerBack() {
        this.$emit("back");
      },
      handlerNext() {
        this.$emit("next");
      }
    }
  }
</script>

<style scoped>

</style>
