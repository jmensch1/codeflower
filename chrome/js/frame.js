
// this runs inside the iframe that gets added in main.js

(function($) {

  // request the name of the repo on the page
  chrome.runtime.sendMessage({type: 'request-repo'}, function(repo) {

    // when we get a response, first grab the config file
    var configUrl = chrome.extension.getURL('/config.json');
    $.getJSON(configUrl, function(config) {

      // construct url for the inner iframe
      var url = config.originUrl +
                '?context=chrome' +
                '&owner=' + repo.owner +
                '&name='  + repo.name +
                (repo.branch ? '&branch=' + repo.branch : '');

      // add the inner iframe to the body
      var frame = $(
        '<iframe ' +
          'src="' + url + '" ' +
          'style="width: 100%; height: 100%; border: none;" ' +
          'allowfullscreen>' +
        '</iframe>'
      );
      $('body').append(frame);

      // remove the loading mask when frame loads
      frame.on('load', function() {
        $('.loading-mask').remove()
      });
    });
  });

})(jQuery);
