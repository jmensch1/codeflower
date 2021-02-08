import setWith from 'lodash/setWith'
import clone from 'lodash/clone'
import get from 'lodash/get'
import has from 'lodash/has'

// splits an array into two arrays based on condition
// optionally transforms each element in each of the two arrays
export const partition = (
  arr,
  condition = (el) => true,
  transform = (el) => el
) => {
  const keep = []
  const reject = []
  arr.forEach((el) => {
    if (condition(el)) keep.push(transform(el))
    else reject.push(transform(el))
  })
  return [keep, reject]
}

// object accessors methods
// setPath returns the new object without mutating the original
// https://github.com/lodash/lodash/issues/1696
export const hasPath = has
export const getPath = get
export const setPath = (obj, path, val) => setWith(clone(obj), path, val, clone)

export function createUpdaters(paths, updateFunc, dispatch) {
  return paths.reduce((updaters, path) => {
    updaters[path] = (value) => dispatch(updateFunc(path, value))
    return updaters
  }, {})
}

export function getPaths(obj, paths) {
  return paths.reduce((out, path) => {
    out[path] = getPath(obj, path)
    return out
  }, {})
}

export function getPathsWithDefault(obj, paths, defaultObj) {
  return paths.reduce((out, path) => {
    out[path] = hasPath(obj, path)
      ? getPath(obj, path)
      : getPath(defaultObj, path)
    return out
  }, {})
}
