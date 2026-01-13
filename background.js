// -----------------
// Automatic Close background script
// -----------------

// Functie om te controleren of een tab gesloten moet worden
async function checkTab(tab) {
    // Alleen sluiten als enabled
    const { enabled, blockedDomains } = await chrome.storage.sync.get(["enabled","blockedDomains"]);

    if(!enabled) return; // niks doen als uitgeschakeld
    if(!blockedDomains || blockedDomains.length===0) return;

    // Dashboard tab nooit sluiten
    if(tab.url.includes("dashboard.html")) return;

    // Check of tab overeenkomt met blocked domains
    for(let item of blockedDomains){
        if(!item.domain) continue; // skip folders
        // Domein check: exact match of begint met www.
        if(tab.url.includes(item.domain)){
            // Sluit tab
            chrome.tabs.remove(tab.id);
            break;
        }
    }
}

// -----------------
// Luister naar nieuwe tabs
// -----------------
chrome.tabs.onCreated.addListener(tab => {
    checkTab(tab);
});

// -----------------
// Luister naar updates van bestaande tabs (zoals navigatie)
// -----------------
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status==="complete"){ // wacht tot de tab geladen is
        checkTab(tab);
    }
});
