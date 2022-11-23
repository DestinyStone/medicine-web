<template>
  <div>
    <check-main v-if="current === map[0]" @next="handlerNext"/>
    <check-component v-if="current === map[1]" @next="handlerNext" @back="handlerBack"/>
    <check-number v-if="current === map[2]" @back="handlerBack" @finish="handlerFinish"/>
  </div>
</template>

<script>
  import CheckMain from "./component/check-main";
  import CheckComponent from "./component/check-component";
  import CheckNumber from "./component/check-number";
  export default {
    name: "index",
    components: {CheckNumber, CheckComponent, CheckMain},
    data() {
      return {
        currentIndex: 0,
        current: "main",
        map: ["main", "component", "numbers"]
      }
    },
    methods: {
      handlerBack() {
        this.current = this.map[--this.currentIndex];
      },
      handlerNext() {
        this.current = this.map[++this.currentIndex];
      },
      handlerFinish() {
        this.$message({type: "warning", message: "功能未开发"})
      }
    }
  }
</script>

<style scoped>

</style>
