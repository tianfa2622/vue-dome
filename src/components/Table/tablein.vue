<template>
  <div>
    <el-table :data="data.tableList" border :stripe="data.stripe" style="width: 100%" :resizable="false" max-height="920" :row-class-name="tableRowClassName">
      <!-- <el-table-column
        type="selection"
        align="center"
        width="55"
      ></el-table-column> -->
      <template v-for="item in data.tableHeader">
        <el-table-column v-if="item.type === 'slot'" :key="item.name" :prop="item.prop" :label="item.label" :min-width="item.width" align="center" border>
          <template slot-scope="{ row }">
            <slot :name="item.slotName" :data="row" />
          </template>
        </el-table-column>
        <el-table-column v-else :key="item.name" :prop="item.prop" :label="item.label" align="center" :min-width="item.width" />
      </template>
    </el-table>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['data', 'tableRowClassName'],
  data() {
    return {}
  },
  mounted() {}
}
</script>
