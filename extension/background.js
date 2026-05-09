// FreePDF Chrome Extension - Background Service Worker

const FREEPDF_URL = 'https://piscis.live/en';

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
    // Create main context menu item
    chrome.contextMenus.create({
        id: 'freepdf-open',
        title: 'Open with FreePDF',
        contexts: ['link', 'page']
    });

    // Create submenu for specific tools
    chrome.contextMenus.create({
        id: 'freepdf-merge',
        parentId: 'freepdf-open',
        title: 'Merge PDFs',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'freepdf-compress',
        parentId: 'freepdf-open',
        title: 'Compress PDF',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'freepdf-convert',
        parentId: 'freepdf-open',
        title: 'Convert to PDF',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'freepdf-all-tools',
        parentId: 'freepdf-open',
        title: 'All Tools →',
        contexts: ['link', 'page']
    });

    console.log('FreePDF context menus created');
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    let url = FREEPDF_URL;

    switch (info.menuItemId) {
        case 'freepdf-merge':
            url = `${FREEPDF_URL}/tools/merge-pdf`;
            break;
        case 'freepdf-compress':
            url = `${FREEPDF_URL}/tools/compress-pdf`;
            break;
        case 'freepdf-convert':
            url = `${FREEPDF_URL}/tools/jpg-to-pdf`;
            break;
        case 'freepdf-all-tools':
        case 'freepdf-open':
            url = FREEPDF_URL;
            break;
        default:
            url = FREEPDF_URL;
    }

    // Open FreePDF in a new tab
    chrome.tabs.create({ url: url });
});

// Log when service worker starts
console.log('FreePDF background service worker started');
