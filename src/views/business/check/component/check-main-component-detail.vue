<template>
  <div style="padding: 10px;" class="check-main-detail" ref="checkMainDetail">
    <div v-if="!validatenull(data)">
      <div v-for="(item, index) in data" :key="index" style="margin-bottom: 20px;">
        <div class="content-wrapper">
          <div class="title">名称:</div>
          <div>{{item.name}}</div>
        </div>
        <div class="content-wrapper">
          <div class="title">本草药性:</div>
          <div>
            <span v-if="item.isExist === 0" style="color: #F56C6C;">系统未记载</span>
            <span v-if="item.isExist === 1" style="color: gray;">{{item.remark}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "check-main-component-detail",
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        height: 0
      }
    },
    methods: {
      init() {
        this.height = this.$refs['checkMainDetail'].offsetHeight - 160;
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>
.check-main-detail .content-wrapper  .title {
  width: 80px;
  text-align: center;
  min-width: 80px;
}
.check-main-detail .content-wrapper {
  display: flex;
}
</style>
