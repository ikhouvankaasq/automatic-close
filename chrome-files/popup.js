const domainInput = document.getElementById("domain");
const enableBtn = document.getElementById("enableBtn");
const searchBtn = document.getElementById("searchBtn");
const folderBtn = document.getElementById("folderBtn");
const darkBtn = document.getElementById("darkBtn");
const openTabBtn = document.getElementById("openTab");
const list = document.getElementById("list");
const searchInput = document.getElementById("searchInput");

let selectedFolder = "Default";

function genId() { return Date.now().toString() + Math.floor(Math.random()*10000); }

// -----------------
// Dark mode
// -----------------
darkBtn.onclick = () => {
  chrome.storage.sync.get(["darkMode"], d => chrome.storage.sync.set({darkMode:!d.darkMode}, render));
};

// -----------------
// Enable/Disable
// -----------------
enableBtn.onclick = () => {
  chrome.storage.sync.get(["enabled"], d => chrome.storage.sync.set({enabled:!d.enabled}, render));
};

// -----------------
// Open dashboard
// -----------------
openTabBtn.onclick = () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("dashboard.html") });
};

// -----------------
// Search toggle
// -----------------
searchBtn.onclick = () => {
  searchInput.style.display = searchInput.style.display === "none" ? "block" : "none";
  searchInput.focus();
};

// -----------------
// Add domain
// -----------------
function addDomain() {
  const domain = domainInput.value.trim();
  if(!domain) return;
  chrome.storage.sync.get(["blockedDomains"], d => {
    const arr = d.blockedDomains || [];
    arr.push({ id: genId(), domain, folder:selectedFolder });
    chrome.storage.sync.set({ blockedDomains: arr }, render);
  });
  domainInput.value = "";
}

document.getElementById("add").onclick = addDomain;
domainInput.addEventListener("keyup", e => { if(e.key === "Enter") addDomain(); });

// -----------------
// Add folder
// -----------------
folderBtn.onclick = () => {
  const name = prompt("Enter new folder name:");
  if(!name) return;
  chrome.storage.sync.get(["blockedDomains"], d => {
    const arr = d.blockedDomains || [];
    arr.push({ id: genId(), domain:"", folder:name });
    chrome.storage.sync.set({ blockedDomains: arr }, render);
  });
};

// -----------------
// Delete folder functie
// -----------------
function deleteFolder(folderName){
  if(folderName==="Default"){
    alert("Default folder cannot be deleted.");
    return;
  }
  if(!confirm(`Are you sure you want to delete folder "${folderName}" and all its domains?`)) return;

  chrome.storage.sync.get(["blockedDomains"], d => {
    const arr = (d.blockedDomains || []).filter(x => x.folder !== folderName);
    chrome.storage.sync.set({ blockedDomains: arr }, ()=>{
      if(selectedFolder === folderName) selectedFolder = "Default";
      render();
    });
  });
}

// -----------------
// Render list
// -----------------
function render() {
  chrome.storage.sync.get(["enabled","blockedDomains","darkMode"], d=>{
    enableBtn.textContent = d.enabled === false ? "Enable" : "Disable";
    enableBtn.className = d.enabled === false ? "toggleBtn off" : "toggleBtn";
    document.body.className = d.darkMode ? "dark" : "";

    const search = searchInput.value.trim().toLowerCase();
    list.innerHTML = "";

    const groups = {};
    (d.blockedDomains || []).forEach(x => {
      if(!x.folder) x.folder="Default";
      groups[x.folder] ??= [];
      groups[x.folder].push(x);
    });

    for(let folder in groups){
      const f = document.createElement("div");
      f.className = "folder";
      f.textContent = "📁 " + folder;

      // Highlight selected folder
      if(folder === selectedFolder){
        f.style.background = "#dbeafe";
        f.style.padding = "6px 12px";
        f.style.borderRadius = "6px";
      } else {
        f.style.cursor = "pointer";
        f.style.padding = "6px 12px";
      }

      // Klik om folder te selecteren
      f.onclick = ()=> { selectedFolder = folder; render(); };

      // Voeg delete knop naast folder (behalve Default)
      if(folder !== "Default"){
        const delBtn = document.createElement("button");
        delBtn.textContent = "🗑️";
        delBtn.style.marginLeft = "8px";
        delBtn.onclick = (e)=>{
          e.stopPropagation(); // voorkomt select
          deleteFolder(folder);
        };
        f.appendChild(delBtn);
      }

      list.appendChild(f);

      // Toon domeinen in folder
      groups[folder].forEach(item=>{
        if(item.domain==="") return;
        if(search && !item.domain.toLowerCase().includes(search)) return;

        const row = document.createElement("div");
        row.className = "item";

        const span = document.createElement("span");
        span.textContent = item.domain;

        const btn = document.createElement("button");
        btn.textContent = "❌";
        btn.onclick = ()=>{
          chrome.storage.sync.get(["blockedDomains"], d=>{
            const arr = d.blockedDomains.filter(x => x.id !== item.id);
            chrome.storage.sync.set({blockedDomains: arr}, render);
          });
        };

        row.appendChild(span);
        row.appendChild(btn);
        list.appendChild(row);
      });
    }
  });
}

// -----------------
// Live search
// -----------------
searchInput.addEventListener("input", render);

// Initial render
render();
