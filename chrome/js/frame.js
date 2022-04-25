// this runs inside the iframe that gets added in main.js

function sendMessage(message) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, resolve)
  })
}

(async ($) => {
  await $.ready()

  const { repo, theme } = await sendMessage({ type: 'ready' })

  // set body background color, then tell the main script to show the frame
  // this little dance avoids a flash of white background
  $('body').css('background-color', theme.palette.background.default)
  await sendMessage({ type: 'set' })

  const configUrl = chrome.runtime.getURL('/config.json')
  const { originUrl } = await $.getJSON(configUrl)

  const params = $.param({
    context: 'chrome',
    owner: repo.owner,
    name: repo.name,
    branch: repo.branch || undefined,
    theme: JSON.stringify(theme),
  })

  const frame = $('<iframe>')
    .attr('src', `${originUrl}?${params}`)
    .attr('allowfullscreen', true)
    .css({
      width: '100%',
      height: '100%',
      border: 'none',
    })

  $('body').append(frame)

  // remove the loading mask when frame loads
  // frame.on('load', () => {
  //   $('.loading-mask').remove()
  // })
})(jQuery)
