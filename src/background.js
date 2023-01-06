// chrome.runtime.onMessage.addListener(async function (
//   req,
//   sender,
//   sendResponse
// ) {
//   if (req.action === 'initiate scrape') {
//     console.log('test')
//     chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
//       let url = tabs[0].url
//       const dataToBePassed = await sendDataToServer(url)
//       chrome.runtime.sendResponse({
//         action: 'display-data',
//         data: dataToBePassed,
//       })
//     })
//   }
// })
