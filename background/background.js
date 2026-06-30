// Background service worker

// Create context menu on install
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Photo Viewer extension installed');
  }

  chrome.contextMenus.create({
    id: 'photoviewer-view',
    title: '使用 Photo Viewer 查看',
    contexts: ['image']
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'photoviewer-view' && info.srcUrl) {
    chrome.tabs.sendMessage(tab.id, {
      action: 'showImage',
      src: info.srcUrl
    });
  }
});
