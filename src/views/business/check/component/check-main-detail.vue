<template>
  <div style="padding: 10px;" class="check-main-detail" ref="checkMainDetail">
    <div v-if="!validatenull(data)">
      <div class="content-wrapper">
        <div class="title">名称:</div>
        <div>{{data.name}}</div>
      </div>
      <div class="content-wrapper">
        <div class="title">症状:</div>
        <div>{{data.putUp}}</div>
      </div>
      <div class="content-wrapper">
        <div class="title">药方:</div>
        <div>{{data.solve}}</div>
      </div>
      <div class="content-wrapper">
        <div class="title">注解:</div>
        <div style="overflow: auto;" :style="{maxHeight: height + 'px'}"><pre style="margin-top: 0 !important;">{{data.remark}}</pre></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "check-main-detail",
    props: {
      data: {
        type: Object,
        default() {
          return {}
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
