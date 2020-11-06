
This chrome extension appends a "Codeflower" tab to the navigation bar on github. When you click the tab, the client-web application is loaded up in an iframe, and passed the name of the repo as a query param, like this:

```
<iframe src="https://web.codeflower.la?context=chrome&owner=[repo owner]&name=[repo name]&branch=[name of branch]"></iframe>
```

Although this seems straightforward, github's content security policy prevents you from directly injecting an iframe whose source is a foreign domain. The problem, and solution, are described here:

https://stackoverflow.com/questions/24641592/injecting-iframe-into-page-with-restrictive-content-security-policy

To avoid the CSP, we create a frame on github's page whose source is an html file _inside the extension itself_. That html file loads a script that creates a second iframe within the first iframe. The src of the inner iframe can be a foreign domain without triggering the CSP.

But this little trick makes it difficult to pass information about the repo to codeflower, because iframes don't have direct access to outer content, or vice versa. So in order to get the name of the repo, the script in the outer iframe (frame.js) sends a message requesting the name of the repo to the background script, which relays the request to the content script running on the page (main.js), and then returns the response to the script in the outer iframe.