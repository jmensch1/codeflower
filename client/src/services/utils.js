export const delay = async (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

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

// generators a multi-class-selector string
// e.g. multiClassSelector('.test-', [0, 1, 2])
// outputs '.test-0,.test-1,.test-2'
export const multiClassSelector = (base, spread) => {
  return spread.map((el) => `${base}${el}`).join(',')
}
