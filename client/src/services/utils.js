
export const queryParams = () => {
  const pairs = window.location.search.replace(/^\?/, '').split('&')
  return pairs.reduce((query, pair) => {
    const [key, val] = pair.split('=')
    query[decodeURIComponent(key)] = decodeURIComponent(val || '')
    return query
  }, {})
}

export const delay = async (time) => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
