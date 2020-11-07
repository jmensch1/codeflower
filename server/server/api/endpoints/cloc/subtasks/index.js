
module.exports = {
  processRequestParams:     require('./01_processRequestParams'),
  checkRepoClonability:     require('./02_checkRepoClonability'),
  cloneRepoInFilesystem:    require('./03_cloneRepoInFilesystem'),
  getBranchNameIfNeeded:    require('./04_getBranchNameIfNeeded'),
  convertRepoToClocFile:    require('./05_convertRepoToClocFile'),
  convertClocFileToJson:    require('./06_convertClocFileToJson'),
  sendJsonToClient:         require('./07_sendJsonToClient'),
  handleClocErrors:         require('./08_handleClocErrors'),
  deleteRepoFromFilesystem: require('./09_deleteRepoFromFilesystem')
};