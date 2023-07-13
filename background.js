let value = "";

// 背景執行
chrome.runtime.onInstalled.addListener(async () => {
    const url = chrome.runtime.getURL("hello.html")
    console.log(url)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log(request)
  switch (request.action) {
      case 'runtime send':
          console.log("runtime send")
          sendResponse({content: "bb"});
          break;
      case 'tabs send':
          console.log("tabs send")
          // chrome.tabs.sendMessage(action.tabId, { action: 'tabs send', tabId: action.tabId});
          sendResponse({content: 'request.tabId'});
          break;
      case 'set':
          sendResponse({content: request.value});
          break;
      case "get info":
          // sendAfterSet();
          sendResponse({content: "request.value"});
          break;
      default:
          break;      
  }
  return true;
  
});

chrome.tabs.query({}, (tabs) => console.log('tabs', tabs));


chrome.action.onClicked.addListener(async (tab) => {
  console.log(tab.id)
  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
      // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      // Next state will always be the opposite
      const nextState = prevState === 'ON' ? 'OFF' : 'ON'

      // Set the action badge to the next state
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
      });
  }
})

chrome.contextMenus.create({
  "title": "my test",  
  "type": "normal",  
  "id": '00',
  "contexts": ['image']
});  


chrome.contextMenus.onClicked.addListener(genericOnClick)

function genericOnClick(info, tab) {
  let srcUrl = info.srcUrl
  switch (info.menuItemId) {
    case '00':
      chrome.scripting.executeScript({ //在tabs執行
        target: {tabId:tab.id},
        args: [srcUrl, info.menuItemId],
        function: windowOpen
      })
      break;
    default:
      console.log('Standard context menu item clicked.');
  }
}

const URL_ORIGIN = 'https://www.op.gg/summoners';

// Allows users to open the side panel by clicking on the action toolbar icon

// sidePanel 符合網域
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  // Enables the side panel on google.com
  if (url.href.substring(0,27).includes(URL_ORIGIN)) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: true
    });
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
});