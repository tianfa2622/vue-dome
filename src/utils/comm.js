// 获取当前日期生成随机数的方法
export const getProjectNum = () => {
  const projectTime = new Date() // 当前中国标准时间
  const Year = projectTime.getFullYear() // 获取当前年份 支持IE和火狐浏览器.
  const Month = projectTime.getMonth() + 1 // 获取中国区月份
  const Day = projectTime.getDate() // 获取几号
  const hh = projectTime.getHours() // 时
  const mm = projectTime.getMinutes() // 分
  const ss = projectTime.getSeconds()
  let CurrentDate = Year
  if (Month >= 10) {
    // 判断月份和几号是否大于10或者小于10
    CurrentDate += Month
  } else {
    CurrentDate += '0' + Month
  }
  if (Day >= 10) {
    CurrentDate += Day
  } else {
    CurrentDate += '0' + Day
  }
  if (hh >= 10) {
    CurrentDate += hh
  } else {
    CurrentDate += '0' + hh
  }
  if (mm >= 10) {
    CurrentDate += mm
  } else {
    CurrentDate += '0' + mm
  }
  if (ss >= 10) {
    CurrentDate += ss
  } else {
    CurrentDate += '0' + ss
  }
  return CurrentDate + Math.floor(Math.random() * 10000)
}
