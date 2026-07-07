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
chrome.storage.local.get(["accessToken"], (result) => {
  if (result.accessToken) {
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

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    pageTitleEl.textContent = tab.title;
  });
}

// Calls the refresh endpoint using the httpOnly cookie to get a new access token
async function refreshAccessToken() {
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include", // sends the httpOnly refreshToken cookie automatically
    });

    const data = await res.json();

    if (!res.ok) {
      return null; // refresh token invalid/expired — user needs to log in again
    }

    chrome.storage.local.set({ accessToken: data.accessToken });
    return data.accessToken;
  } catch (err) {
    return null;
  }
}

// Wrapper that automatically retries a request once if the access token expired
async function authFetch(url, options = {}) {
  const { accessToken } = await chrome.storage.local.get(["accessToken"]);

  const doFetch = (token) =>
    fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

  let res = await doFetch(accessToken);

  if (res.status === 401) {
    const data = await res.clone().json().catch(() => ({}));
    if (data.code === "TOKEN_EXPIRED") {
      const newToken = await refreshAccessToken();
      if (newToken) {
        res = await doFetch(newToken);
      } else {
        // Refresh failed — force back to login
        chrome.storage.local.remove("accessToken");
        showLoginView();
      }
    }
  }

  return res;
}

// LOGIN
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  loginError.textContent = "";

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      credentials: "include", // needed so the browser stores the httpOnly refreshToken cookie
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      loginError.textContent = data.message || "Login failed";
      return;
    }

    chrome.storage.local.set({ accessToken: data.accessToken }, () => {
      showSaveView();
    });
  } catch (err) {
    loginError.textContent = "Could not connect to server";
  }
});

// SAVE CURRENT PAGE
saveBtn.addEventListener("click", async () => {
  saveStatus.textContent = "Saving...";

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs[0];

    try {
      const res = await authFetch(`${API_BASE}/items/ai-save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceType: "browser_bookmark",
          url: tab.url,
          title: tab.title,
          rawContent: tab.title,
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

// LOGOUT
logoutBtn.addEventListener("click", async () => {
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    // even if this fails, still clear local state below
  }

  chrome.storage.local.remove("accessToken", () => {
    showLoginView();
  });
});