// relay messages and responses from frame script to main script

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const type = request?.type

  if (!['ready', 'set'].includes(type))
    return false

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type }, sendResponse)
  })

  return true
})
