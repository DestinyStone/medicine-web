<template>
  <div style="padding: 10px;" class="check-main-detail" ref="checkMainDetail">
    <div v-if="!validatenull(data)">
      <div class="content-wrapper">
        <div class="title">名称:</div>
        <div>{{data.name}}</div>
      </div>
      <div class="content-wrapper">
        <div class="title">症状:</div>
        <div v-html="putUp"></div>
      </div>
      <div class="content-wrapper">
        <div class="title">药方:</div>
        <div>{{data.solve}}</div>
      </div>
      <div class="content-wrapper">
        <div class="title" style="position:relative;">
          <div>注解:</div>
          <div @click="show = true" style="cursor: pointer;margin-top: 10px;"><i style="font-size: 25px" class="el-icon-tickets"/></div>
        </div>
        <div style="overflow: auto;" :style="{maxHeight: height + 'px'}"><pre style="margin-top: 0 !important;">{{data.remark}}</pre></div>
      </div>
    </div>
    <el-dialog
      append-to-body
      title="注解"
      :visible.sync="show"
      width="60%"
      :before-close="handleClose">
      <div :style="{height: bodyHeight + 'px', maxHeight: bodyHeight + 'px'}" style="overflow: auto; font-size: 20px;">
        <pre>{{data.remark}}</pre>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "check-main-detail",
    props: {
      high: {
        type: Array,
        default() {
          return [];
        }
      },
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        show: false,
        height: 0,
        bodyHeight: 0,
      }
    },
    computed: {
      putUp() {
        let highNames = this.high.map(item => item.value);
        if (this.validatenull(this.data)) {
          return "";
        }

        let putUps = this.data.putUp.split("，");
        let html = "";
        for(let i = 0; i<putUps.length; i++) {
          let item = putUps[i];
          let index = highNames.indexOf(item);
          html += index === -1 ? `<span>${item}</span>` : `<span style="color: #F56C6C;">${item}</span>`
          if (i < putUps.length - 1) {
            html += "，";
          }
        }
        return html;
      },
    },
    methods: {
      handleClose() {
        this.show = false;
      },
      setHeight() {
        if (this.validatenull(this.$refs['checkMainDetail'])) {
          return;
        }
        this.height = this.$refs['checkMainDetail'].offsetHeight - 160;
        this.bodyHeight = document.body.offsetHeight - 400;
        if (this.bodyHeight < 300) {
          this.bodyHeight = 300;
        }
      },
      init() {
        this.setHeight();
        setInterval(() => {
          this.setHeight();
        }, 500)
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
