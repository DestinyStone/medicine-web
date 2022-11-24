<template>
  <div>
    <basic-container>
      <avue-crud :option="option"
                 :table-loading="loading"
                 :data="data"
                 ref="crud"
                 :page.sync="page"
                 v-model="form"
                 @row-update="handlerUpdate"
                 @row-save="handlerSubmit"
                 :permission="permissionList"
                 :before-open="beforeOpen"
                 :before-close="beforeClose"
                 @search-change="searchChange"
                 @search-reset="searchReset"
                 @selection-change="selectionChange"
                 @current-change="currentChange"
                 @size-change="sizeChange"
                 @refresh-change="refreshChange"
                 @on-load="onLoad"
      >
        <template slot="menuLeft">
          <el-button type="primary" size="small" @click="handlerClickSubmit">
            新 增
          </el-button>
          <el-button type="warning" size="small"  @click="handlerClickBatchDelete">
            删 除
          </el-button>
          <el-button
            size="small"
            type="success"
            @click="handlerClickImport"
            icon="el-icon-upload"
          >
            {{uploadButtonText}}
          </el-button>
          <el-button
            size="small"
            type="info"
            @click="handlerClickDownload"
            icon="el-icon-download"
          >
            导入模板下载
          </el-button>
        </template>
        <template slot-scope="scope" slot="menu">
          <div style="display: flex; justify-content: space-around;">
            <el-link :underline="false" type="primary" @click="handlerClickDetail(scope.row)">查看详情</el-link>
            <el-link :underline="false" type="primary" @click="handlerClickUpdate(scope.row, scope.index)">修改</el-link>
            <el-link :underline="false" type="warning" @click="handlerDelete(scope.row)">删除</el-link>
          </div>
        </template>
      </avue-crud>
    </basic-container>
    <file-upload-dialog @handler="handlerUploadFile" :show.sync="showUpload" v-if="showUpload"/>
    <medicine-detail :show.sync="showDetail" v-if="showDetail" :id="selectId"/>
  </div>
</template>

<script>
  import Medicine from "../../../api/business/medicine/medicine";
  import FileUploadDialog from "../../../components/file/file-upload-dialog";
  import MedicineDetail from "../medicine/component/medicine-detail";
  import func from "../../../util/func";

  export default {
    name: "medicine",
    components: {MedicineDetail, FileUploadDialog},
    props: {
      // 0 古医数据集 1 名医数据集
      type: {
        type: Number,
      },
      uploadButtonText: "",
    },
    data() {
      return {
        showDetail: false,
        showUpload: false,
        showPart: false,
        selectId: "",
        showSubmit: false,
        form: {},
        selectionList: [],
        query: {},
        loading: true,
        orgupNo: 0,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0,
        },
        option: {
          rowKey: "id",
          tip: false,
          simplePage: true,
          searchShow: true,
          searchMenuSpan: 6,
          tree: true,
          border: true,
          menu: true,
          index: true,
          selection: true,
          viewBtn: true,
          menuWidth: 200,
          menuXsWidth: 200,
          dialogClickModal: false,
          emptyBtnText: "重置",
          indexWidth: 60,
          emptyBtnIcon: "el-icon-refresh",
          indexLabel: "序号",
          column: [
            {
              label: "名称",
              prop: "name",
              search: true,
              span: 24,
              rules: [
                {required: true, message: "请输入名称", trigger: "blur"}
              ],
              searchPlaceholder: "名称/症状"
            },
            {
              label: "症状",
              prop: "putUp",
              span: 24,
              rules: [
                {required: true, message: "请输入症状", trigger: "blur"}
              ]
            },
            {
              label: "药方",
              prop: "solve",
              span: 24,
              rules: [
                {required: true, message: "请输入药方", trigger: "blur"}
              ],
              overHidden:false
            },
            {
              label: "注解",
              prop: "remark",
              type: "textarea",
              span: 24,
              overHidden:true,
              rules: [
                {required: true, message: "请输入注解", trigger: "blur"}
              ]

            },
            {
              label: "更新时间",
              prop: "updateTime",
              addDisplay: false,
              editDisplay: false,
            },
          ],
        },
        data: [],
      };
    },
    computed: {
      // ...mapGetters(["permission"]),
      // permissionList() {
      //   return {
      //     addBtn: this.vaildData(this.permission.org_add, false),
      //     viewBtn: this.vaildData(this.permission.org_view, false),
      //     delBtn: this.vaildData(this.permission.org_delete, false),
      //     editBtn: this.vaildData(this.permission.org_edit, false),
      //   };
      // },
      permissionList() {
        return {
          addBtn: false,
          viewBtn: false,
          delBtn: false,
          editBtn: false,
        };
      },
    },
    methods: {
      handlerClickDownload() {
        Medicine.download(this.type).then(res => {
          func.downLoadFile(res);
        })

      },
      handlerClickDetail(row) {
        this.selectId = row.id;
        this.showDetail = true;
      },
      handlerClickBatchDelete() {
        if (this.selectionList.length === 0) {
          this.$message({type: "warning", message: "请至少选择一条数据"});
          return;
        }
        this.$confirm(`是否确定删除?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          return Medicine.delete(this.selectionList.map(item => item.id).join(","));
        }).then(() => {
          this.$message({type: "success", message: "删除成功"});
          this.onLoad(this.page);
        })
      },
      handlerUploadFile({file, call}) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("type", this.type);
        Medicine.upload(formData).then(() => {
          this.$message({type: "success", message: "导入成功"});
          this.showUpload = false;
          call();
          this.onLoad(this.page);
        })
      },
      handlerClickImport() {
        this.showUpload = true;
      },
      handlerUpdate(row, index, done, loading) {
        Medicine.update(row.id, row).then(() => {
          this.$message({type: "success", message: "更新成功"});
          this.onLoad(this.page);
          done();
        })
      },
      handlerClickUpdate(row, index) {
        this.$refs["crud"].rowEdit(row, index);
      },
      handlerDelete(row) {
        this.$confirm(`是否确定删除【${row.name}】?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          return Medicine.delete(row.id);
        }).then(() => {
          this.$message({type: "success", message: "删除成功"});
          this.onLoad(this.page);
        })
      },
      handlerSubmit(row,done, loading) {
        row.type = this.type;
        Medicine.save(row).then(() => {
          this.$message({type: "success", message: "新增成功"});
          this.onLoad(this.page);
          done();
        })
      },
      handlerClickSubmit() {
        this.$refs["crud"].rowAdd();
      },
      searchReset() {
        this.query = {};
        this.orgupNo = 0;
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.orgupNo = "";
        this.page.currentPage = 1;
        this.onLoad(this.page, params);
        done();
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      beforeOpen(done, type) {
        done();
      },
      beforeClose(done) {
        done();
      },
      currentChange(currentPage) {
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        this.query.type = this.type;
        Medicine.page(Object.assign(params, this.query), this.page.currentPage, this.page.pageSize).then(
          (res) => {
            let data = res.data.data;
            this.data = data.records;
            this.page.total = data.total;

            this.loading = false;
            this.selectionClear();
          }
        );
      },
    },
  };
</script>

<style>

</style>
