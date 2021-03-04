// show warning if number of nodes in repo is greater than this
export const MAX_NODES = 2000

export const api = {
  HTTP_URL: process.env.REACT_APP_API_URL_HTTP,
  WS_URL: process.env.REACT_APP_API_URL_WS,
}

export const cloudinary = {
  CLOUD_NAME: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  UPLOAD_PRESET: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  TAG: process.env.REACT_APP_CLOUDINARY_TAG,
}

export const about = {
  WEB_URL: window.location.origin,
  CHROME_URL: 'https://chrome.google.com/webstore/detail/codeflower/mnlengnbfpfgcfdgfpkjekoaeophmmeh',
  FIREFOX_URL: 'https://addons.mozilla.org/en-US/firefox/addon/codeflower/',
  GITHUB_URL: 'https://github.com/jmensch1/codeflower',
  CONTRIBUTORS_URL: 'https://github.com/jmensch1/codeflower/blob/dev/.github/CONTRIBUTING.md',
  BUG_REPORT_URL: 'https://github.com/jmensch1/codeflower/issues/new?assignees=&labels=&template=bug_report.md&title=',
  FEATURE_REQUEST_URL: 'https://github.com/jmensch1/codeflower/issues/new?assignees=&labels=&template=feature_request.md&title=',
}
