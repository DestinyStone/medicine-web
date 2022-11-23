<template>
  <div class="check-main-select" style="height: 100%; overflow: auto; width:100%;">
    <div class="check-main-select-item" :class="{'active': currentIndex === index}" @click="handlerClick(item, index)" @dblclick="handlerDbClick(item, index)" v-for="(item, index) in options" :key="index" style="padding: 10px; cursor: pointer; display: flex; justify-content: space-between;">
      <div style="white-space: nowrap; padding-right: 10px;">
        <span v-if="item.slot === true">{{item.value}}</span>
        <slot :data="item" v-if="item.slot === false"/>
      </div>
      <div class="close">
        <i v-if="isClose" class="el-icon-circle-close" @click.stop="handlerClose(item)"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "checkMainSelect",
    props: {
      isHoverStop: {
        type: Boolean,
        default: false,
      },
      isClose: {
        type: Boolean,
        default: false,
      },
      options: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        currentIndex: -1,
        selectIndex: -1,
      }
    },
    methods: {
      setCurrentIndex(index) {
        if (!this.isHoverStop) {
          return;
        }
        this.currentIndex = index;
      },
      handlerClose(item) {
        this.$emit("close", item);
      },
      handlerClick(item, index) {
        this.setCurrentIndex(index);
        this.$emit("click", item);
      },
      handlerDbClick(item, index) {
        this.setCurrentIndex(index);
        this.$emit("dbClick", item);
      }
    }
  }
</script>

<style scoped>
  .check-main-select-item:hover {
    background: #40a9ff;
    color: #ffffff;
  }
  .check-main-select-item .active {
    background: #40a9ff;
    color: #ffffff;
  }
  .check-main-select .close:hover {
    color: #F56C6C;
  }
</style>
