<template>
  <div>
    <el-upload
      :http-request="handlerUpload"
      :on-remove="handlerRemove"
      :file-list="fileList"
      :limit="limit"
      list-type="picture-card">
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
  import {uploadFile} from "../../api/business/file/file";

  export default {
    name: "fileImageUpload",
    props: {
      fileList: {
        type: Object,
        default() {
          return []
        }
      },
      limit: {
        type: Number
      }
    },
    data() {
      return {
        fileCount: 0,
      }
    },
    watch: {
      fileList() {
        this.$emit("update:fileList", this.fileList);
      }
    },
    methods: {
      handlerRemove(removeFile) {
        for (let fileListKey in this.fileList) {
          let file = this.fileList[fileListKey];
          if (removeFile.id === file.id) {
            this.fileList.splice(fileListKey, 1);
            this.fileCount--;
            this.$emit("remove", removeFile);
            return;
          }
        }
      },
      handlerUpload(request) {
        let formData = new FormData();
        formData.append("file", request.file);
        uploadFile(formData).then(res => {
          this.fileList[this.fileCount++] = res.data.data;
          this.$emit("update:fileList", this.fileList);
          return res;
        }).then((res) => {
          this.$emit("upload", res.data.data);
        })
      },
    }
  }
</script>

<style scoped>

</style>
