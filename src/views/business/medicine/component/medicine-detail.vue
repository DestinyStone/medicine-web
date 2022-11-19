<template>
  <el-dialog
    title="详情"
    :visible.sync="show"
    width="50%"
    append-to-body
    :before-close="handleClose">
    <div class="medicine-wrapper">
      <table class="message-table" style="width: 100%">
        <col width="30%" />
        <col width="70%" />
        <tr>
          <td class="message-title">名称</td>
          <td>{{detail.name}}</td>
        </tr>
        <tr>
          <td class="message-title">症状</td>
          <td>{{detail.putUp}}</td>
        </tr>
        <tr>
          <td class="message-title">药方</td>
          <td>{{detail.solve}}</td>
        </tr>
        <tr>
          <td class="message-title">注解</td>
          <td>
            <pre style="padding: 0;">{{detail.remark}}</pre>
          </td>
        </tr>
      </table>
    </div>
  </el-dialog>
</template>

<script>
  import Medicine from "../../../../api/business/medicine/medicine";

  export default {
    name: "medicineDetail",
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      id: {
        type: String,
      }
    },
    data() {
      return {
        detail: {},
      }
    },
    watch: {
      show() {
        this.$emit("update:show", this.show);
      }
    },
    methods: {
      handleClose() {
        this.show = false;
      },
      init() {
        Medicine.detail(this.id).then(res => {
          this.detail = res.data.data;
        })
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  .medicine-wrapper .message-table {

  }
  .medicine-wrapper .message-table td {
    border: 1px solid rgb(227, 237, 255);
    padding: 10px;
  }
  .medicine-wrapper .message-table .message-title {
    text-align: right;
    background: rgb(239, 245, 255);
  }
  .medicine-wrapper .message-table .message-content {

  }
</style>
