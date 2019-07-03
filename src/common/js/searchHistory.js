export function saveToLocal(item) {
  let search = window.localStorage.__search__

  // 初始化
  if (!search) {
    search = {}
    search['history'] = []
  } else {
    search = JSON.parse(search)
  }

  search['history'].unshift(item)
  window.localStorage.__search__ = JSON.stringify(search)
}

export function loadFromLocal() {
  let search = window.localStorage.__search__
  if (!search) {
    search = {}
    search['history'] = []
  } else {
    search = JSON.parse(search)
  }
  return search['history']
}
export function clearHistory() {
  let search = window.localStorage.__search__
  if (!search) {
    search = {}
  } else {
    search = JSON.parse(search)
  }
  search['history'] = []
  window.localStorage.__search__ = JSON.stringify(search)
}
