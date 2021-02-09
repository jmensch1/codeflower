export const delay = async (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export function noop() {
  return null
}

export function identity(x) {
  return x
}

export function toFixed0(x) {
  return x.toFixed(0)
}

export function toFixed2(x) {
  return x.toFixed(2)
}

// generates a multi-class-selector string
// e.g. multiClassSelector('.test-', [0, 1, 2])
// outputs '.test-0,.test-1,.test-2'
export const multiClassSelector = (base, spread) => {
  return spread.map((el) => `${base}${el}`).join(',')
}
