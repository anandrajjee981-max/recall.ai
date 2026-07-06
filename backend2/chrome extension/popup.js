const API_BASE = "http://localhost:5000/api";

const loginView = document.getElementById("loginView");
const saveView = document.getElementById("saveView");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const saveBtn = document.getElementById("saveBtn");
const pageTitleEl = document.getElementById("pageTitle");
const loginError = document.getElementById("loginError");
const saveStatus = document.getElementById("saveStatus");

// Check if user is already logged in when popup opens
chrome.storage.local.get(["token"], (result) => {
  if (result.token) {
    showSaveView();
  } else {
    showLoginView();
  }
});

function showLoginView() {
  loginView.classList.remove("hidden");
  saveView.classList.add("hidden");
}

function showSaveView() {
  loginView.classList.add("hidden");
  saveView.classList.remove("hidden");

  // Get current tab info to display
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    pageTitleEl.textContent = tab.title;
  });
}

// LOGIN
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  loginError.textContent = "";

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      loginError.textContent = data.message || "Login failed";
      return;
    }

    chrome.storage.local.set({ token: data.token }, () => {
      showSaveView();
    });
  } catch (err) {
    loginError.textContent = "Could not connect to server";
  }
});

// SAVE CURRENT PAGE
saveBtn.addEventListener("click", async () => {
  saveStatus.textContent = "Saving...";

  chrome.storage.local.get(["token"], async (result) => {
    const token = result.token;

    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs[0];

      try {
        const res = await fetch(`${API_BASE}/items/ai-save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sourceType: "browser_bookmark",
            url: tab.url,
            title: tab.title,
            rawContent: tab.title, // placeholder — later we can extract real page content
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          saveStatus.textContent = data.message || "Save failed";
          return;
        }

        saveStatus.textContent = "✅ Saved!";
      } catch (err) {
        saveStatus.textContent = "❌ Could not connect to server";
      }
    });
  });
});

// LOGOUT
logoutBtn.addEventListener("click", () => {
  chrome.storage.local.remove("token", () => {
    showLoginView();
  });
});