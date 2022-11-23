<template>
  <basic-container style="height: 100%;">
    组方单, 功能未开发
    <div style="padding: 10px; display: flex; justify-content: center;">
      <el-button type="primary" @click="handlerBack">上一步</el-button>
      <el-button type="success" @click="handlerFinish">完成</el-button>
    </div>
  </basic-container>
</template>

<script>
  export default {
    name: "check-number",
    methods: {
      handlerBack() {
        this.$emit("back");
      },
      handlerFinish() {
        this.$emit("finish");
      }
    }
  }
</script>

<style scoped>

</style>
