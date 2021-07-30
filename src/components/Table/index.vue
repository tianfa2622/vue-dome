<template>
  <div class="table">
    <el-table
      v-loading="iSloading"
      :data="tableDatas"
      style="width: 100%"
      :header-cell-style="{
        color: '#fff',
        textAlign: 'center',
        background: '#040a46',
        borderBottom: '1px solid #040a46'
      }"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :row-style="{}"
      :cell-style="{
        color: '#fff',
        textAlign: 'center',
        background: 'rgb(5,33,73)'
      }"
      @cell-click="cellClick"
    >
      <el-table-column v-for="(item, index) in tableHead" :key="index" show-overflow-tooltip :prop="item.prop" :formatter="item.formatter" :label="item.label"> </el-table-column>
      <el-table-column v-if="operationShow" label="操作" width="200">
        <template slot-scope="scope">
          <div v-for="(item, index) in tableSettings" :key="index">
            <el-button v-if="item.type === 'modify'" size="mini" type="text" @click="handleModify(scope.row)">{{ item.name }}</el-button>
            <el-button v-if="item.type === 'delete'" size="mini" type="text" @click="handleDelete(scope.row, scope.$index)">{{ item.name }}</el-button>
            <el-button v-if="item.type === 'detailed'" size="mini" type="text" @click="handleDetailed(scope.row)">{{ item.name }}</el-button>
            <el-button v-if="item.type === 'download'" size="mini" type="text" @click="handleDownload(scope.row)">{{ item.name }}</el-button>
            <el-button v-if="item.type === 'custom'" size="mini" type="text" @click="handleCustom(scope.row)">{{ item.name }}</el-button>
            <template v-if="item.type === 'disable'">
              <el-button v-if="scope.row.state === '1'" size="mini" type="text" @click="handleDisable(scope.row, scope.$idnex)">禁用</el-button>
              <el-button v-if="scope.row.state === '2'" size="mini" type="text" @click="handleEnable(scope.row, scope.$index)">启动</el-button>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="iSpaginationShow" class="block">
      <el-pagination :current-page="PagingBar.current" :page-sizes="[5, 10, 15, 20]" :page-size="PagingBar.size" layout="total, sizes, prev, pager, next, jumper" :total="PagingBar.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['tableHead', 'tableDatas', 'tableSettings', 'operateShow', 'paginationShow', 'pagination', 'iSloading'],
  data: () => ({
    operationShow: true,
    iSpaginationShow: true,
    PagingBar: {
      current: 1,
      size: 10,
      total: 30
    }
  }),
  created() {
    this.isShow()
  },
  mounted() {
    this.isShow()
  },
  methods: {
    isShow() {
      if (this.operateShow !== undefined) {
        this.operationShow = this.operateShow
      }
      if (this.paginationShow === false) {
        this.iSpaginationShow = this.paginationShow
      }
      if (this.pagination !== undefined) {
        this.PagingBar = this.pagination
      }
    },
    handleModify(row) {
      this.$emit('modify', row)
    },
    handleDelete(row, index) {
      this.$emit('del', row, index)
    },
    handleDetailed(row) {
      this.$emit('detailed', row)
    },
    handleDownload(row) {
      this.$emit('download', row)
    },
    handleCustom(row) {
      this.$emit('custom', row)
    },
    handleDisable(row) {
      this.$emit('disable', row)
    },
    handleEnable(row) {
      this.$emit('enable', row)
    },
    handleSizeChange(val) {
      this.$emit('sizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('pageChange', val)
    },
    cellClick(row, column, cell, event) {
      console.log(cell, event)
      this.$emit('cellClick', row, column)
    }
  }
}
</script>
<style lang="scss">
.el-table__row > td {
  border: none !important;
}
.el-table__row td:last-of-type {
  .cell {
    display: flex;
    justify-content: space-around;
  }
}
.el-table::before {
  height: 0px !important;
}

.el-tooltip__popper {
  max-width: 800px;
}
/* 解决饿了么ui 滚动闪烁BOG */
.el-table__footer-wrapper,
.dkcard .el-table {
  /* overflow: auto !important; */
  width: calc(100% - 2px) !important;
}
.el-table__body,
.el-table__footer,
.el-table__header {
  width: calc(100% - 2px) !important;
}
.el-table th.gutter {
  /*解决el-table加了gutter后 边框出现白边*/
  display: table-cell !important;
}
.block {
  margin-top: 0.2rem;
  .el-pagination {
    justify-content: flex-end;
    display: flex;
    position: relative;
    span {
      color: #fff;
    }
    .el-pagination__total {
      position: absolute;
      left: 0;
    }
    .el-pagination__sizes {
      .el-select {
        .el-input {
          input {
            background-color: #052149;
            border: none;
          }
        }
      }
    }
    .el-pagination__jump {
      .el-input {
        input {
          background-color: #052149;
          border: none;
        }
      }
    }
    .btn-prev,
    .btn-next,
    .el-pager .number {
      background-color: #052149;
      color: #fff;
    }
  }
}
</style>
