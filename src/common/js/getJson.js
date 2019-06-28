/* eslint-disable no-tabs */
export function loadFromUrl() {
  let url = window.location.hash
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g

  // 					? channel= 头条  全局
  let arr = url.match(reg)

  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substr(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])

      obj[key] = val
    })
  }
  return obj
}
