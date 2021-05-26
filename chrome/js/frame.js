
// this runs inside the iframe that gets added in main.js

(function($) {

  // request the name of the repo on the page
  chrome.runtime.sendMessage({type: 'request-repo'}, ({ repo, theme }) => {

    // set body background color to avoid white flash
    $('body').css('background-color', theme.palette.background.default)

    // grab the config file
    const configUrl = chrome.extension.getURL('/config.json')
    $.getJSON(configUrl, ({ originUrl }) => {

      const params = $.param({
        context: 'chrome',
        owner: repo.owner,
        name: repo.name,
        branch: repo.branch || undefined,
        theme: JSON.stringify(theme),
      })

      const srcUrl = `${originUrl}?${params}`

      // add the inner iframe to the body
      const frame = $('<iframe>')
        .attr('src', srcUrl)
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
    })
  })

})(jQuery)
