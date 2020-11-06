
export const queryParams = () => {
  const pairs = window.location.search.replace(/^\?/, '').split('&')
  return pairs.reduce((query, pair) => {
    const [key, val] = pair.split('=')
    query[decodeURIComponent(key)] = decodeURIComponent(val || '')
    return query
  }, {})
}
