/**
 * 验证不可输入特殊字符
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkInputString(rule, value, callback) {
  if (value) {
    if (value.match(/^[\u4E00-\u9FA5A-Za-z0-9_]+?$/)) {
      callback()
    } else {
      callback(new Error('不可输入特殊字符'))
    }
  }
}
/**
 * 验证数字可为正负，数值大小，小数位数验证 参数 isNegative(是否可为负数，默认为false)，maxValue(不超过的最大值,默认为10000000)，decimal(小数位数，默认7位)
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkDecimal(rule, value, callback) {
  if (value) {
    value += ''
    var negative = rule.isNegative ? rule.isNegative : false
    var maxValue = rule.maxValue ? rule.maxValue : 10000000
    var minValue = 0
    var decimal = rule.decimal ? rule.decimal : 7
    if (rule.decimal === 0) {
      decimal = 0
    }
    var re = null
    if (negative) {
      minValue = '-' + maxValue
      // eslint-disable-next-line no-eval
      re = eval('/^(\\-)?(0|[1-9][0-9]*)(\\.\\d{0,' + decimal + '})?$/')
    } else {
      // eslint-disable-next-line no-eval
      re = eval('/^(([1-9]{1}\\d*)|(0{1}))(\\.\\d{0,' + decimal + '})?$/')
    }
    if (isNaN(value)) {
      callback(new Error('请输入数字'))
    } else {
      if (value.match(re)) {
        var num = parseFloat(value)
        if (negative) {
          if (num > minValue && num < maxValue) {
            callback()
          } else {
            callback(new Error('超出有效输入范围'))
          }
        } else {
          if (num >= minValue && num < maxValue) {
            callback()
          } else {
            callback(new Error('超出有效输入范围'))
          }
        }
      } else {
        callback(new Error('输入有误'))
      }
    }
  } else {
    callback()
  }
}
/**
 * 验证数字输入范围在0-10000000之间，且小数可7位
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkNumber(rule, value, callback) {
  if (value) {
    value += ''
    if (value.match(/^\d+$/)) {
      var num = parseFloat(value)
      if (num >= 0 && num < 10000000) {
        callback()
      } else {
        callback(new Error('超出有效输入范围'))
      }
    } else {
      callback(new Error('请输入正整数'))
    }
  } else {
    callback()
  }
}
/**
 * 验证经度输入范围在-180-180之间，且小数可7位
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkLon(rule, value, callback) {
  if (value) {
    value += ''
    // /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,7})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
    // eslint-disable-next-line no-useless-escape
    if (value.match(/^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,7})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/)) {
      callback()
    } else {
      callback(new Error('经度为 -180 ~ 180,小数限7位!'))
    }
  } else {
    callback()
  }
}
/**
 * 验证纬度输入范围在-90-90之间，且小数可7位
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkLat(rule, value, callback) {
  if (value) {
    value += ''
    // /^(\-|\+)?([0-8]?\d{1}\.\d{0,7}|90\.0{0,6}|[0-8]?\d{1}|90)$/
    // eslint-disable-next-line no-useless-escape
    if (value.match(/^(\-|\+)?([0-8]?\d{1}\.\d{0,7}|90\.0{0,6}|[0-8]?\d{1}|90)$/)) {
      callback()
    } else {
      callback(new Error('纬度为 -90 ~ 90 ,小数限7位'))
    }
  } else {
    callback()
  }
}
/**
 * 验证输入长度
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkLong(rule, value, callback) {
  if (value) {
    if (value.length < rule.length && value.length >= 0) {
      callback()
    } else {
      callback(new Error('输入不可超过' + rule.length + '个字符'))
    }
  } else {
    callback()
  }
}

/**
 * 验证不能为空
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkNull(rule, value, callback) {
  if (!value) {
    if (value === 0) {
      callback()
    } else {
      callback(new Error(rule.message))
    }
  } else {
    value += ''
    if (value.length > 0) {
      callback()
    } else {
      callback(new Error(rule.message))
    }
  }
}
/**
 * 验证数组
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkArray(rule, value, callback) {
  console.log(value)
  if (value.length > 0) {
    callback()
  } else {
    callback(new Error(rule.message))
  }
}

/**
 * 验证手机号
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validatePhone(rule, value, callback) {
  const reg = /^[1][3-9][0-9]{9}$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value) && value !== '') {
      callback(new Error('请输入正确的11位电话号码'))
    } else {
      callback()
    }
  }
}

/**
 * 验证邮编
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validateZipCode(rule, value, callback) {
  const reg = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value) && value !== '') {
      callback(new Error('请输入正确邮编'))
    } else {
      callback()
    }
  }
}

/**
 * 验证是否固话
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validateTelphone(rule, value, callback) {
  const reg = /0\d{2,3}-\d{7,8}/
  if (value === '' || value === undefined || value === null) {
    callback()
  } else {
    if (!reg.test(value) && value !== '') {
      callback(new Error('请输入正确的固定电话，格式为XXXX-XXXXXXX'))
    } else {
      callback()
    }
  }
}

/**
 * 验证是否手机或者固话
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validatePhoneTwo(rule, value, callback) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value) && value !== '') {
      callback(new Error('请输入正确的电话号码或者固话号码'))
    } else {
      callback()
    }
  }
}

/**
 * 验证是否身份证号码
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validateIdNo(rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value) && value !== '') {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      callback()
    }
  }
}

/**
 * 验证是否邮箱号码
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validateEMail(rule, value, callback) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的邮箱'))
    } else {
      callback()
    }
  }
}

/**
 * 验证是否合法url
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validateURL(url) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(url)
}

/**
 * 验证是否包含英文数字以及下划线
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function isPassword(rule, value, callback) {
  const reg = /^[_a-zA-Z0-9]+$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('仅由英文字母，数字以及下划线组成'))
    } else {
      callback()
    }
  }
}

/**
 * 自动检验数值的范围
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkMax20000(rule, value, callback) {
  if (value === '' || value === undefined || value == null) {
    callback()
  } else if (!Number(value)) {
    callback(new Error('请输入[1,20000]之间的数字'))
  } else if (value < 1 || value > 20000) {
    callback(new Error('请输入[1,20000]之间的数字'))
  } else {
    callback()
  }
}
/**
 * 验证数字输入框最大数值
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkMaxVal(rule, value, callback) {
  if (value < 0 || value > 9999) {
    callback(new Error('请输入[0,9999]之间的数字'))
  } else {
    callback()
  }
}

/**
 * 验证是否1-99之间
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function isOneToNinetyNine(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'))
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'))
    } else {
      const re = /^[1-9][0-9]{0,1}$/
      const rsCheck = re.test(value)
      if (!rsCheck) {
        callback(new Error('请输入正整数，值为【1,99】'))
      } else {
        callback()
      }
    }
  }, 0)
}

/**
 * 验证是否整数,非必填
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function isIntegerNotMust(rule, value, callback) {
  if (!value) {
    callback()
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'))
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/
      const rsCheck = re.test(value)
      if (!rsCheck) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }
  }, 1000)
}
/**
 * 验证是否整数
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function isInteger(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'))
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'))
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/
      const rsCheck = re.test(value)
      if (!rsCheck) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }
  }, 0)
}

/**
 * 密码校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const validatePsdReg = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  }
  if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/.test(value)) {
    callback(new Error('请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种'))
  } else {
    callback()
  }
}

/**
 * 中文校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const validateContacts = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入中文'))
  }
  if (!/^[\u0391-\uFFE5A-Za-z]+$/.test(value)) {
    callback(new Error('不可输入特殊字符'))
  } else {
    callback()
  }
}

/**
 *  账号校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const validateCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入账号'))
  }
  if (!/^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/.test(value)) {
    callback(new Error('账号必须为6-20位字母和数字组合'))
  } else {
    callback()
  }
}

/**
 *  纯数字校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const validateNumber = (rule, value, callback) => {
  const numberReg = /^\d+$|^\d+[.]?\d+$/
  if (value !== '') {
    if (!numberReg.test(value)) {
      callback(new Error('请输入数字'))
    } else {
      callback()
    }
  } else {
    callback(new Error('请输入值'))
  }
}

/**
 *  最多一位小数
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const onePoint = (rule, value, callback) => {
  if (!/^[0-9]+([.]{1}[0-9]{1})?$/.test(value)) {
    callback(new Error('最多一位小数！！！'))
  } else {
    callback()
  }
}

// /**
//  * 验证是否合法Ip地址
//  * @param {*} rule
//  * @param {*} value
//  * @param {*} callback
//  */
// export function validateIP(rule, value,callback) {
//   if(value==''||value==undefined||value==null){
//     callback();
//   }else {
//     const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\
// ![](https://user-gold-cdn.xitu.io/2019/11/22/16e9182103044230?w=900&h=500&f=gif&s=662884).(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
//     if ((!reg.test(value)) && value != '') {
//       callback(new Error('请输入正确的IP地址'));
//     } else {
//       callback();
//     }
//   }
// }
