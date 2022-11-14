<template>
  <div>
    <el-upload
      :http-request="handlerUpload"
      :on-remove="handlerRemove"
      :show-file-list="false"
      :file-list="fileList"
      :limit="limit">
      <div style="display: flex;">
        <i><el-button size="mini" type="primary">点击上传</el-button></i>
        <div @click.stop style="margin-left: 20px;">
          <div v-if="file.name !== null && file.name !== undefined">
            {{file.name}}
            <i @click="handlerRemove" class="el-icon-close"/>
          </div>
        </div>
      </div>
    </el-upload>
  </div>
</template>

<script>
  import {uploadFile} from "../../api/business/file/file";

  export default {
    name: "fileUpload",
    props: {
      file: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    data() {
      return {
        fileCount: 0,
        limit: 1,
        fileList: [],
      }
    },
    watch: {
      file() {
        this.$emit("update:file", this.file);
      }
    },
    methods: {
      handlerRemove() {
        this.file = {};
        this.fileList.splice(0, this.fileList.length);
        this.$forceUpdate();
        this.$emit("update:file", {});
        this.$emit("remove");
      },
      handlerUpload(request) {
        let formData = new FormData();
        formData.append("file", request.file);
        uploadFile(formData).then(res => {
          this.file = res.data.data;
          this.$set(this.file, "name",  this.file.name);
          return res;
        }).then((res) => {
          this.$emit("upload", res.data.data);
          this.$forceUpdate();
        })
      },
    }
  }
</script>

<style scoped>

</style>
