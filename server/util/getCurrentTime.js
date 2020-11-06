
function getCurrentTime() {
  let date = new Date(),
      d = date.toDateString(),
      t = date.toLocaleTimeString();
  return `${d} ${t}`;
}

module.exports = getCurrentTime;