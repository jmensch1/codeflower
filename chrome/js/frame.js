
// this runs inside the iframe that gets added in main.js

(function($) {

  // request the name of the repo on the page
  chrome.runtime.sendMessage({type: 'request-repo'}, (repo) => {

    console.log('palette:', repo.palette)

    // set body background color
    $('body').css('background-color', repo.palette.bgColor)

    // grab the config file
    const configUrl = chrome.extension.getURL('/config.json')
    $.getJSON(configUrl, ({ originUrl }) => {

      // construct url for the inner iframe
      const srcUrl = [
        originUrl,
        '?context=chrome',
        `&owner=${repo.owner}`,
        `&name=${repo.name}`,
        (repo.branch ? `&branch=${repo.branch}` : ''),
      ].join('')

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
      frame.on('load', () => {
        $('.loading-mask').remove()
      })
    })
  })

})(jQuery)
