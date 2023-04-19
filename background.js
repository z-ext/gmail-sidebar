const sidebar = chrome.extension.getURL("sidebar.html");
const popup = chrome.extension.getURL("popup.html");
const gmailUrl = "https://mail.google.com/mail/u/0/x/";
const viewUrls = [sidebar, popup];

const bypassXFrameOptions = ({responseHeaders,documentUrl}) => {
    if (viewUrls.includes(documentUrl)) {
      responseHeaders = responseHeaders.filter(
        ({ name }) =>
          !["frame-options", "x-frame-options"].includes(name.toLowerCase())
      );
    }
    return { responseHeaders };
}

chrome.webRequest.onHeadersReceived.addListener(
  bypassXFrameOptions,
  {
    urls: ["*://*/*"],
    types: ["sub_frame"],
  },
  ["blocking", "responseHeaders"]
);
