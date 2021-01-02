### Overview
This browser extension appends a "Codeflower" tab to the navigation bar on github.com. When you click the tab, the client app is loaded up in an iframe, and passed params that instruct it to clone and visualize the repo you're looking at in Github.

The extension is available for both [Chrome](https://chrome.google.com/webstore/detail/codeflower/mnlengnbfpfgcfdgfpkjekoaeophmmeh) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/codeflower/).

### Developing in Chrome
- navigate to the extensions page in Chrome (chrome://extensions/) to bring up all the currently-installed extensions.
- if you already have Codeflower installed, disable it -- otherwise the dev and prod versions will run simultaneously.
- click on "Developer mode" at the top right, and a nav bar will appear at the top of the page.
- click "Load unpacked" at the top left, and then select this directory in the file finder. The extension should appear in your list.
- navigate to any repo on github.com and you should see a "Codeflower" tab in github's nav bar.
- make whatever code changes you need. 
- Note that __code changes will not take effect until you click the refresh icon in the lower right corner of the Codeflower card on the extensions page.__

### Why are there two iframes?
When you click the "Codeflower" tab, the client application is loaded up in an iframe, with info about the repo passed in the query string, like this:

```
<iframe src="https://codeflower.la?context=chrome&owner=[repo owner]&name=[repo name]&branch=[name of branch]"></iframe>
```

Although this seems straightforward, Github's content security policy prevents you from directly injecting an iframe whose source is a foreign domain. The problem, and solution, are described [here](https://stackoverflow.com/questions/24641592/injecting-iframe-into-page-with-restrictive-content-security-policy).

To avoid the CSP, we create a frame on Github's page whose source is an html file _inside the extension itself_. That html file loads a script that creates a second iframe within the first iframe. The src of the inner iframe can be a foreign domain without triggering the CSP.

But this little trick makes it difficult to pass information about the repo to the Codeflower client, because iframes don't have direct access to outer content, or vice versa. So in order to get the name of the repo, the script in the outer iframe (frame.js) sends a message requesting the name of the repo to the background script, which relays the request to the content script running on the page (main.js), and then returns the response to the script in the outer iframe.
