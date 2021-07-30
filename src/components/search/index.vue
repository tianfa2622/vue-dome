<template>
  <el-form ref="form" :model="form" :inline="inline" :disabled="disabled" :label-width="searchLabelWidth == undefined ? 'auto' : searchLabelWidth" :rules="rules">
    <el-form-item v-for="(item, index) in searchSettings" :key="index" :label="item.label != '' ? item.label : ''" :prop="item.name">
      <el-input v-if="item.type === 'input'" v-model="form[item.name]" clearable :placeholder="item.placeholder" :read-only="readOnly"></el-input>
      <el-input v-if="item.type === 'number'" v-model.number="form[item.name]" clearable :placeholder="item.placeholder" :min="0" type="number" onkeyup="value=value.replace(/[^\d]/g,'')" :read-only="readOnly"></el-input>
      <el-select v-if="item.type === 'select'" v-model="form[item.name]" clearable :placeholder="item.placeholder" @change="item.selectChanged ? selectChanged(form[item.name], item.options) : ''">
        <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value"></el-option>
      </el-select>
      <el-radio-group v-if="item.type === 'radio'" v-model="form[item.name]">
        <el-radio v-for="op in item.options" :key="op.value" :label="op.value">{{ op.label }}</el-radio>
      </el-radio-group>
      <el-date-picker v-else-if="item.type === 'datetime'" v-model="form[item.name]" :clearable="disabled" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间"> </el-date-picker>
      <el-cascader v-else-if="item.type === 'cascader'" v-model="form[item.name]" :placeholder="item.placeholder" :clearable="disabled" :props="item.props" :read-only="readOnly" :options="item.options" :show-all-levels="false"> </el-cascader>
      <el-input v-if="item.type === 'textarea'" v-model="form[item.name]" type="textarea" :clearable="disabled" :placeholder="item.placeholder"></el-input>
      <el-date-picker v-if="item.type === 'data'" v-model="form[item.name]" value-format="yyyy-MM-dd" type="date" :clearable="disabled" placeholder="选择日期"> </el-date-picker>
      <el-date-picker v-if="item.type === 'datas'" v-model="form[item.name]" type="daterange" :clearable="disabled" range-separator="至" start-placeholder="开始日期" :value-format="item.valueFormat ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss'" end-placeholder="结束日期"> </el-date-picker>
      <span v-if="item.type === 'span'" class="formSpan">{{ form[item.name] }}</span>
    </el-form-item>
    <div v-for="item in searchBtn" :key="item.name" class="btn">
      <el-button v-if="item.type === 'search'" type="primary" @click="search">{{ item.name }}</el-button>
      <el-button v-if="item.type === 'reset'" type="primary" @click="reset">{{ item.name }}</el-button>
      <el-button v-if="item.type === 'add'" type="primary" @click="add">{{ item.name }}</el-button>
      <el-button v-if="item.type === 'derived'" type="primary" @click="derived">{{ item.name }}</el-button>
      <el-upload v-if="item.type === 'file'" ref="upload" action="" :on-change="handleChange" :on-remove="handleRemove" :show-file-list="item.isList" :on-exceed="handleExceed" :limit="item.limit" :accept="item.accept" :auto-upload="false">
        <el-button type="primary">{{ item.name }}</el-button>
      </el-upload>
    </div>
  </el-form>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['searchSettings', 'searchBtn', 'searchLabelWidth', 'readOnly', 'formData', 'rules', 'disabled', 'inline'],
  data: () => ({
    form: {}
  }),
  created() {
    this.iSformData()
  },
  mounted() {},
  methods: {
    add() {
      this.$emit('add')
    },
    search() {
      this.$emit('search')
    },
    reset() {
      this.$emit('reset')
    },
    derived() {
      this.$emit('derived')
    },
    selectChanged(code, data) {
      this.$emit('selectChanged', code, data)
    },
    // 上传文件时处理方法
    handleChange(file, fileList) {
      this.$emit('handleChange', file, fileList)
    },
    // 移除文件的操作方法
    handleRemove(file, fileList) {
      this.$emit('handleRemove', file, fileList)
    },
    // 超出最大上传文件数量时的处理方法
    handleExceed() {
      // this.$emit('handleExceed')
      this.$message({
        type: 'warning',
        message: '超出最大上传文件数量的限制！'
      })
    },
    iSformData() {
      if (this.formData !== undefined) {
        this.form = this.formData
      }
    }
  }
}
</script>
<style lang="scss">
// .el-form {
//   display: flex;
//   width: 100%;
//   .el-form-item {
//     margin-bottom: 0;
//     margin-right: 0.2rem;
//     width: 20%;
//     .el-form-item__label-wrap {
//       .el-form-item__label {
//         color: #fff;
//       }
//     }
//     .el-form-item__content {
//       width: 100%;
//       input::-webkit-outer-spin-button,
//       input::-webkit-inner-spin-button {
//         -webkit-appearance: none;
//       }
//       input[type='number'] {
//         -moz-appearance: textfield;
//       }
//       .formSpan {
//         font-size: 14px;
//         color: #fff;
//       }
//       .el-input {
//         width: 100%;
//         input {
//           background-color: rgba(5, 60, 67, 1);
//           color: #00f3ff;
//           // border: none;
//         }
//       }
//       .el-select {
//         width: 100%;
//         .el-input {
//           width: 100%;
//           input {
//             background-color: rgba(5, 60, 67, 1);
//             color: #00f3ff;
//             // border: none;
//           }
//         }
//       }
//       .el-textarea {
//         width: 100%;
//         textarea {
//           width: 100%;
//           background-color: rgba(5, 60, 67, 1);
//           color: #00f3ff;
//           // border: none;
//           // color: #fff;
//         }
//         textarea::placeholder {
//           color: #fff;
//         }
//       }
//       .el-date-editor {
//         width: 100%;
//         background-color: rgba(5, 60, 67, 1);
//         // color: #00f3ff;
//         // border: none;
//         input {
//           background-color: rgba(5, 60, 67, 1);
//           color: #00f3ff;
//           // border: none;
//         }
//         .el-input__icon,
//         .el-range-separator {
//           color: #fff;
//         }
//       }
//     }
//   }
//   .btn {
//     margin-right: 0.2rem;
//     button {
//       width: 100px;
//       background-color: rgba(5, 60, 67, 1);
//       border-color: rgba(121, 121, 121, 1);
//       color: #00f3ff;
//     }
//   }
// }
</style>
