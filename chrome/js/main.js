
/*
  This script runs whenever the user navigates to github.com.
  It adds a Codeflower tab to github's navigation bar. When the
  tab is clicked, the script adds an iframe to the page, which
  runs a script that creates another iframe within the outer iframe.
  That inner iframe loads content from codeflower.la.

  We get around chrome's content security policy regarding iframes
  by creating an iframe whose src is within the extension. Inside that
  iframe you can add another iframe whose src is a foreign domain.
  https://stackoverflow.com/questions/24641592/injecting-iframe-into-page-with-restrictive-content-security-policy
*/

(function($) {

  const theme = {
    palette: {
      type: 'dark',
      background: {
        default: $('body').css('background-color'),
        paper: $('header').css('background-color'),
      },
      divider: $('.color-border-secondary').css('border-color'),
    }
  }

  //////////////// FUNCTIONS /////////////////

  // determine whether this is a page when we should run the code
  function extensionActive() {
    return !!($('.js-repo-nav')[0])
  }

  // determine what repo/branch is on the page
  function getRepo() {
    const url = window.location.pathname

    const ownerAndName = url.match(/\/([^\/]*)\/([^\/]*)/)
    const branch = url.match(/\/tree\/([^\/]*)$/)

    return {
      owner: ownerAndName[1],
      name:  ownerAndName[2],
      branch: branch && branch[1]
    }
  }

  // add buttons to both the nav bar and the nav dropdown
  function addButtons() {
    // halt if already added to page
    if ($('.codeflower-init').length) return

    const octicon = (
      '<svg height="16" class="octicon octicon-telescope UnderlineNav-octicon d-none d-sm-inline" class_names="UnderlineNav-octicon" display="none inline" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">' +
        '<path fill-rule="evenodd" d="M8 9l3 6h-1l-2-4v5H7v-6l-2 5H4l2-5 2-1zM7 0H6v1h1V0zM5 3H4v1h1V3zM2 1H1v1h1V1zM.63 9a.52.52 0 0 0-.16.67l.55.92c.13.23.41.31.64.2l1.39-.66-1.16-2-1.27.86.01.01zm7.89-5.39l-5.8 3.95L3.95 9.7l6.33-3.03-1.77-3.06h.01zm4.22 1.28l-1.47-2.52a.51.51 0 0 0-.72-.17l-1.2.83 1.84 3.2 1.33-.64c.27-.13.36-.44.22-.7z"></path>' +
      '</svg>'
    )

    const navButton = $(
      '<li data-view-component="true" class="d-flex">' +
        '<a ' +
          'class="codeflower-init UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item" ' +
          'data-tab-item="codeflower-tab" ' +
          'href="#">' +
          octicon +
          '<span data-content="Codeflower">' +
            'Codeflower' +
          '</span>' +
        '</a>' +
      '</li>'
    )

    const dropdownButton = $(
      '<li data-menu-item="codeflower-tab">' +
        '<a role="menuitem" class="codeflower-init js-selected-navigation-item dropdown-item" href="#">' +
          'Codeflower' +
        '</a>' +
      '</li>'
    )

    // add nav button to nav
    const nav = $('.js-repo-nav ul.UnderlineNav-body')
    nav.append(navButton)

    // add dropdown button to dropdown
    const dropdown = $('.js-repo-nav .dropdown-menu ul')
    dropdown.append(dropdownButton)

    // set visibility of navButton based on visibility of overflow menu
    const overflow = $('.js-responsive-underlinenav-overflow')
    const setNavButtonVisibility = () => {
      const vis = overflow.css('visibility') === 'visible'
        ? 'hidden'
        : 'visible'
      navButton.css('visibility', vis)
    }
    setNavButtonVisibility()
    $(window).resize(setNavButtonVisibility)

    // add click handler
    $('.codeflower-init').click((e) => {

      // don't follow the link
      e.preventDefault()

      // unselect other menu items
      $('.js-responsive-underlinenav-item')
        .removeClass('selected')
        .removeAttr('aria-current')

      // select the codeflower menu item
      $('.codeflower-init:not(.dropdown-item)')
        .addClass('selected')
        .attr('aria-current', 'page')

      // close the dropdown menu
      $('.details-overlay').attr('open', false)

      // inject codeflower into the DOM
      injectCodeflower()
    })
  }

  function injectCodeflower() {

    const verticalMargin = 30
    const horizontalMargin = 50

    const container = $('<div>')
      .addClass('codeflower')
      .css({
        height: `calc(100vh - ${2 * verticalMargin}px)`,
        width: `calc(100vw - ${2 * horizontalMargin}px)`,
        padding: '0',
        margin: '0 auto',
      })

    const frame = $('<iframe>')
      .attr('src', chrome.runtime.getURL('html/frame.html'))
      .attr('allowfullscreen', true)
      .css({
        width: '100%',
        height: '0',
        border: `1px ${theme.palette.divider} solid`,
        'border-radius': '6px',
      })

    $('main .container-xl').replaceWith(container)

    container.append(frame)

    setTimeout(() => {
      // avoid a flash of white background
      frame.css('height', '100%')

      // scroll the page so that the iframe is vertically centered
      $('html, body').animate({
        scrollTop: container.offset().top - verticalMargin
      }, 500)
    }, 100)
  }

  /////////////////// MAIN ///////////////////

  $(document).ready(function() {

    if (extensionActive()) {
      // add menu item on initial load and when tab changes
      // see https://github.com/defunkt/jquery-pjax
      addButtons()
      $(document).on('pjax:complete', addButtons)

      // response to requests for the repo from the frame script
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === 'get-repo') {
          sendResponse({
            repo: getRepo(),
            theme,
          })
        }
      })
    }

  })

})(jQuery)
