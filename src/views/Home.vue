<template>
  <div class="home">
    首页
    <el-button type="primary" size="default">hhhhhhh</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      res: {
        msg: 'ok',
        data: [
          {
            sontDatas: [
              {
                datas: [{ fs: 12 }, { fs: 11 }]
              },
              {
                datas: [{ fs: 12 }, { fs: 11 }]
              }
            ]
          },
          {
            sontDatas: [
              {
                datas: [{ fs: 12 }, { fs: 11 }]
              },
              {
                datas: [{ fs: 12 }, { fs: 11 }]
              }
            ]
          },
          {
            name: '变桨',
            dataType: 0,
            fc: 'xnfyd',
            fj: 'w001',
            datas: [],
            sonDatas: [
              {
                name: '变桨-单机信息',
                dataType: 0,
                fc: '',
                fj: '',
                datas: [
                  {
                    name: '变桨轴箱2电容温度',
                    id: 313,
                    bzcdId: '184',
                    cdbh: 'AX',
                    value: '33.80',
                    unit: ''
                  },
                  {
                    name: '变桨轴箱2箱柜温度',
                    id: 366,
                    bzcdId: '214',
                    cdbh: 'AU',
                    value: '33.80',
                    unit: ''
                  },
                  {
                    name: '变桨轴箱3电容温度',
                    id: 395,
                    bzcdId: '185',
                    cdbh: 'B0214',
                    value: '0.00',
                    unit: ''
                  },
                  {
                    name: '变桨轴箱3电容温度',
                    id: 395,
                    bzcdId: '185',
                    cdbh: 'B0214',
                    value: '0.00',
                    unit: ''
                  },
                  {
                    name: '变桨轴箱1电容电压',
                    id: 394,
                    bzcdId: '186',
                    cdbh: 'AZ',
                    value: '74.55',
                    unit: ''
                  },
                  {
                    name: '变桨轴箱1电容电压',
                    id: 394,
                    bzcdId: '186',
                    cdbh: 'AZ',
                    value: '74.55',
                    unit: ''
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    const data = { ...this.res.data[2] }
    const datas = data.sontDatas
    // console.log(this.res.data[2])
    console.log('datas', datas)
    console.log('data', data)
  }
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
