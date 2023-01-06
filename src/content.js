chrome.runtime.onMessage.addListener(function (req, sender, sendMessage) {
  sendMessage({ ack: true })
})
